"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Sparkles,
  FileText,
  Lock,
  FileCheck,
  Star,
  ChevronRight,
  Scroll,
  BrainCircuit,
  Award,
  BarChart,
  Users2,
  Clock,
  ArrowRight,
  MessageSquare,
  Video,
  Briefcase,
  BookOpen,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatButton from "./components/ChatButton";
import Navbar from "@components/Navbar";

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
      <Navbar />
      {/* Hero Section */}
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
              Legal Help Made Simple
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight mb-6">
              Legal Help for{" "}
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Everyone
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get instant legal guidance, connect with trusted lawyers, and
              learn your rights through short, engaging videos. All in one
              secure platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
              >
                Get Started Free{" "}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="bg-white text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all border border-gray-200 flex items-center justify-center gap-2"
              >
                Watch Demo <BrainCircuit className="w-5 h-5" />
              </Link>
            </div>

            {/* Hero Image */}
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
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-gray-900/10 to-transparent" />

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <MessageSquare className="w-6 h-6 text-gray-600" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <Video className="w-6 h-6 text-gray-600" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background blobs */}
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

      {/* Features Grid */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Your Legal Journey, Simplified
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to understand and navigate legal matters, all
              in one place
            </p>
          </div>
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

      {/* Target Audience Section */}
      <motion.section
        className="py-20 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Who We Serve
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              LegalConnect is designed for everyone who needs legal guidance
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {audience.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#f5c05a] transition-all hover:shadow-lg hover:shadow-[#f5c05a]/10 group"
              >
                {item.icon}
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#d4a017] to-[#ffd700] bg-clip-text text-transparent">
                  {item.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
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
              Ready to Take Control of Your Legal Matters?
            </h2>
            <p className="text-amber-200 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of users who trust LegalConnect for their legal
              needs. Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="bg-white text-[#d4a017] px-8 py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group font-medium"
              >
                Start Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/schedule-demo"
                className="bg-[#b17d25] text-white px-8 py-4 rounded-xl hover:bg-[#8b6514] transition-all border border-white/20"
              >
                Learn More
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from people who found legal help through LegalConnect
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
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Chat Modal */}
      <ChatButton />
    </div>
  );
}

const features = [
  {
    title: "AI Legal Assistant",
    description:
      "Get instant answers to your legal questions and understand complex legal concepts in simple terms.",
    icon: <BrainCircuit className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Connect with Lawyers",
    description:
      "Chat, call, or video conference with verified lawyers who specialize in your specific legal needs.",
    icon: <Users className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Legal Education",
    description:
      "Learn about your rights and legal processes through engaging short-form videos and interactive guides.",
    icon: <Video className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Secure Communication",
    description:
      "All your conversations and documents are protected with end-to-end encryption.",
    icon: <Lock className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Document Management",
    description:
      "Store and organize your legal documents securely in one place.",
    icon: <FileText className="w-6 h-6 text-[#d4a017]" />,
  },
  {
    title: "Affordable Access",
    description:
      "Get quality legal help at transparent, affordable rates with flexible payment options.",
    icon: <Award className="w-6 h-6 text-[#d4a017]" />,
  },
];

const audience = [
  {
    number: "Individuals",
    label: "Personal Legal Matters",
    icon: <Users2 className="w-6 h-6 text-[#d4a017] mb-4" />,
  },
  {
    number: "Small Business",
    label: "Business Legal Support",
    icon: <Briefcase className="w-6 h-6 text-[#d4a017] mb-4" />,
  },
  {
    number: "Students",
    label: "Legal Education",
    icon: <BookOpen className="w-6 h-6 text-[#d4a017] mb-4" />,
  },
  {
    number: "Families",
    label: "Family Legal Matters",
    icon: <Users className="w-6 h-6 text-[#d4a017] mb-4" />,
  },
];

const testimonials = [
  {
    quote:
      "The AI assistant helped me understand my rental agreement in minutes. When I needed more help, I was connected with a lawyer right away.",
    name: "Sarah Johnson",
    role: "Renter, New York",
  },
  {
    quote:
      "As a small business owner, LegalConnect has been invaluable. The short legal videos helped me understand contracts and business regulations.",
    name: "Michael Chen",
    role: "Small Business Owner",
  },
  {
    quote:
      "The platform made it easy to find a family lawyer and understand our options. The video consultations saved us so much time.",
    name: "Emily Rodriguez",
    role: "Parent, California",
  },
];
