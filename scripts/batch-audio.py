#!/usr/bin/env python3
"""
Batch generate 3-voice pronunciation audio and upload to Supabase Storage.

Usage:
  python3 batch-audio.py              # process all remaining words
  python3 batch-audio.py A            # only words starting with A
  python3 batch-audio.py A 20         # up to 20 words starting with A
  python3 batch-audio.py --reset      # clear progress log
"""

import os, sys, re, json, subprocess, urllib.request, tempfile, shutil, time

SCRIPT_DIR    = os.path.dirname(os.path.abspath(__file__))
WORDS_PATH    = os.path.join(SCRIPT_DIR, "../data/words.json")
ENV_PATH      = os.path.join(SCRIPT_DIR, "../.env.local")
PROGRESS_FILE = os.path.expanduser("~/Desktop/audio-batch-progress.json")
LOCAL_DIR     = os.path.join(SCRIPT_DIR, "../audio-generated")
os.makedirs(LOCAL_DIR, exist_ok=True)

def load_env(path):
    env = {}
    with open(path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip()
    return env

ENV          = load_env(ENV_PATH)
SUPABASE_URL = ENV["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = ENV["SUPABASE_SERVICE_ROLE_KEY"]
ELEVEN_KEY   = open(os.path.expanduser("~/Desktop/eleven.txt")).read().strip()

VOICES = {
    "hope":      "uYXf8XasLslADfZ2MB4u",
    "brian":     "Gubgw9l4dtIoQA9YZHgx",
    "nathaniel": "Wq15xSaY3gWvazBRaGEU",
}

def tts(text, voice_key, output_path, stability=0.65):
    voice_id = VOICES[voice_key]
    req = urllib.request.Request(
        "https://api.elevenlabs.io/v1/text-to-speech/" + voice_id,
        data=json.dumps({
            "text": text,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {"stability": stability, "similarity_boost": 0.75}
        }).encode(),
        headers={"xi-api-key": ELEVEN_KEY, "Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        data = resp.read()
    with open(output_path, "wb") as f:
        f.write(data)

def silence(duration, output_path):
    subprocess.run([
        "ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
        "-t", str(duration), "-c:a", "libmp3lame", "-q:a", "2", output_path
    ], check=True, capture_output=True)

def concat_audio(clips, output_path):
    inputs, filter_parts = [], []
    for i, c in enumerate(clips):
        inputs += ["-i", c]
        filter_parts.append("[{}]acopy[v{}]".format(i, i))
    chain = "".join("[v{}]".format(i) for i in range(len(clips)))
    fc = ";".join(filter_parts) + ";{}concat=n={}:v=0:a=1[out]".format(chain, len(clips))
    subprocess.run(
        ["ffmpeg", "-y"] + inputs + ["-filter_complex", fc, "-map", "[out]",
         "-c:a", "libmp3lame", "-q:a", "2", output_path],
        check=True, capture_output=True
    )

def generate_audio(title, tmp):
    tts("Heres how to pronounce " + title + ".", "hope",      tmp + "/a1.mp3", stability=0.80)
    silence(0.7,                                               tmp + "/s1.mp3")
    tts(title + ".",                              "hope",      tmp + "/a2.mp3", stability=0.95)
    silence(0.7,                                               tmp + "/s2.mp3")
    tts("Lets hear it again.",                    "brian",     tmp + "/a3.mp3", stability=0.75)
    silence(0.7,                                               tmp + "/s3.mp3")
    tts(title + ".",                              "brian",     tmp + "/a4.mp3", stability=0.95)
    silence(0.7,                                               tmp + "/s4.mp3")
    tts("And one more time: " + title + ".",      "nathaniel", tmp + "/a5.mp3", stability=0.75)
    out = tmp + "/audio.mp3"
    concat_audio([tmp + "/a1.mp3", tmp + "/s1.mp3", tmp + "/a2.mp3", tmp + "/s2.mp3",
                  tmp + "/a3.mp3", tmp + "/s3.mp3", tmp + "/a4.mp3", tmp + "/s4.mp3",
                  tmp + "/a5.mp3"], out)
    return out

def upload(local_path, audio_key):
    url = SUPABASE_URL + "/storage/v1/object/audio/" + audio_key + ".mp3"
    with open(local_path, "rb") as f:
        data = f.read()
    req = urllib.request.Request(url, data=data, method="PUT")
    req.add_header("Authorization", "Bearer " + SUPABASE_KEY)
    req.add_header("Content-Type", "audio/mpeg")
    req.add_header("x-upsert", "true")
    with urllib.request.urlopen(req) as resp:
        return resp.status

def load_progress():
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE) as f:
            return set(json.load(f))
    return set()

def save_progress(done):
    with open(PROGRESS_FILE, "w") as f:
        json.dump(sorted(done), f)

def run(letter=None, limit=None):
    with open(WORDS_PATH) as f:
        words = json.load(f)

    if letter:
        words = [w for w in words if w["title"].upper().startswith(letter.upper())]
    if limit:
        words = words[:limit]

    done = load_progress()
    remaining = [w for w in words if w["slug"] not in done]

    print("Scope: {} words | Done: {} | To process: {}".format(
        len(words), len(words) - len(remaining), len(remaining)))
    print()

    for i, word in enumerate(remaining):
        title = word["title"]
        slug  = word["slug"]
        key   = word.get("audio_file", slug)

        print("[{}/{}] {}... ".format(i + 1, len(remaining), title), end="", flush=True)
        tmp = tempfile.mkdtemp()
        try:
            audio_path = generate_audio(title, tmp)
            local_copy = os.path.join(LOCAL_DIR, slug + ".mp3")
            shutil.copy2(audio_path, local_copy)
            status = upload(audio_path, key)
            done.add(slug)
            save_progress(done)
            print("OK ({})".format(status))
        except Exception as e:
            print("ERROR: {}".format(e))
        finally:
            shutil.rmtree(tmp)

        time.sleep(0.3)

    print("\nFinished. {}/{} words complete.".format(
        len(done), len(words) if not letter else len([w for w in json.load(open(WORDS_PATH)) if True])))

if __name__ == "__main__":
    args = sys.argv[1:]
    if "--reset" in args:
        if os.path.exists(PROGRESS_FILE):
            os.remove(PROGRESS_FILE)
        print("Progress reset.")
        sys.exit(0)

    letter = next((a for a in args if a.isalpha() and len(a) == 1), None)
    limit  = next((int(a) for a in args if a.isdigit()), None)
    run(letter=letter, limit=limit)
