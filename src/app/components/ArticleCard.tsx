"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Bookmark } from "lucide-react";
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
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <span className="px-3 py-1 bg-[#d4a017]/10 text-[#d4a017] text-xs rounded-full font-medium">
            {article.category}
          </span>
          {article.featured && (
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <span>By {article.author}</span>
            <span>{article.readTime}</span>
          </div>
          <span>{new Date(article.publishDate).toLocaleDateString()}</span>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReadArticle}
            className="flex-1 bg-[#d4a017] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#b8941f] transition-colors"
          >
            Read Article
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
          </motion.button>
        </div>
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