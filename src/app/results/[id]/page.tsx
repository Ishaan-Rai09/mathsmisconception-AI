"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

interface Step {
  step: number;
  content: string;
  isCorrect: boolean;
  explanation: string;
  correction?: string;
}

interface Misconception {
  type: string;
  description: string;
  step: number;
  impact: string;
}

interface Analysis {
  userId: string;
  filename: string;
  timestamp: string;
  problem: string;
  steps: Step[];
  misconceptions: Misconception[];
  summary: string;
  overallFeedback: string;
}

export default function ResultsPage() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`/api/ai-analysis?id=${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch analysis");
        }
        
        const data = await response.json();
        setAnalysis(data.analysis);
      } catch (err) {
        console.error("Error fetching analysis:", err);
        setError("Failed to load analysis results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <>
        <SignedIn>
          <div className="min-h-screen gradient-bg flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading analysis results...</p>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    );
  }

  if (error || !analysis) {
    return (
      <>
        <SignedIn>
          <div className="min-h-screen gradient-bg flex items-center justify-center">
            <div className="max-w-3xl mx-auto text-center">
              <FiAlertCircle className="mx-auto text-5xl text-red-500 mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Results</h1>
              <p className="text-gray-600 mb-6">{error || "Analysis not found"}</p>
              <Link href="/upload" className="btn-primary">
                Try Again
              </Link>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    );
  }

  return (
    <>
      <SignedIn>
        <div className="min-h-screen gradient-bg py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4"
          >
            <div className="mb-8">
              <Link href="/dashboard" className="inline-flex items-center text-gradient font-medium hover:opacity-80 transition-opacity">
                <FiArrowLeft className="mr-2" /> Back to Dashboard
              </Link>
            </div>

            <div className="card-luxury">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Analysis Results</h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
                <div>
                  <span className="font-medium">File:</span> {analysis.filename}
                </div>
                <div>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(analysis.timestamp).toLocaleDateString()}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-8">
                <h2 className="font-semibold text-slate-800 mb-2">Problem</h2>
                <p className="text-slate-700">{analysis.problem}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Step-by-Step Analysis</h2>
                <div className="space-y-6">
                  {analysis.steps.map((step) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: step.step * 0.1 }}
                      className={`border rounded-lg p-4 ${
                        step.isCorrect ? "border-green-100" : "border-red-100"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.isCorrect
                              ? "bg-green-100 text-green-500"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {step.isCorrect ? (
                            <FiCheckCircle size={18} />
                          ) : (
                            <FiXCircle size={18} />
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-slate-800">
                              Step {step.step}
                            </h3>
                            <span
                              className={`text-sm font-medium px-2 py-1 rounded-full ${
                                step.isCorrect
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {step.isCorrect ? "Correct" : "Incorrect"}
                            </span>
                          </div>
                          <div className="mt-2 p-3 bg-slate-50 rounded font-mono text-slate-700">
                            {step.content}
                          </div>
                          <div className="mt-3 text-sm">
                            <p
                              className={
                                step.isCorrect
                                  ? "text-slate-600"
                                  : "text-red-600"
                              }
                            >
                              {step.explanation}
                            </p>
                            {step.correction && (
                              <div className="mt-2">
                                <p className="text-green-600 font-medium">
                                  Correction: {step.correction}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Misconceptions Identified</h2>
                <div className="space-y-3">
                  {analysis.misconceptions.map((misconception, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 border border-amber-100 rounded-lg bg-amber-50"
                    >
                      <FiAlertCircle className="text-amber-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-800">
                          {misconception.description}
                        </p>
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Type:</span>{" "}
                          {misconception.type.charAt(0).toUpperCase() +
                            misconception.type.slice(1)}
                          {" | "}
                          <span className="font-medium">At step:</span>{" "}
                          {misconception.step}
                          {" | "}
                          <span className="font-medium">Impact:</span>{" "}
                          <span
                            className={`${
                              misconception.impact === "high"
                                ? "text-red-600"
                                : misconception.impact === "medium"
                                ? "text-amber-600"
                                : "text-blue-600"
                            }`}
                          >
                            {misconception.impact.charAt(0).toUpperCase() +
                              misconception.impact.slice(1)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Summary</h2>
                <div className="p-4 bg-slate-50 rounded-lg text-slate-700">
                  {analysis.summary}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Overall Feedback</h2>
                <div className="p-4 bg-blue-50 rounded-lg text-slate-700 border-l-4 border-blue-500">
                  {analysis.overallFeedback}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Link href="/upload" className="btn-secondary">
                Upload Another Solution
              </Link>
              <Link href="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
