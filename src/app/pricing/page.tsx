"use client";

import { motion } from 'framer-motion';
import { FiCheck, FiStar, FiZap } from 'react-icons/fi';
import Link from 'next/link';

const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "Forever",
      description: "Perfect for individual students getting started",
      features: [
        "5 solution analyses per month",
        "Basic misconception detection",
        "Email support",
        "Student dashboard access",
        "Progress tracking"
      ],
      buttonText: "Get Started",
      buttonLink: "/upload",
      popular: false,
      icon: <FiCheck className="text-2xl text-green-500" />
    },
    {
      name: "Professional",
      price: "$19.99",
      period: "per month",
      description: "Ideal for serious learners and small classes",
      features: [
        "Unlimited solution analyses",
        "Advanced AI feedback",
        "Priority support",
        "Detailed progress reports",
        "Custom learning insights",
        "Export capabilities",
        "Mobile app access"
      ],
      buttonText: "Start Pro Trial",
      buttonLink: "/upload",
      popular: true,
      icon: <FiStar className="text-2xl text-blue-500" />
    },
    {
      name: "Enterprise",
      price: "$99.99",
      period: "per month",
      description: "Designed for schools and large organizations",
      features: [
        "Everything in Professional",
        "Multi-teacher dashboards",
        "Class management tools",
        "Advanced analytics",
        "Custom integrations",
        "Dedicated account manager",
        "Training & onboarding"
      ],
      buttonText: "Contact Sales",
      buttonLink: "/contact",
      popular: false,
      icon: <FiZap className="text-2xl text-purple-500" />
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
          <h1 className="text-5xl font-bold text-gradient mb-6">Choose Your Plan</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Unlock the full potential of AI-powered math learning with plans designed for every need.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`card-luxury relative overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                <div className="flex justify-center mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <div className="text-4xl font-bold text-gray-800">{plan.price}</div>
                  <div className="text-gray-500">{plan.period}</div>
                </div>
                
                <ul className="text-left space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <FiCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={plan.buttonLink}
                  className={`btn-primary w-full text-center inline-block ${
                    plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card-luxury mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes, all paid plans come with a 14-day free trial. No credit card required to start.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Do you offer educational discounts?</h3>
              <p className="text-gray-600">Yes, we offer special pricing for educational institutions. Contact us for more details.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PricingPage;
