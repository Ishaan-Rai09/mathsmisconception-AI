"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiUsers, FiFileText, FiBarChart2, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useTeacherAuth } from "@/contexts/TeacherAuthContext";
import { useRouter } from "next/navigation";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Mock data for teacher dashboard
const MOCK_STUDENTS = [
  { id: "user_1", name: "Alex Johnson", submissions: 3, errorRate: 33 },
  { id: "user_2", name: "Sam Smith", submissions: 2, errorRate: 50 },
  { id: "user_3", name: "Taylor Wong", submissions: 5, errorRate: 20 },
  { id: "user_4", name: "Jordan Lee", submissions: 1, errorRate: 0 },
];

const MOCK_SUBMISSIONS = [
  {
    id: "analysis_1",
    studentId: "user_1",
    studentName: "Alex Johnson",
    problem: "Solve for x: 2x + 5 = 15",
    date: "2023-06-15T10:30:00Z",
    hasErrors: true,
    errorCount: 2,
    misconceptionTypes: ["calculation"],
  },
  {
    id: "analysis_2",
    studentId: "user_1",
    studentName: "Alex Johnson",
    problem: "Find the derivative of f(x) = x³ + 2x² - 4x + 7",
    date: "2023-06-14T14:45:00Z",
    hasErrors: false,
    errorCount: 0,
    misconceptionTypes: [],
  },
  {
    id: "analysis_3",
    studentId: "user_2",
    studentName: "Sam Smith",
    problem: "Solve the system of equations: 3x + y = 7 and x - 2y = -1",
    date: "2023-06-10T09:15:00Z",
    hasErrors: true,
    errorCount: 1,
    misconceptionTypes: ["conceptual"],
  },
  {
    id: "analysis_4",
    studentId: "user_3",
    studentName: "Taylor Wong",
    problem: "Find the limit of (sin x)/x as x approaches 0",
    date: "2023-06-09T11:20:00Z",
    hasErrors: true,
    errorCount: 1,
    misconceptionTypes: ["conceptual"],
  },
  {
    id: "analysis_5",
    studentId: "user_3",
    studentName: "Taylor Wong",
    problem: "Evaluate the integral of 2x + 3 from 0 to 4",
    date: "2023-06-08T13:40:00Z",
    hasErrors: false,
    errorCount: 0,
    misconceptionTypes: [],
  },
];

// Mock authentication check for teacher role
const isTeacher = () => true; // In a real app, this would check the user's role from Clerk metadata

