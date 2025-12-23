export default function AboutPage() {
  return (
    <section className="min-h-screen bg-linear-to-b from-white via-blue-50/40 to-white py-19">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn more about our AI-powered learning platform and its mission.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-10">

          {/* About Platform */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              About the Platform
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The <span className="font-medium text-gray-800">AI-Powered Adaptive Learning Platform</span> is a modern
              educational web application designed to enhance the learning and teaching experience through
              technology-driven personalization.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              The platform supports two primary user roles: <strong>Students</strong> and <strong>Teachers</strong>,
              each with dedicated features and role-based access to ensure a structured and secure learning environment.
            </p>
          </div>

          {/* What We Offer */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              What We Offer
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Students */}
              <div className="p-6 rounded-xl bg-blue-50/40 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🎓 For Students
                </h3>
                <ul className="space-y-2 text-gray-600 list-disc list-inside">
                  <li>Access to structured courses, topics, and quizzes</li>
                  <li>Performance-based learning recommendations</li>
                  <li>AI-assisted doubt solving for academic support</li>
                  <li>Progress-oriented learning experience</li>
                </ul>
              </div>

              {/* Teachers */}
              <div className="p-6 rounded-xl bg-green-50/40 border border-green-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  👨‍🏫 For Teachers
                </h3>
                <ul className="space-y-2 text-gray-600 list-disc list-inside">
                  <li>Create and manage courses, topics, and quizzes</li>
                  <li>Monitor student engagement and learning flow</li>
                  <li>Role-restricted teacher dashboard for content management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI Learning */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Intelligent Learning Experience
            </h2>
            <ul className="space-y-2 text-gray-600 list-disc list-inside">
              <li>Helping resolve academic doubts</li>
              <li>Supporting adaptive learning based on quiz performance</li>
              <li>Improving engagement through guided feedback</li>
            </ul>
            <p className="text-gray-500 mt-3 text-sm italic">
              The AI functionality is designed to assist learning, not replace human teaching.
            </p>
          </div>

          {/* Security */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Secure & Role-Based Access
            </h2>
            <ul className="space-y-2 text-gray-600 list-disc list-inside">
              <li>Users sign up using email and password with an assigned role</li>
              <li>Google Sign-In is supported only for login</li>
              <li>Authentication follows industry-standard security practices</li>
              <li>Access to dashboards and features is strictly role-based</li>
            </ul>
          </div>

          {/* Mission */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to make learning more accessible, adaptive, and engaging by combining structured
              educational content with intelligent assistance, while maintaining data security and user privacy.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
