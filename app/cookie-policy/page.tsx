import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | BibleSpeak.org',
  description: 'Cookie policy for BibleSpeak.org — what cookies we use and how to manage them.',
  robots: { index: false, follow: false },
}

export default function CookiePolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-navy mb-2">Cookie Policy</h1>
      <p className="text-slate-500 text-sm mb-10">Last updated June 24, 2026</p>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700">

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files that a website stores on your browser or device when you visit. They help the site remember information about your visit — like your preferences — so that the experience works correctly on your next visit.
        </p>
        <p>
          Cookies are set either by us ("first-party cookies") or by third-party services we use, such as Google Analytics ("third-party cookies").
        </p>

        <hr />

        <h2>Essential Cookies</h2>
        <p>
          These cookies are necessary for the site to function and cannot be turned off. They are only set in response to actions you take, such as saving your cookie preferences.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 pr-4 font-semibold text-slate-600 whitespace-nowrap">Cookie</th>
                <th className="py-2 pr-4 font-semibold text-slate-600">Purpose</th>
                <th className="py-2 font-semibold text-slate-600 whitespace-nowrap">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-mono text-slate-700">bs_consent</td>
                <td className="py-2 pr-4">Stores your cookie consent preferences</td>
                <td className="py-2 whitespace-nowrap">30 days</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr />

        <h2>Statistics Cookies</h2>
        <p>
          Statistics cookies help us understand how visitors use BibleSpeak.org so we can improve the site. These cookies are only set if you accept them.
        </p>

        <h3>Google Analytics</h3>
        <p>
          We use Google Analytics to collect anonymized data about how visitors navigate the site, which pages are most popular, and where visitors come from.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 pr-4 font-semibold text-slate-600 whitespace-nowrap">Cookie</th>
                <th className="py-2 pr-4 font-semibold text-slate-600">Purpose</th>
                <th className="py-2 font-semibold text-slate-600 whitespace-nowrap">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-mono text-slate-700">_ga</td>
                <td className="py-2 pr-4">Google Analytics — identifies unique users</td>
                <td className="py-2 whitespace-nowrap">2 years</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-mono text-slate-700">_gid</td>
                <td className="py-2 pr-4">Google Analytics — distinguishes sessions</td>
                <td className="py-2 whitespace-nowrap">24 hours</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-mono text-slate-700">_ga_C4ES3L9CPJ</td>
                <td className="py-2 pr-4">Google Analytics — stores session state</td>
                <td className="py-2 whitespace-nowrap">2 years</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>PostHog</h3>
        <p>
          We use PostHog to understand behavioral patterns on the site, such as which features visitors interact with.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 pr-4 font-semibold text-slate-600 whitespace-nowrap">Cookie</th>
                <th className="py-2 pr-4 font-semibold text-slate-600">Purpose</th>
                <th className="py-2 font-semibold text-slate-600 whitespace-nowrap">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-mono text-slate-700">ph_*</td>
                <td className="py-2 pr-4">PostHog — records behavioral analytics</td>
                <td className="py-2 whitespace-nowrap">Session / 1 year</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr />

        <h2>How to Manage Your Cookie Preferences</h2>
        <p>
          You can update your cookie preferences at any time by clicking the <strong>Cookie Settings</strong> link in the footer of any page. This lets you enable or disable Statistics cookies without affecting Essential cookies.
        </p>
        <p>
          You can also control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that blocking certain cookies may affect how BibleSpeak.org works. For more information, see your browser&apos;s help documentation:
        </p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
          <li><a href="https://support.microsoft.com/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        </ul>

        <hr />

        <h2>Contact</h2>
        <p>
          If you have questions about this Cookie Policy, please contact us at{' '}
          <a href="mailto:hello@biblespeak.org">hello@biblespeak.org</a>.
        </p>

      </div>
    </main>
  )
}
