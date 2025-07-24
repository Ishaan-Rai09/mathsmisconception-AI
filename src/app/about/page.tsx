"use client";

import { motion } from "framer-motion";
import { FiTarget, FiUsers, FiBookOpen, FiAward } from "react-icons/fi";

const AboutPage = () => {
  const features = [
    {
      icon: <FiTarget className="text-4xl text-blue-600 mb-4" />,
      title: "AI-Powered Analysis",
      description: "Sophisticated algorithms analyze math solutions to identify misconceptions and offer tailored feedback."
    },
    {
      icon: <FiUsers className="text-4xl text-green-600 mb-4" />,
      title: "For Students & Educators",
      description: "Crafted to support individual learners and teachers with specialized dashboards and insights."
    },
    {
      icon: <FiBookOpen className="text-4xl text-purple-600 mb-4" />,
      title: "In-Depth Learning",
      description: "Provides step-by-step analysis to help learners recognize and correct their mistakes."
    },
    {
      icon: <FiAward className="text-4xl text-yellow-600 mb-4" />,
      title: "Achieve Excellence",
      description: "Monitor advancement and achievements through detailed analytics and performance metrics."
    }
  ];

  return (
    <div className="gradient-bg py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="container-custom"
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gradient mb-4">About MathsClarity AI</h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            We&apos;re transforming mathematics education with cutting-edge AI technology, empowering students to learn from their misconceptions and develop a strong mathematical foundation.
          </p>
        </div>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="card-luxury mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 mx-auto max-w-3xl">
            To empower students and teachers with intelligent tools that uncover mathematical misunderstandings, deliver personalized feedback, and create a more fruitful learning environment.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              className="card-luxury text-center py-8 hover:shadow-3xl"
            >
              {feature.icon}
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="card-luxury mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="text-5xl mb-4">📤</div>
              <h3 className="text-xl font-semibold mb-2">Upload Solutions</h3>
              <p className="text-gray-600">Submit math solutions in images or PDFs for analysis.</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our AI system identifies errors and offers corrections.</p>
            </div>
            <div>
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Receive Feedback</h3>
              <p className="text-gray-600">Detailed explanations help you learn from your mistakes.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
