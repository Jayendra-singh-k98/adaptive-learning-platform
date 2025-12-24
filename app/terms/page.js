export default function TermsPage() {
  return (
    <section className="py-19 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            Legal Information
          </div>
          <h1 className="text-5xl font-bold bg-linear-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using the platform
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-xl p-10 space-y-10">

          <div className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using this platform, you agree to comply with and be bound by these Terms & Conditions.
              If you do not agree with any part of these terms, you should not use the platform.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. User Accounts
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1 font-bold">→</span>
                <span>Users must provide accurate and complete information during signup</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1 font-bold">→</span>
                <span>Each user is responsible for maintaining the confidentiality of their account credentials</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1 font-bold">→</span>
                <span>Accounts are role-based and assigned as Student or Teacher at the time of signup</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1 font-bold">→</span>
                <span>Users are responsible for all activities that occur under their account</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Authentication & Login
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1 font-bold">→</span>
                <span>Signup is available using email and password only</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1 font-bold">→</span>
                <span>Google authentication is provided for login purposes only</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1 font-bold">→</span>
                <span>Google accounts cannot be used to create new accounts</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1 font-bold">→</span>
                <span>Misuse of authentication methods may result in access restrictions</span>
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Platform Usage
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1 font-bold">→</span>
                <span>Use the platform strictly for educational purposes</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1 font-bold">→</span>
                <span>Avoid actions that disrupt platform functionality</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1 font-bold">→</span>
                <span>Do not attempt to access unauthorized areas or data</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1 font-bold">→</span>
                <span>Respect the integrity of learning content and assessments</span>
              </li>
            </ul>
            <div className="mt-4 bg-white/60 rounded-lg p-3 border-l-4 border-purple-400">
              <p className="text-gray-600 text-sm">
                ℹ️ Teachers are responsible for the accuracy and relevance of the content they create.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. AI-Assisted Features
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1 font-bold">→</span>
                <span>AI tools are provided strictly as learning assistance</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1 font-bold">→</span>
                <span>AI-generated responses should not be considered professional advice</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1 font-bold">→</span>
                <span>The platform is not liable for decisions made solely based on AI responses</span>
              </li>
            </ul>
          </div>

          <div className="bg-cyan-50 rounded-2xl p-6 border border-cyan-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Data & Privacy
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-cyan-600 mr-3 mt-1 font-bold">→</span>
                <span>User data is handled securely in accordance with our Privacy Policy</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-3 mt-1 font-bold">→</span>
                <span>Passwords are stored in encrypted form</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-3 mt-1 font-bold">→</span>
                <span>No sensitive personal data is shared without user consent</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Account Termination
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-3 mt-1 font-bold">→</span>
                <span>Accounts violating these terms may be suspended or terminated</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3 mt-1 font-bold">→</span>
                <span>Access may be restricted in cases of misuse or security concerns</span>
              </li>
            </ul>
          </div>

          <div className="border-l-4 border-indigo-500 pl-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              8. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms & Conditions may be updated periodically. Continued use of the platform after changes
              indicates acceptance of the updated terms.
            </p>
          </div>

          <div className="bg-linear-to-r from-slate-700 to-slate-800 rounded-2xl p-8 text-white text-center">
            <p className="text-lg">
              📧 Questions about these terms? Contact our support team for assistance.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}