"use client";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        Last updated: {new Date().toLocaleDateString("en-US")}
      </p>

      <p className="mb-4">
        Welcome to <strong>Yeah Whatever 🍽️</strong> ("we", "our", or "us"). We value your privacy
        and are committed to protecting your personal information. This Privacy Policy explains how
        we collect, use, and protect your information when you use our website or services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We do not collect any personally identifiable information directly. However, we may use
        third-party services that collect information automatically, such as:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Google AdSense (for displaying ads)</li>
        <li>Google Maps API (for displaying nearby restaurant data)</li>
        <li>Browser storage (for saving your draw counts and settings locally)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Use of Google AdSense</h2>
      <p className="mb-4">
        We use Google AdSense to display advertisements. Google may use cookies or similar
        technologies to show you personalized ads based on your previous visits to this or other
        websites. You can learn more about how Google uses data at{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ad Policies
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Use of Google Maps API</h2>
      <p className="mb-4">
        Our app uses Google Maps API to provide location-based restaurant recommendations. By using
        our site, you agree to Google’s{" "}
        <a
          href="https://policies.google.com/privacy"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://maps.google.com/help/terms_maps/"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Maps Terms of Service
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Cookies and Local Storage</h2>
      <p className="mb-4">
        We use browser local storage to remember your daily draw count and language settings. This
        information stays on your device and is never sent to our servers.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Children’s Privacy</h2>
      <p className="mb-4">
        Our service is not intended for children under 13. We do not knowingly collect personal data
        from minors.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any updates will be posted on this page
        with a revised “Last updated” date.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at{" "}
        <a
          href="mailto:support@yeahwhatever.app"
          className="text-blue-600 underline"
        >
          support@yeahwhatever.app
        </a>
        .
      </p>
    </main>
  );
}
