"use client";

import React from "react";
import Navbar from "./Navbar";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-slate-50 py-6">
        <div className="container-custom text-center text-sm text-slate-500">
          © {new Date().getFullYear()} MathsClarity AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PageLayout; 