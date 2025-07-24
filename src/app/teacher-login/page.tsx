"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import { useTeacherAuth } from "@/contexts/TeacherAuthContext";

const TeacherLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loginTeacher } = useTeacherAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple hardcoded credentials for demo
    if (username === "teacher" && password === "demo123") {
      loginTeacher(); // Set teacher authentication
      router.push("/teacher");
    } else {
      setError("Invalid credentials. Please use the demo credentials shown below.");
    }
    setLoading(false);
  };

  const fillDemoCredentials = () => {
    setUsername("teacher");
    setPassword("demo123");
  };

  return (
    <div className="gradient-bg py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-custom"
      >
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gradient mb-4">Teacher Access</h1>
            <p className="text-gray-600">Sign in to access the teacher dashboard with advanced analytics</p>
          </div>

          {/* Demo Credentials Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-luxury mb-6 bg-blue-50 border-blue-200"
          >
            <div className="flex items-center mb-3">
              <FiInfo className="text-blue-500 mr-2" />
              <h3 className="font-semibold text-blue-800">Demo Credentials</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Username:</span>
                <code className="bg-blue-100 px-2 py-1 rounded text-blue-800 font-mono">teacher</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Password:</span>
                <code className="bg-blue-100 px-2 py-1 rounded text-blue-800 font-mono">demo123</code>
              </div>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              Click to auto-fill credentials
            </button>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card-luxury"
          >
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-3"
                >
                  <div className="flex items-center">
                    <FiInfo className="text-red-500 mr-2 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full py-3 relative ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Access Teacher Dashboard'
                )}
              </button>
            </form>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-6 text-sm text-gray-600"
          >
            <p>Need help? Contact support at <span className="text-blue-600">support@mathsclarity.ai</span></p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherLoginPage;

