'use client';

export default function CookieSettingsLink() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-prefs'))}
      className="hover:text-white transition-colors"
    >
      Cookie Settings
    </button>
  );
}
