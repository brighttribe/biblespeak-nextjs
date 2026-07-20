'use client';

import { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { getConsent, setConsent } from '@/lib/cookie-consent';

// ── helpers ──────────────────────────────────────────────────────────────────

function loadGA4() {
  const id = 'G-C4ES3L9CPJ';
  if (document.querySelector(`script[data-ga-id="${id}"]`)) return;
  const s1 = document.createElement('script');
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  s1.setAttribute('data-ga-id', id);
  document.head.appendChild(s1);
  const s2 = document.createElement('script');
  s2.setAttribute('data-ga-id', id + '-config');
  s2.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');`;
  document.head.appendChild(s2);
}

// ── toggle switch ─────────────────────────────────────────────────────────────

function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange?: () => void; disabled?: boolean }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={(e) => { e.stopPropagation(); onChange?.(); }}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      } ${checked ? 'bg-[#4f46e5]' : 'bg-slate-300'}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

// ── cookie table ──────────────────────────────────────────────────────────────

type CookieRow = { name: string; purpose: string; duration: string };

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-x-auto mt-3">
      <table className="w-full text-xs text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="py-2 pr-4 font-semibold text-slate-600 whitespace-nowrap">Cookie</th>
            <th className="py-2 pr-4 font-semibold text-slate-600">Purpose</th>
            <th className="py-2 font-semibold text-slate-600 whitespace-nowrap">Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-slate-100">
              <td className="py-2 pr-4 font-mono text-slate-700 whitespace-nowrap">{row.name}</td>
              <td className="py-2 pr-4 text-slate-600">{row.purpose}</td>
              <td className="py-2 text-slate-600 whitespace-nowrap">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── accordion row ─────────────────────────────────────────────────────────────

function AccordionRow({
  title,
  description,
  locked,
  checked,
  onToggle,
  children,
}: {
  title: string;
  description: string;
  locked?: boolean;
  checked: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* CRITICAL: outer wrapper must be div, not button, because Toggle inside is a button */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((v) => !v); } }}
        className="flex items-center justify-between gap-4 px-4 py-3 bg-slate-50 cursor-pointer select-none"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 text-sm">{title}</p>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {locked && <span className="text-xs text-slate-400 font-medium">Always on</span>}
          <Toggle checked={checked} onChange={onToggle} disabled={locked} />
          <span className={`text-slate-400 text-xs transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden>▾</span>
        </div>
      </div>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [statsOn, setStatsOn] = useState(false);

  useEffect(() => {
    const consent = getConsent();

    if (consent) {
      if (consent.statistics) {
        loadGA4();
        posthog.opt_in_capturing();
      }
    } else {
      setVisible(true);
    }

    function handleOpen() {
      setShowModal(true);
      setVisible(false);
    }

    window.addEventListener('open-cookie-prefs', handleOpen);
    return () => window.removeEventListener('open-cookie-prefs', handleOpen);
  }, []);

  function acceptAll() {
    setConsent({ statistics: true, advertising: false });
    loadGA4();
    posthog.opt_in_capturing();
    setVisible(false);
  }

  function rejectAll() {
    setConsent({ statistics: false, advertising: false });
    posthog.opt_out_capturing();
    setVisible(false);
  }

  function openPrefs() {
    setShowModal(true);
    setVisible(false);
  }

  function saveAndClose() {
    setConsent({ statistics: statsOn, advertising: false });
    if (statsOn) {
      loadGA4();
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }
    setShowModal(false);
  }

  function handleViewPolicy() {
    setShowModal(false);
    setVisible(true);
  }

  return (
    <>
      {/* ── Banner ── */}
      {visible && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200 shadow-lg">
          <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="flex-1 text-sm text-slate-700">
              We use cookies to understand how visitors use BibleSpeak.org. You can choose which cookies to allow.{' '}
              <button
                onClick={handleViewPolicy}
                className="underline text-[#4f46e5] hover:text-[#4338ca] transition-colors"
              >
                Cookie Policy
              </button>
            </p>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={openPrefs}
                className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-lg text-slate-700 hover:border-slate-400 transition-colors"
              >
                Preferences
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-lg text-slate-700 hover:border-slate-400 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm font-medium bg-[#4f46e5] text-white rounded-lg hover:bg-[#4338ca] transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-[660px] bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Cookie Preferences</h2>
              <p className="text-sm text-slate-500 mt-1">
                Manage your cookie settings below. See our{' '}
                <button
                  onClick={handleViewPolicy}
                  className="underline text-[#4f46e5] hover:text-[#4338ca] transition-colors"
                >
                  Cookie Policy
                </button>{' '}
                for details.
              </p>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto px-6 py-4 flex flex-col gap-3">
              {/* Essential */}
              <AccordionRow
                title="Essential"
                description="Required for the site to function. Cannot be disabled."
                locked
                checked={true}
              >
                <CookieTable
                  rows={[
                    { name: 'bs_consent', purpose: 'Stores your cookie consent preferences', duration: '30 days' },
                  ]}
                />
              </AccordionRow>

              {/* Statistics */}
              <AccordionRow
                title="Statistics"
                description="Help us understand how visitors use the site (Google Analytics, PostHog)."
                checked={statsOn}
                onToggle={() => setStatsOn((v) => !v)}
              >
                <p className="text-xs font-semibold text-slate-600 mt-3 mb-1">Google Analytics</p>
                <CookieTable
                  rows={[
                    { name: '_ga', purpose: 'Google Analytics — identifies unique users', duration: '2 years' },
                    { name: '_gid', purpose: 'Google Analytics — distinguishes sessions', duration: '24 hours' },
                    { name: '_ga_C4ES3L9CPJ', purpose: 'Google Analytics — stores session state', duration: '2 years' },
                  ]}
                />
                <p className="text-xs font-semibold text-slate-600 mt-4 mb-1">PostHog</p>
                <CookieTable
                  rows={[
                    { name: 'ph_*', purpose: 'PostHog — records behavioral analytics', duration: 'Session / 1 year' },
                  ]}
                />
              </AccordionRow>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-wrap justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-lg text-slate-700 hover:border-slate-400 transition-colors"
              >
                Close
              </button>
              <button
                onClick={saveAndClose}
                className="px-4 py-2 text-sm font-medium border border-[#4f46e5] rounded-lg text-[#4f46e5] hover:bg-[#4f46e5] hover:text-white transition-colors"
              >
                Save and Close
              </button>
              <button
                onClick={() => { acceptAll(); setShowModal(false); }}
                className="px-4 py-2 text-sm font-medium bg-[#4f46e5] text-white rounded-lg hover:bg-[#4338ca] transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
