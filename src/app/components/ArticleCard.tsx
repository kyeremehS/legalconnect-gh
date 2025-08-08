"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Bookmark } from "lucide-react";
import { FileText } from "lucide-react";
import ArticleReader from "./ArticleReader";

// Define the Article interface
interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  author: string;
  publishDate: string;
  featured: boolean;
  content: string;
  relatedLawyers: string[];
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [showReader, setShowReader] = useState(false);

  const handleReadArticle = () => {
    setShowReader(true);
  };

  const handleBookLawyer = () => {
    setShowReader(false);
    // Add your booking logic here
    alert("Redirecting to lawyer booking...");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={() => setShowReader(true)}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#d4a017]/20 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#d4a017]" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{article.title}</h3>
            <p className="text-sm text-gray-500">By {article.author}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{article.publishDate}</span>
          <span>{article.readTime}</span>
        </div>

        <button className="mt-4 text-[#d4a017] font-medium text-sm hover:text-[#b8941f] transition-colors">
          Read Full Article &rarr;
        </button>
      </motion.div>

      {/* Article Reader Modal */}
      {showReader && (
        <ArticleReader
          article={article}
          onClose={() => setShowReader(false)}
          onBookLawyer={handleBookLawyer}
        />
      )}
    </>
  );
}
