"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiUpload, FiFileText, FiCalendar, FiArrowRight, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from "@clerk/nextjs";

// Mock data for student dashboard
const MOCK_SUBMISSIONS = [
  {
    id: "analysis_1",
    problem: "Solve for x: 2x + 5 = 15",
    date: "2023-06-15T10:30:00Z",
    status: "completed",
    hasErrors: true,
    errorCount: 2,
    misconceptionTypes: ["calculation"],
  },
  {
    id: "analysis_2",
    problem: "Find the derivative of f(x) = x³ + 2x² - 4x + 7",
    date: "2023-06-14T14:45:00Z",
    status: "completed",
    hasErrors: false,
    errorCount: 0,
    misconceptionTypes: [],
  },
  {
    id: "analysis_3",
    problem: "Solve the system of equations: 3x + y = 7 and x - 2y = -1",
    date: "2023-06-10T09:15:00Z",
    status: "completed",
    hasErrors: true,
    errorCount: 1,
    misconceptionTypes: ["conceptual"],
  },
];

export default function Dashboard() {
  const { userId } = useAuth();
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SignedIn>
        <div className="min-h-screen gradient-bg py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold text-gradient mb-2">Your Dashboard</h1>
                <p className="text-gray-600 text-lg">
                  View your uploaded solutions and feedback
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 md:mt-0"
              >
                <Link href="/upload" className="btn-primary flex items-center gap-2">
                  <FiUpload /> Upload New Solution
                </Link>
              </motion.div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {submissions.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <div className="flex flex-col items-center max-w-md mx-auto">
                      <FiFileText className="text-5xl text-slate-400 mb-4" />
                      <h2 className="text-xl font-semibold text-slate-800 mb-2">
                        No submissions yet
                      </h2>
                      <p className="text-slate-600 mb-6">
                        Upload your first math solution to get AI-powered feedback on your work.
                      </p>
                      <Link href="/upload" className="btn-primary">
                        Upload Your First Solution
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="card-luxury overflow-hidden">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">
                          Recent Submissions
                        </h2>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-slate-200">
                                <th className="pb-3 text-left font-medium text-slate-600">
                                  Problem
                                </th>
                                <th className="pb-3 text-left font-medium text-slate-600">
                                  Date
                                </th>
                                <th className="pb-3 text-left font-medium text-slate-600">
                                  Status
                                </th>
                                <th className="pb-3 text-left font-medium text-slate-600">
                                  Errors
                                </th>
                                <th className="pb-3 text-right font-medium text-slate-600">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {submissions.map((submission, index) => (
                                <motion.tr
                                  key={submission.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                  className="border-b border-slate-100"
                                >
                                  <td className="py-4 pr-4">
                                    <div className="font-medium text-slate-800 truncate max-w-xs">
                                      {submission.problem}
                                    </div>
                                  </td>
                                  <td className="py-4 pr-4">
                                    <div className="flex items-center text-slate-600">
                                      <FiCalendar className="mr-2 text-slate-400" size={14} />
                                      {new Date(submission.date).toLocaleDateString()}
                                    </div>
                                  </td>
                                  <td className="py-4 pr-4">
                                    <span
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        submission.status === "completed"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-blue-100 text-blue-800"
                                      }`}
                                    >
                                      {submission.status === "completed" ? (
                                        <>
                                          <FiCheckCircle className="mr-1" size={12} />
                                          Completed
                                        </>
                                      ) : (
                                        "Processing"
                                      )}
                                    </span>
                                  </td>
                                  <td className="py-4 pr-4">
                                    {submission.hasErrors ? (
                                      <span className="inline-flex items-center text-red-600">
                                        <FiAlertCircle className="mr-1" size={14} />
                                        {submission.errorCount} found
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center text-green-600">
                                        <FiCheckCircle className="mr-1" size={14} />
                                        All correct
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-4 text-right">
                                    <Link
                                      href={`/results/${submission.id}`}
                                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                      View <FiArrowRight className="ml-1" size={14} />
                                    </Link>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="card-luxury"
                        whileHover={{ y: -5 }}
                      >
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">
                          Your Progress
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-slate-600">
                                Total Submissions
                              </span>
                              <span className="text-sm font-medium text-slate-800">
                                {submissions.length}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: "100%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-slate-600">
                                Correct Solutions
                              </span>
                              <span className="text-sm font-medium text-slate-800">
                                {submissions.filter(s => !s.hasErrors).length}/{submissions.length}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{
                                  width: `${(submissions.filter(s => !s.hasErrors).length / submissions.length) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="card-luxury"
                        whileHover={{ y: -5 }}
                      >
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">
                          Common Mistakes
                        </h2>
                        <div className="space-y-3">
                          {[
                            { type: "Calculation", count: 2 },
                            { type: "Conceptual", count: 1 },
                          ].map((mistake, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                <span className="text-slate-700">{mistake.type}</span>
                              </div>
                              <span className="text-slate-500 text-sm font-medium">
                                {mistake.count} times
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
