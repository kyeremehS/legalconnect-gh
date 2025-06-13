import React from "react";
import Link from "next/link";
import { Scale } from "lucide-react";
import { Twitter } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <div>
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
    </div>
  );
};

export default Footer;
