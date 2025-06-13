"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Menu, ChevronRight, Scale } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Header */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav
          className={`
          mx-auto max-w-7xl 
          bg-white/60 backdrop-blur-md 
          border border-amber-100/30 
          shadow-lg shadow-amber-100/20 
          rounded-full px-6 py-4 
          transition-all duration-300
          relative overflow-hidden
          ${scrollY > 50 ? "bg-white/75 backdrop-blur-lg" : ""}
        `}
        >
          {/* Progress Bar */}
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600"
            style={{
              width: "100%",
              scaleX: scrollProgress / 100,
              transformOrigin: "0%",
              opacity: scrollProgress > 0 ? 1 : 0,
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          />

          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Scale className="w-8 h-8 text-amber-600" />
                </motion.div>
                <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  LegalConnect
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-8 text-sm">
              <Link
                href="#features"
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#solutions"
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                Solutions
              </Link>
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <Link
                  href="/sign-in"
                  className="text-gray-600 hover:text-amber-600 transition-colors"
                >
                  Sign in
                </Link>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center gap-4 md:hidden">
              {isSignedIn && <UserButton afterSignOutUrl="/" />}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-amber-600 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-24 left-4 right-4 bg-white rounded-2xl shadow-xl border border-[#f5c05a]/20 p-6 md:hidden"
            >
              <div className="flex flex-col gap-4">
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-amber-600 transition-colors p-2 hover:bg-amber-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#solutions"
                  className="text-gray-600 hover:text-amber-600 transition-colors p-2 hover:bg-amber-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Solutions
                </Link>
                {!isSignedIn && (
                  <Link
                    href="/sign-in"
                    className="text-gray-600 hover:text-amber-600 transition-colors p-2 hover:bg-amber-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default NavBar;
