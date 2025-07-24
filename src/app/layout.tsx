import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import PageLayout from "@/components/PageLayout";
import { TeacherAuthProvider } from "@/contexts/TeacherAuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MathsClarity AI - Math Misconception Detector",
  description: "Premium web app for detecting math misconceptions and providing detailed feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} font-sans antialiased`}>
          <TeacherAuthProvider>
            <PageLayout>
              {children}
            </PageLayout>
          </TeacherAuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
