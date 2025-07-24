"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    "Instant feedback on math solutions",
    "Detailed misconception analysis",
    "Step-by-step correction guidance",
    "Support for various math topics",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-bg py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTdmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9InVybCgjZ3JpZCkiIHgteD0iMCIgeT0iMCIvPjwvc3ZnPg==')] bg-repeat"></div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <motion.h1 
                className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Discover Your Math <span className="text-gradient">Misconceptions</span> with AI
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-700 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Upload your math solutions and receive instant, detailed feedback on where you went wrong and how to improve.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link href="/upload" className="btn-primary flex items-center justify-center gap-2">
                  Get Started <FiArrowRight />
                </Link>
                <Link href="#how-it-works" className="btn-secondary">
                  Learn More
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Math solution with AI feedback"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="how-it-works">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform analyzes your math solutions to identify misconceptions and provide targeted feedback.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Upload Your Solution",
                description: "Take a photo or upload a PDF of your handwritten or typed math solution.",
                icon: "📤",
              },
              {
                title: "AI Analysis",
                description: "Our advanced AI analyzes your work step-by-step to identify any misconceptions.",
                icon: "🧠",
              },
              {
                title: "Get Detailed Feedback",
                description: "Receive personalized feedback highlighting your mistakes and how to correct them.",
                icon: "📝",
              },
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="card-luxury flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-slate-800 mb-6">
                Premium Features for Better Learning
              </h2>
              <p className="text-slate-600 mb-8">
                MathsClarity AI helps students understand their mistakes and build stronger math foundations.
              </p>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <FiCheckCircle className="text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/upload" className="btn-primary inline-flex items-center gap-2">
                  Try It Now <FiArrowRight />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="text-sm font-medium text-blue-800 mb-1">Example Problem</div>
                  <div className="text-slate-700">Solve for x: 2x + 5 = 15</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <FiCheckCircle className="text-green-500 text-sm" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">Step 1: 2x + 5 = 15</div>
                      <div className="text-sm text-slate-600">Initial equation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <FiCheckCircle className="text-green-500 text-sm" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">Step 2: 2x = 15 - 5</div>
                      <div className="text-sm text-slate-600">Subtract 5 from both sides</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <div className="text-red-500 text-sm font-bold">✕</div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">Step 3: 2x = 9</div>
                      <div className="text-sm text-red-600">Calculation error: 15 - 5 = 10, not 9</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 mt-6">
                    <div className="text-sm font-medium text-blue-800 mb-1">AI Feedback</div>
                    <div className="text-slate-700">You made a calculation error in step 3. The correct calculation is 15 - 5 = 10, so 2x = 10.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Improve Your Math Skills?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Upload your math solutions and get instant feedback to help you learn from your mistakes.
          </p>
          <Link href="/upload" className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-md transition-all duration-200 inline-flex items-center gap-2">
            Get Started Now <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
