"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Book,
  Users,
  Sparkles,
  FileText,
  Lock,
  FileCheck,
  Menu,
  Star,
  ChevronRight,
  Scale,
  Scroll,
  BrainCircuit,
  Award,
  BarChart,
  Users2,
  Clock,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatButton from "./components/ChatButton";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll effects
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
    <div className="min-h-screen bg-white">
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
          {/* Progress Bar - Add this at the top of nav */}
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
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Scale className="w-8 h-8 text-amber-600" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                LegalConnect
              </span>
            </motion.div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-sm">
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
              {/* <Link
                href="/pricing"
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                Pricing
              </Link> */}
              <Link
                href="/sign-in"
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/get-started"
                className="bg-[#d4a017] text-white px-5 py-2.5 rounded-full hover:bg-[#b17d25] transition-all flex items-center gap-2 group"
              >
                Get Started{" "}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <UserButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-amber-600 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
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
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-amber-600 transition-colors p-2 hover:bg-amber-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/sign-in"
                  className="text-gray-600 hover:text-amber-600 transition-colors p-2 hover:bg-amber-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/get-started"
                  className="bg-[#d4a017] text-white px-5 py-3 rounded-xl hover:bg-[#b17d25] transition-all flex items-center justify-center gap-2 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started{" "}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hero Section - Add animations */}
      <motion.section
        className="pt-32 pb-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-600 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              AI-Powered Legal Solutions
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight mb-6">
              Your Legal Practice,{" "}
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with clients, streamline your practice, and deliver better
              legal services with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
              >
                Get Started{" "}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="bg-white text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all border border-gray-200 flex items-center justify-center gap-2"
              >
                Book a Demo <BrainCircuit className="w-5 h-5" />
              </Link>
            </div>

            {/* Add Hero Image */}
            <motion.div
              className="mt-16 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src="/hero-image.webp"
                  alt="LegalConnect Platform Interface"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                />
                {/* Add gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-gray-900/10 to-transparent" />

                {/* Add floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <FileText className="w-6 h-6 text-gray-600" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <Users className="w-6 h-6 text-gray-600" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Update background blobs to grayscale */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-20"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-gray-300 rounded-full blur-3xl opacity-20"
          />
        </div>
      </motion.section>

      {/* Features Grid - Add animations */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#f5c05a] transition-all hover:shadow-lg hover:shadow-[#f5c05a]/10 group"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#fff2d4] transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section - Add animations */}
      <motion.section
        className="py-20 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 relative">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#f5c05a] transition-all hover:shadow-lg hover:shadow-[#f5c05a]/10 group"
              >
                {stat.icon}
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#d4a017] to-[#ffd700] bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section - Add animations */}
      <motion.section
        className="py-20 bg-[#d4a017] text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Ready to Transform Your Legal Practice?
            </h2>
            <p className="text-amber-200 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of legal professionals already using LegalConnect
              to grow their practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="bg-white text-[#d4a017] px-8 py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group font-medium"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/schedule-demo"
                className="bg-[#b17d25] text-white px-8 py-4 rounded-xl hover:bg-[#8b6514] transition-all border border-white/20"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-500">
              Trusted by Legal Professionals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what legal professionals around the world are saying about
              LegalConnect
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg relative"
              >
                <div className="absolute -top-4 left-8">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-amber-600 text-white p-2 rounded-full"
                  >
                    <Star className="w-4 h-4" />
                  </motion.div>
                </div>
                <p className="text-gray-600 mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <Users2 className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-500">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Integration Partners */}
      <motion.section
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-500 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with your favorite tools and platforms
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#f5c05a] transition-all hover:shadow-lg group text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[#fff8eb] rounded-xl flex items-center justify-center group-hover:bg-[#fff2d4] transition-colors">
                  {integration.icon}
                </div>
                <h3 className="font-semibold text-gray-500 mb-2">{integration.name}</h3>
                <p className="text-sm text-gray-600">
                  {integration.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-500">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started with LegalConnect in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-200/50 -z-10 hidden md:block" />
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#f5c05a] transition-all hover:shadow-lg">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mb-6 mx-auto">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-500 mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Scale className="w-8 h-8 text-amber-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  LegalConnect
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                Making legal services more accessible and efficient through
                AI-powered solutions.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-600 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-400 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/features">Features</Link>
                </li>
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/security">Security</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-400 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-400 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms</Link>
                </li>
                <li>
                  <Link href="/security">Security</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2024 LegalConnect. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link
                href="/privacy"
                className="hover:text-amber-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-amber-600 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Modal */}
      <ChatButton />
    </div>
  );
}

const features = [
  {
    title: "AI-Powered Legal Research",
    description:
      "Get instant answers to complex legal questions using our advanced AI system.",
    icon: <BrainCircuit className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Client Management",
    description:
      "Streamline client communication and document management in one place.",
    icon: <Users className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Smart Automation",
    description:
      "Automate routine tasks and focus on what matters most - your clients.",
    icon: <Sparkles className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Document Analysis",
    description:
      "Review and analyze legal documents faster with AI assistance.",
    icon: <FileText className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Secure Communication",
    description: "End-to-end encrypted client communications and file sharing.",
    icon: <Lock className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Legal Templates",
    description:
      "Access a library of customizable legal documents and templates.",
    icon: <Scroll className="w-6 h-6 text-[#d4a017]" />,
  },
];

const stats = [
  {
    number: "10k+",
    label: "Legal Professionals",
    icon: <Users2 className="w-6 h-6 text-[#d4a017] mb-4" />,
  },
  {
    number: "1M+",
    label: "Documents Analyzed",
    icon: <BarChart className="w-6 h-6 text-[#d4a017] mb-4" />,
  },
  {
    number: "98%",
    label: "Client Satisfaction",
    icon: <Award className="w-6 h-6 text-[#d4a017] mb-4" />,
  },
  {
    number: "24/7",
    label: "Support Available",
    icon: <Clock className="w-6 h-6 text-[#d4a017] mb-4" />,
  },
];

const testimonials = [
  {
    quote:
      "LegalConnect has transformed how we handle cases. The AI-powered research tool saves us hours of work.",
    name: "Sarah Johnson",
    role: "Senior Partner, Johnson & Associates",
  },
  {
    quote:
      "The automated document analysis feature is a game-changer. It's like having an extra associate on the team.",
    name: "Michael Chen",
    role: "Corporate Lawyer, Chen Legal Group",
  },
  {
    quote:
      "Client management has never been easier. Our firm's efficiency has improved dramatically.",
    name: "Emily Rodriguez",
    role: "Managing Partner, Rodriguez Law",
  },
];

const integrations = [
  {
    name: "Clio",
    description: "Practice Management",
    icon: <FileCheck className="w-8 h-8 text-[#d4a017]" />,
  },
  {
    name: "DocuSign",
    description: "E-Signatures",
    icon: <FileText className="w-8 h-8 text-[#d4a017]" />,
  },
  {
    name: "Quickbooks",
    description: "Accounting",
    icon: <BarChart className="w-8 h-8 text-[#d4a017]" />,
  },
  {
    name: "Slack",
    description: "Communication",
    icon: <MessageSquare className="w-8 h-8 text-[#d4a017]" />,
  },
];

const steps = [
  {
    title: "Sign Up",
    description:
      "Create your account and set up your firm's profile in minutes",
  },
  {
    title: "Import Data",
    description: "Seamlessly import your existing cases and client information",
  },
  {
    title: "Start Working",
    description: "Begin using our AI-powered tools to enhance your practice",
  },
];
