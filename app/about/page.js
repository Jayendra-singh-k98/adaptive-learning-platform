// AboutPage.jsx
export default function AboutPage() {
  return (
    <section className="min-h-screen bg-linear-to-b from-white via-blue-50/40 to-white py-19">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1.5 bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            ℹ️ About Our Platform
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn more about our AI-powered learning platform and its mission.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
          
          {/* Gradient Header Bar */}
          <div className="h-2 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600"></div>

          <div className="p-8 md:p-10 space-y-10">

            {/* About Platform */}
            <div className="relative">
              <div className="absolute -left-2 top-0 w-1 h-full bg-linear-to-b from-blue-600 to-purple-600 rounded-full"></div>
              <div className="pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  About the Platform
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  The <span className="font-semibold text-blue-600">AI-Powered Adaptive Learning Platform</span> is a modern
                  educational web application designed to enhance the learning and teaching experience through
                  technology-driven personalization.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4 text-lg">
                  The platform supports two primary user roles: <strong className="text-gray-900">Students</strong> and <strong className="text-gray-900">Teachers</strong>,
                  each with dedicated features and role-based access to ensure a structured and secure learning environment.
                </p>
              </div>
            </div>

            {/* What We Offer */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                What We Offer
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Students */}
                <div className="group relative overflow-hidden rounded-2xl border-2 border-blue-100 bg-linear-to-br from-blue-50 to-blue-100/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-2xl mb-4 shadow-lg">
                      🎓
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      For Students
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Access to structured courses, topics, and quizzes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Performance-based learning recommendations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>AI-assisted doubt solving for academic support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Progress-oriented learning experience</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Teachers */}
                <div className="group relative overflow-hidden rounded-2xl border-2 border-green-100 bg-linear-to-br from-green-50 to-green-100/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-2xl mb-4 shadow-lg">
                      👨‍🏫
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      For Teachers
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Create and manage courses, topics, and quizzes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Monitor student engagement and learning flow</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Role-restricted teacher dashboard for content management</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Learning */}
            <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                Intelligent Learning Experience
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Helping resolve academic doubts</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Supporting adaptive learning based on quiz performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Improving engagement through guided feedback</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-white/70 rounded-xl border border-purple-200">
                <p className="text-gray-600 text-sm flex items-start gap-2">
                  <svg className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>The AI functionality is designed to assist learning, not replace human teaching.</span>
                </p>
              </div>
            </div>

            {/* Security */}
            <div className="rounded-2xl border-2 border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                Secure & Role-Based Access
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Users sign up using email and password with an assigned role</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Google Sign-In is supported only for login</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Authentication follows industry-standard security practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Access to dashboards and features is strictly role-based</span>
                </li>
              </ul>
            </div>

            {/* Mission */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-purple-600 p-8 text-white shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Our Mission
                </h2>
                <p className="text-blue-50 leading-relaxed text-lg">
                  Our mission is to make learning more accessible, adaptive, and engaging by combining structured
                  educational content with intelligent assistance, while maintaining data security and user privacy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}