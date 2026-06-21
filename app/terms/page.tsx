import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | BibleSpeak.org',
  description: 'Terms of service for BibleSpeak.org.',
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-navy mb-2">Terms of Service</h1>
      <p className="text-slate-500 text-sm mb-10">Last updated June 21, 2026</p>

      <div className="prose prose-slate max-w-none text-slate-700 space-y-8">

        <p>
          By accessing or using BibleSpeak.org (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Site. The Site is operated by Brian Dempsey ("we," "us," or "our").
        </p>

        <h2>1. Use of the Site</h2>
        <p>
          BibleSpeak.org provides free audio pronunciation guides for Bible words and names. You may use the Site for personal, non-commercial purposes. You agree not to:
        </p>
        <ul>
          <li>Use the Site in any way that violates applicable laws or regulations</li>
          <li>Scrape, copy, or reproduce Site content in bulk without written permission</li>
          <li>Interfere with or disrupt the operation of the Site</li>
          <li>Use automated tools to access the Site at a rate that places unreasonable load on our servers</li>
        </ul>

        <h2>2. Intellectual Property</h2>
        <p>
          All content on this Site, including audio files, text, images, and video content, is owned by Brian Dempsey or licensed for use. You may not reproduce, distribute, or create derivative works from our content without express written permission.
        </p>

        <h2>3. YouTube Content</h2>
        <p>
          This Site embeds video content hosted on YouTube. Your use of embedded YouTube videos is subject to{' '}
          <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube&apos;s Terms of Service</a>{' '}
          and{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.
        </p>

        <h2>4. Advertising</h2>
        <p>
          The Site is supported by advertising, including Google AdSense. Third-party advertisers may use cookies and similar technologies to serve ads based on your interests. We do not control the content of third-party advertisements.
        </p>

        <h2>5. Disclaimer of Warranties</h2>
        <p>
          The Site is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. Pronunciation guides are provided for informational purposes and may not reflect all regional or scholarly variations.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Brian Dempsey shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Site.
        </p>

        <h2>7. Third-Party Links</h2>
        <p>
          The Site may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites and encourage you to review their terms and privacy policies.
        </p>

        <h2>8. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. The updated version will be indicated by an updated date at the top of this page. Continued use of the Site after changes are posted constitutes your acceptance of the revised Terms.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of Georgia, United States, without regard to its conflict of law provisions.
        </p>

        <h2>10. Contact</h2>
        <p>
          If you have questions about these Terms, contact us at{' '}
          <a href="mailto:hello@brighttribe.com">hello@brighttribe.com</a>.
        </p>

      </div>
    </main>
  )
}
