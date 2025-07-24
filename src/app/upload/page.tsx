"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiFile, FiX, FiInfo } from "react-icons/fi";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setError(null);

    // Create preview for image files
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else if (selectedFile.type === "application/pdf") {
      // Use a data URI for PDF icon instead of file path
      setPreview("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgNTEyIj48cGF0aCBmaWxsPSIjZWY0NDQ0IiBkPSJNMTgxLjkgMjU2LjFjLTUtMTYtNC45LTQ2LjktLjEtNjQuOS4xLS4xLjEtLjEuMi0uMy4yLS42LjgtLjUgMS0uMi4xIDAgLjEuMS4xLjIgMTMuMyA0Ny41IDEwLjggOTQuMSA5LjEgMTI4LjEtLjIgMi0uNiAzLjktMS4xIDUuOC0xLjcgNi44LTQuNSA4LjItOS43IDguMi0xMy4zIDAtMjcuMy0yLjMtMzIuNy0yLjMtMi45IDAtNS44LjQtOC4yIDEuMi0xMi40IDMuOC0xNS42LTguMy0xNS42LTguMy0yLjgtMTYuOS01LjctMjUuNi04LjctMzIuMS0zLTYuNS00LjItMTQtMy40LTIwLjIgMi0xOC43IDIyLjktMzkuNiA0NS4xLTE1LjIgMTAgMTEgMTQuMyAxOS4yIDE1LjEgMjEuOC4zLjUuNi44IDEuMi44LjggMCAxLjItMS4xLjktMS44LTIuOS03LjMtOS4xLTIxLjItMjguNy0zNS43LTE0LjMtMTAuNy0zOS4xLTEwLjctNTguNSAxMy4zLTExLjUgMTQuMy0xNy45IDMzLjQtMTcuOSA0Ni4yIDAgOC4zIDMuMiAxNS44IDkuNSAyMi43IDguMyA5LjEgMTMuNyAyMi4xIDE4LjkgMzYuNyA0LjcgMTMuNCA5LjUgMjcuMSAxNy44IDM5LjcgMTAuOCAxNi4zIDI0IDI0LjQgNDAuOCAyNC44IDE4LjMuNCAxOS44LTguMSAxOS44LTguMSAwLTEzLjMtMTMuNC0yMS44LTEzLjQtMjEuOHptMTczLjktMTI5LjljLTUuOC05LjQtMTYuOC0xNC44LTMwLjktMTUuMi0xNC4xLS40LTI2LjYgNC49LTMzLjUgMTMuOC0xMy45IDE3LjgtMTguMiA0My43LTE5LjUgNzEuNS0xLjEgMjMuNSAxLjUgNDcuMSA3LjcgNjkuNi01LjkgMi41LTEyLjUgNC4xLTE5LjcgNS4yLTQxLjQgNi4yLTgwLTEuNy04MS40LTIuMS0xLjItLjItMi4zLjEtMy4xLjctLjguNi0xLjQgMS40LTEuNyAyLjQtLjkgMy4xIDEuNCA2LjIgNC41IDYuNiAxLjEuMiAyLjIuMiAzLjIuMiAzNy42IDAgNzIuMi03LjggOTMuNi0xNC4zIDEyLjEgOS4zIDI3LjMgMTQuMyA0My40IDE0LjMgMTcuMiAwIDMyLjgtNS43IDQzLjQtMTYuMiAyMC4zLTIwLjIgMjAuNC01My45IDMuNC05Mi42LTIuMi01LjItNC44LTEwLjYtNy40LTE1LjVoLjFjLjEtLjEtMS4yLTIuNy0xLjItMi43em0tMTU2LjkgMTEyYy0yLjItMS4yLTQuNS0yLjItNi45LTMgMi4yLTU4IDYuMi04NC41IDEwLjEtOTYuOSA1LjYtMTcuNyAxNS4yLTIzLjEgMjQuMi0yMy4xIDEzLjkgMCAxOS41IDguMiAyMi4yIDE1LjkgMi45IDguOS4OCAyMy40LTMuNSAzNi4xLTYuNSAxOS40LTE3LjYgMzctMjYuMSA0OHptMTA2LjEtNzdjLTIuMyAxLjktNC43IDMuNi03LjQgNS4xLTEuNS44LTMuMSAxLjYtNC43IDIuMy0xMC40IDQuOC0yMi4xIDcuMy0zNC45IDcuMy0xMC42IDAtMTkuOS0xLjUtMjcuNC00LjMgMy41LTMwLjUgNy41LTU2LjcgMTguNi03NC44IDUuNy05LjMgMTMuMy0xNS45IDIxLjgxLTE4LjggNC4yLTEuNCA4LjgtMi4yIDEzLjMtMi4yIDUuMiAwIDkuOC45IDEzLjcgMi43IDcuOCAzLjYgMTMuMiAxMC4yIDE1LjkgMTkuOCAzLjMgMTEuOSAzLjcgMzQuNyAxLjIgNjIuOXptLTYwLjkgMTI3LjJjMTQuMi0xLjQgMjcuNS00LjEgMzkuNS03LjggMS44IDYuNCAxLjggMTIuMy4zIDE3LjYtMi40IDguMy05LjUgMTMuOS0xOC4zIDE0LjQtMTEuMy42LTIwLjUtNi44LTIxLjUtMjQuMnoiPjwvcGF0aD48L3N2Zz4=");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create form data to send file
      const formData = new FormData();
      formData.append("file", file);

      // Send file to API
      const response = await fetch("/api/ai-analysis", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      
      // Redirect to results page with the analysis ID
      router.push(`/results/${data.analysisId}`);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file. Please try again.");
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <>
      <SignedIn>
        <div className="min-h-screen gradient-bg py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto px-4"
          >
            <h1 className="text-4xl font-bold text-gradient mb-4 text-center">Upload Your Math Solution</h1>
            <p className="text-gray-600 mb-10 text-center text-lg">
              Upload an image or PDF of your math solution to get AI-powered feedback.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {!file ? (
                  <div
                    {...getRootProps()}
                    className={`card-luxury border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
                      isDragActive
                        ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 scale-105"
                        : "border-gray-300 hover:border-blue-400 hover:shadow-2xl"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center">
                      <FiUpload className="text-4xl text-blue-500 mb-4" />
                      <p className="text-slate-700 font-medium mb-1">
                        {isDragActive
                          ? "Drop your file here"
                          : "Drag & drop your file here"}
                      </p>
                      <p className="text-slate-500 text-sm mb-4">or click to browse files</p>
                      <p className="text-xs text-slate-400">
                        Supported formats: PNG, JPEG, PDF
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-slate-800">File Preview</h3>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-slate-400 hover:text-red-500"
                        aria-label="Remove file"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      {preview ? (
                        <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                          <img
                            src={preview}
                            alt="File preview"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-md bg-slate-100 flex items-center justify-center">
                          <FiFile className="text-2xl text-slate-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-slate-700 truncate max-w-xs">
                          {file.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <FiInfo /> {error}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!file || loading}
                  className={`btn-primary ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Analyzing..." : "Submit for Analysis"}
                </button>
              </div>
            </form>

            <div className="mt-10 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">Tips for best results</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <FiInfo className="text-blue-500 mt-1 flex-shrink-0" />
                  Make sure your handwriting is clear and legible
                </li>
                <li className="flex items-start gap-2">
                  <FiInfo className="text-blue-500 mt-1 flex-shrink-0" />
                  Ensure good lighting if taking a photo
                </li>
                <li className="flex items-start gap-2">
                  <FiInfo className="text-blue-500 mt-1 flex-shrink-0" />
                  Include all steps of your solution
                </li>
                <li className="flex items-start gap-2">
                  <FiInfo className="text-blue-500 mt-1 flex-shrink-0" />
                  For best results, use a flat, non-glossy surface
                </li>
              </ul>
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
