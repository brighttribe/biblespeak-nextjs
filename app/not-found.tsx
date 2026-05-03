import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.08); }
        }
        @keyframes drift1 {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.4; }
          33%  { transform: translate(40px, -60px) scale(1.2); opacity: 0.6; }
          66%  { transform: translate(-30px, -30px) scale(0.9); opacity: 0.3; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
        }
        @keyframes drift2 {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50%  { transform: translate(-50px, 40px) scale(1.15); opacity: 0.5; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        }
        @keyframes drift3 {
          0%   { transform: translate(0, 0); opacity: 0.25; }
          40%  { transform: translate(30px, 50px); opacity: 0.45; }
          80%  { transform: translate(-20px, 20px); opacity: 0.2; }
          100% { transform: translate(0, 0); opacity: 0.25; }
        }
        @keyframes flicker {
          0%, 95%, 100% { opacity: 1; }
          96% { opacity: 0.6; }
          97% { opacity: 1; }
          98% { opacity: 0.7; }
        }
        .float-card { animation: float 4s ease-in-out infinite; }
        .glow-blob  { animation: pulse-glow 5s ease-in-out infinite; }
        .orb1       { animation: drift1 12s ease-in-out infinite; }
        .orb2       { animation: drift2 16s ease-in-out infinite; }
        .orb3       { animation: drift3 10s ease-in-out infinite; }
        .flicker    { animation: flicker 8s ease-in-out infinite; }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, #1a1245 0%, #0f0a2e 60%, #07041a 100%)' }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Center glow */}
        <div className="glow-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] blur-3xl bg-indigo-600 opacity-20 rounded-full pointer-events-none" />

        {/* Floating orbs */}
        <div className="orb1 absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-2xl pointer-events-none" style={{ background: 'rgba(99,102,241,0.3)' }} />
        <div className="orb2 absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(79,70,229,0.2)' }} />
        <div className="orb3 absolute top-1/2 right-1/3 w-24 h-24 rounded-full blur-2xl pointer-events-none" style={{ background: 'rgba(165,180,252,0.25)' }} />

        {/* Decorative circles */}
        <svg className="absolute top-0 right-0 pointer-events-none" width="480" height="480" viewBox="0 0 480 480" fill="none" aria-hidden="true">
          <circle cx="380" cy="100" r="200" stroke="rgba(99,102,241,0.04)" strokeWidth="60" />
          <circle cx="420" cy="60"  r="140" stroke="rgba(99,102,241,0.04)" strokeWidth="40" />
          <circle cx="340" cy="140" r="90"  stroke="rgba(99,102,241,0.04)" strokeWidth="30" />
        </svg>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-lg mx-auto">

          <Image src="/bible-speak.png" alt="BibleSpeak.org" width={160} height={42} className="mx-auto mb-10" />

          <div className="float-card">
            <div
              className="flicker text-[120px] md:text-[160px] font-black leading-none tracking-tight select-none"
              style={{
                background: 'linear-gradient(135deg, #a5b4fc 0%, #6366f1 50%, #c7d2fe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px rgba(99,102,241,0.5))',
              }}
            >
              404
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Whoops.
            </h1>
            <p className="text-indigo-200 text-base leading-relaxed mb-10 max-w-sm mx-auto">
              That page doesn&apos;t exist or has been moved. Let&apos;s get you back to the Word.
            </p>

            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
