"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTeacherAuth } from "@/contexts/TeacherAuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn, userId } = useAuth();
  const { isTeacherLoggedIn, logoutTeacher } = useTeacherAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleTeacherLogout = () => {
    logoutTeacher();
    router.push('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <motion.span 
              className="text-3xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
            >
              MathsClarity
            </motion.span>
            <motion.span 
              className="text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full"
              whileHover={{ scale: 1.1 }}
            >
              AI
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {isTeacherLoggedIn ? (
                // Teacher is logged in
                <>
                  <Link href="/teacher" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                    Teacher Dashboard
                  </Link>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiUser size={16} />
                      <span>Teacher</span>
                    </div>
                    <button
                      onClick={handleTeacherLogout}
                      className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <FiLogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : isSignedIn ? (
                // Student is logged in
                <>
                  <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                // No one is logged in
                <>
                  <SignInButton mode="modal">
                    <button className="btn-secondary text-sm px-6 py-2">
                      Student Login
                    </button>
                  </SignInButton>
                  <Link href="/teacher-login" className="btn-primary text-sm px-6 py-2">
                    Teacher Login
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container-custom py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium py-2 transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {isTeacherLoggedIn ? (
                // Teacher is logged in
                <div className="py-2 space-y-3">
                  <Link 
                    href="/teacher" 
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Teacher Dashboard
                  </Link>
                  <div className="flex items-center space-x-2 py-2">
                    <FiUser size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-600">Teacher</span>
                  </div>
                  <button
                    onClick={() => {
                      handleTeacherLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600 py-2 transition-colors"
                  >
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : isSignedIn ? (
                // Student is logged in
                <div className="py-2 space-y-3">
                  <Link 
                    href="/dashboard" 
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                // No one is logged in
                <div className="flex flex-col space-y-3 pt-2">
                  <SignInButton mode="modal">
                    <button className="btn-secondary w-full">
                      Student Login
                    </button>
                  </SignInButton>
                  <Link 
                    href="/teacher-login" 
                    className="btn-primary w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Teacher Login
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 