export default function TeacherDashboard() {
  const { isTeacherLoggedIn, logoutTeacher } = useTeacherAuth();
  const router = useRouter();
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if teacher is logged in
    if (!isTeacherLoggedIn) {
      router.push('/teacher-login');
      return;
    }
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isTeacherLoggedIn, router]);

  // Calculate analytics data
  const totalSubmissions = submissions.length;
  const submissionsWithErrors = submissions.filter(s => s.hasErrors).length;
  const errorRate = totalSubmissions > 0 ? (submissionsWithErrors / totalSubmissions) * 100 : 0;

  // Count misconception types
  const misconceptionCounts = submissions.reduce((acc, submission) => {
    submission.misconceptionTypes.forEach(type => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Prepare chart data
  const pieChartData = {
    labels: ['Correct', 'With Errors'],
    datasets: [
      {
        data: [totalSubmissions - submissionsWithErrors, submissionsWithErrors],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(misconceptionCounts).map(type => type.charAt(0).toUpperCase() + type.slice(1)),
    datasets: [
      {
        label: 'Number of Occurrences',
        data: Object.values(misconceptionCounts),
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Types of Misconceptions',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  // Don't render anything if teacher is not logged in (redirect will happen in useEffect)
  if (!isTeacherLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="gradient-bg min-h-screen">
      <div className="container-custom py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-between items-center"
          >
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Teacher Dashboard</h1>
              <p className="text-slate-600">
                Monitor student progress and identify common misconceptions
              </p>
            </div>
            <button
              onClick={() => {
                logoutTeacher();
                router.push('/');
              }}
              className="btn-secondary text-sm"
            >
              Logout
            </button>
          </motion.div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {/* Analytics Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-white rounded-xl shadow-md p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-800">Students</h2>
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FiUsers className="text-blue-600" size={20} />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-slate-800 mb-1">
                        {students.length}
                      </div>
                      <p className="text-slate-500">Total students</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white rounded-xl shadow-md p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-800">Submissions</h2>
                        <div className="p-2 bg-green-100 rounded-lg">
                          <FiFileText className="text-green-600" size={20} />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-slate-800 mb-1">
                        {totalSubmissions}
                      </div>
                      <p className="text-slate-500">Total submissions</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-white rounded-xl shadow-md p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-800">Error Rate</h2>
                        <div className="p-2 bg-red-100 rounded-lg">
                          <FiAlertCircle className="text-red-600" size={20} />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-slate-800 mb-1">
                        {errorRate.toFixed(1)}%
                      </div>
                      <p className="text-slate-500">Submissions with errors</p>
                    </motion.div>
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="bg-white rounded-xl shadow-md p-6"
                    >
                      <h2 className="text-lg font-semibold text-slate-800 mb-4">
                        Submission Results
                      </h2>
                      <div className="h-64 flex items-center justify-center">
                        <div className="w-48 h-48">
                          <Pie data={pieChartData} />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="bg-white rounded-xl shadow-md p-6"
                    >
                      <h2 className="text-lg font-semibold text-slate-800 mb-4">
                        Misconception Types
                      </h2>
                      <div className="h-64">
                        <Bar data={barChartData} options={barChartOptions as any} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Student List */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-slate-800">
                          Students
                        </h2>
                        <div className="text-sm text-slate-500">
                          {students.length} total
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="pb-3 text-left font-medium text-slate-600">
                                Student
                              </th>
                              <th className="pb-3 text-left font-medium text-slate-600">
                                Submissions
                              </th>
                              <th className="pb-3 text-left font-medium text-slate-600">
                                Error Rate
                              </th>
                              <th className="pb-3 text-right font-medium text-slate-600">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {students.map((student, index) => (
                              <tr
                                key={student.id}
                                className="border-b border-slate-100"
                              >
                                <td className="py-4 pr-4">
                                  <div className="font-medium text-slate-800">
                                    {student.name}
                                  </div>
                                </td>
                                <td className="py-4 pr-4">
                                  <div className="text-slate-600">
                                    {student.submissions}
                                  </div>
                                </td>
                                <td className="py-4 pr-4">
                                  <div
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      student.errorRate > 50
                                        ? "bg-red-100 text-red-800"
                                        : student.errorRate > 25
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {student.errorRate}%
                                  </div>
                                </td>
                                <td className="py-4 text-right">
                                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>

                  {/* Recent Submissions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-slate-800">
                          Recent Submissions
                        </h2>
                        <div className="text-sm text-slate-500">
                          {submissions.length} total
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="pb-3 text-left font-medium text-slate-600">
                                Student
                              </th>
                              <th className="pb-3 text-left font-medium text-slate-600">
                                Problem
                              </th>
                              <th className="pb-3 text-left font-medium text-slate-600">
                                Date
                              </th>
                              <th className="pb-3 text-left font-medium text-slate-600">
                                Status
                              </th>
                              <th className="pb-3 text-right font-medium text-slate-600">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {submissions.map((submission, index) => (
                              <tr
                                key={submission.id}
                                className="border-b border-slate-100"
                              >
                                <td className="py-4 pr-4">
                                  <div className="font-medium text-slate-800">
                                    {submission.studentName}
                                  </div>
                                </td>
                                <td className="py-4 pr-4">
                                  <div className="text-slate-600 truncate max-w-xs">
                                    {submission.problem}
                                  </div>
                                </td>
                                <td className="py-4 pr-4">
                                  <div className="text-slate-600">
                                    {new Date(submission.date).toLocaleDateString()}
                                  </div>
                                </td>
                                <td className="py-4 pr-4">
                                  <div
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      submission.hasErrors
                                        ? "bg-red-100 text-red-800"
                                        : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {submission.hasErrors
                                      ? `${submission.errorCount} errors`
                                      : "Correct"}
                                  </div>
                                </td>
                                <td className="py-4 text-right">
                                  <Link
                                    href={`/results/${submission.id}`}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                  >
                                    View <FiArrowRight className="ml-1" size={14} />
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
        </div>
      </div>
    </div>
  );
} 