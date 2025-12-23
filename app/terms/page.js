export default function TermsPage() {
  return (
    <section className="min-h-screen bg-linear-to-b from-white via-blue-50/40 to-white py-19">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using the platform.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using this platform, you agree to comply with and be bound by these Terms & Conditions.
              If you do not agree with any part of these terms, you should not use the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. User Accounts
            </h2>
            <ul className="space-y-2 text-gray-600 list-disc list-inside">
              <li>Users must provide accurate and complete information during signup</li>
              <li>Each user is responsible for maintaining the confidentiality of their account credentials</li>
              <li>Accounts are role-based and assigned as Student or Teacher at the time of signup</li>
              <li>Users are responsible for all activities that occur under their account</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. Authentication & Login
            </h2>
            <ul className="space-y-2 text-gray-600 list-disc list-inside">
              <li>Signup is available using email and password only</li>
              <li>Google authentication is provided for login purposes only</li>
              <li>Google accounts cannot be used to create new accounts</li>
              <li>Misuse of authentication methods may result in access restrictions</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              4. Platform Usage
            </h2>
            <ul className="space-y-2 text-gray-600 list-disc list-inside">
              <li>Use the platform strictly for educational purposes</li>
              <li>Avoid actions that disrupt platform functionality</li>
              <li>Do not attempt to access unauthorized areas or data</li>
              <li>Respect the integrity of learning content and assessments</li>
            </ul>
            <p className="text-gray-500 text-sm mt-2">
              Teachers are responsible for the accuracy and relevance of the content they create.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              5. AI-Assisted Features
            </h2>
            <ul className="space-y-2 text-gray-600 list-disc list-inside">
              <li>AI tools are provided strictly as learning assistance</li>
              <li>AI-generated responses should not be considered professional advice</li>
              <li>The platform is not liable for decisions made solely based on AI responses</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              6. Data & Privacy
            </h2>
            <ul className="space-y-2 text-gray-600 list-disc list-inside">
              <li>User data is handled securely in accordance with our Privacy Policy</li>
              <li>Passwords are stored in encrypted form</li>
              <li>No sensitive personal data is shared without user consent</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              7. Account Termination
            </h2>
            <ul className="space-y-2 text-gray-600 list-disc list-inside">
              <li>Accounts violating these terms may be suspended or terminated</li>
              <li>Access may be restricted in cases of misuse or security concerns</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              8. Changes to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms & Conditions may be updated periodically. Continued use of the platform after changes
              indicates acceptance of the updated terms.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
