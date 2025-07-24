import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Mock database of analyses
let analyses: Record<string, any> = {};

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse form data (in a real app, you would save the file to storage)
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Generate a unique ID for this analysis
    const analysisId = `analysis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // In a real app, you would:
    // 1. Upload the file to cloud storage
    // 2. Call an AI service to analyze the math solution
    // 3. Store the results in a database

    // For now, we'll simulate AI analysis with mock data
    const mockAnalysis = generateMockAnalysis(userId, file.name);

    // Store the analysis in our mock database
    analyses[analysisId] = mockAnalysis;

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ 
      success: true, 
      analysisId,
      message: "File uploaded and analysis started" 
    });
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the analysis ID from the URL
    const url = new URL(request.url);
    const analysisId = url.searchParams.get("id");

    if (!analysisId) {
      return NextResponse.json({ error: "No analysis ID provided" }, { status: 400 });
    }

    // Get the analysis from our mock database
    const analysis = analyses[analysisId];

    if (!analysis) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }

    // Check if the analysis belongs to the user
    if (analysis.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error("Error retrieving analysis:", error);
    return NextResponse.json(
      { error: "Failed to retrieve analysis" },
      { status: 500 }
    );
  }
}

// Helper function to generate mock analysis data
function generateMockAnalysis(userId: string, filename: string) {
  // Example math problem: Solve for x: 2x + 5 = 15
  const steps = [
    {
      step: 1,
      content: "2x + 5 = 15",
      isCorrect: true,
      explanation: "Initial equation",
    },
    {
      step: 2,
      content: "2x = 15 - 5",
      isCorrect: true,
      explanation: "Subtract 5 from both sides",
    },
    {
      step: 3,
      content: "2x = 9", // Intentional error
      isCorrect: false,
      explanation: "Calculation error: 15 - 5 = 10, not 9",
      correction: "2x = 10",
    },
    {
      step: 4,
      content: "x = 9/2 = 4.5",
      isCorrect: false,
      explanation: "This follows from the previous error. The correct value should be x = 10/2 = 5",
      correction: "x = 10/2 = 5",
    },
  ];

  const misconceptions = [
    {
      type: "calculation",
      description: "Calculation error in subtraction",
      step: 3,
      impact: "high",
    },
  ];

  return {
    userId,
    filename,
    timestamp: new Date().toISOString(),
    problem: "Solve for x: 2x + 5 = 15",
    steps,
    misconceptions,
    summary: "The solution contains a calculation error in step 3, where 15 - 5 was incorrectly calculated as 9 instead of 10. This led to an incorrect final answer of x = 4.5, when the correct answer is x = 5.",
    overallFeedback: "Be careful with basic arithmetic operations. Double-check your calculations, especially when working with negative numbers or fractions.",
  };
} 