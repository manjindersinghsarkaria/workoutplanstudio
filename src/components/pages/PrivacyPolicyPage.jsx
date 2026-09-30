import { Link } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <SiteHeader label="Privacy Policy" />

      <main className="mx-auto max-w-3xl px-4 py-12 space-y-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-sm text-slate-500">Last updated: June 2026</p>
        </div>

        <Section title="Overview">
          <p>
            WorkoutPlanStudio ("we", "our", or "us") operates the website at workoutplanstudio.com (the "Service"). This page explains what information we collect, how we use it, and your rights regarding that information.
          </p>
          <p>
            We are committed to protecting your privacy. This policy is written in plain language so you can understand exactly what happens with your data.
          </p>
        </Section>

        <Section title="Information We Collect">
          <h3 className="text-base font-bold text-white mt-4 mb-2">Information you provide</h3>
          <p>
            WorkoutPlanStudio does not require you to create an account or provide any personal information to use the app. All workout plan data you enter is stored locally on your own device using your browser's IndexedDB storage. We do not transmit your workout data to any server.
          </p>

          <h3 className="text-base font-bold text-white mt-4 mb-2">Automatically collected information</h3>
          <p>
            When you visit our site, certain information is collected automatically by third-party services we use:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-slate-400">
            <li>
              <strong className="text-slate-300">Google Analytics (GA4)</strong> — collects anonymised usage data such as pages visited, session duration, and general geographic region (country level). IP addresses are anonymised. We use this to understand how the app is used and improve it. You can opt out using the{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Analytics Opt-out Browser Add-on</a>.
            </li>
          </ul>
        </Section>

        <Section title="Cookies">
          <p>
            We do not set any first-party cookies ourselves. However, Google Analytics may set cookies on your browser to measure and analyse site traffic.
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-slate-400">
            <li>Measure and analyse site traffic (Google Analytics)</li>
          </ul>
          <p className="mt-3">
            For more information on how Google uses data when you use our site, visit:{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              How Google uses data when you use our partners' sites or apps
            </a>.
          </p>
        </Section>

        <Section title="How We Use Your Information">
          <p>The information collected through Google Analytics is used solely to:</p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-slate-400">
            <li>Understand which features are most useful</li>
            <li>Identify and fix technical issues</li>
            <li>Improve the overall user experience</li>
          </ul>
          <p className="mt-3">
            We do not sell, trade, or rent any personal information to third parties.
          </p>
        </Section>

        <Section title="Data Storage">
          <p>
            Your workout plans, progress, and history are stored entirely on your own device using browser storage (IndexedDB and localStorage). This data never leaves your device and is not accessible to us. Clearing your browser data will permanently delete this information.
          </p>
        </Section>

        <Section title="Affiliate Links">
          <p>
            Some pages on this site contain affiliate links to products on Amazon.ca. WorkoutPlanStudio is a participant in the <strong className="text-slate-300">Amazon Associates Program</strong>, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.ca.
          </p>
          <p>
            When you click an affiliate link and make a purchase, we may earn a small commission at no extra cost to you. This helps support the development and maintenance of WorkoutPlanStudio.
          </p>
          <p>
            Affiliate links are clearly labelled on the pages where they appear. We only recommend products we believe are relevant and useful to our users. Our editorial content and recommendations are not influenced by affiliate relationships.
          </p>
          <p>
            Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. For more information, see the{" "}
            <a href="https://affiliate-program.amazon.ca/help/operating/agreement" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Amazon Associates Program Operating Agreement
            </a>.
          </p>
        </Section>

        <Section title="Third-Party Services">
          <p>This site uses the following third-party services, each with their own privacy policies:</p>
          <ul className="list-disc list-inside space-y-2 mt-2 text-slate-400">
            <li>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Privacy Policy</a>
              {" "}(covers Google Analytics)
            </li>
            <li>
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Vercel Privacy Policy</a>
              {" "}(our hosting provider — may log IP addresses for security purposes)
            </li>
            <li>
              <a href="https://www.amazon.ca/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Amazon.ca Privacy Notice</a>
              {" "}(affiliate links to products on Amazon.ca)
            </li>
          </ul>
        </Section>

        <Section title="Children's Privacy">
          <p>
            This Service is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will take steps to delete it.
          </p>
        </Section>

        <Section title="Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-slate-400">
            <li>Access the personal data we hold about you</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of personalised advertising</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
          <p className="mt-3">
            Since we do not collect or store personal data on our servers, most of these rights are exercised directly through your browser settings or through Google's tools linked above.
          </p>
        </Section>

        <Section title="Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the Service after changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            If you have any questions about this Privacy Policy, you can reach us by opening an issue on our public repository or via the contact information listed on the site.
          </p>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">{title}</h2>
      <div className="space-y-3 text-slate-400 leading-relaxed text-sm sm:text-base">
        {children}
      </div>
    </section>
  );
}
