"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Clock, User, Calendar, Bookmark, Share2, MessageCircle, ThumbsUp } from "lucide-react";

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

interface ArticleReaderProps {
  article: Article;
  onClose: () => void;
  onBookLawyer: () => void;
}

export default function ArticleReader({ article, onClose, onBookLawyer }: ArticleReaderProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [likes, setLikes] = React.useState(245);
  const [hasLiked, setHasLiked] = React.useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setHasLiked(!hasLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Article Header */}
        <div className="relative bg-gradient-to-r from-[#d4a017] to-[#b8941f] p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="pr-12">
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm rounded-full mb-3">
              {article.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            {/* Article Actions Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    hasLiked 
                      ? "bg-red-100 text-red-600" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{likes}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">12</span>
                </motion.button>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked 
                      ? "bg-[#d4a017] text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Article Excerpt */}
            <div className="mb-6 p-4 bg-[#d4a017]/10 rounded-xl border-l-4 border-[#d4a017]">
              <p className="text-gray-700 italic text-lg leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ 
                  __html: article.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                }}
              />
            </div>

            {/* Call to Action */}
            <div className="mt-8 p-6 bg-gradient-to-r from-[#d4a017]/10 to-[#b8941f]/10 rounded-2xl border border-[#d4a017]/20">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Need Legal Help?
              </h3>
              <p className="text-gray-600 mb-4">
                Get personalized legal advice from qualified lawyers who specialize in {article.category.toLowerCase()}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBookLawyer}
                  className="flex-1 bg-[#d4a017] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#b8941f] transition-colors"
                >
                  Book a Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-white border-2 border-[#d4a017] text-[#d4a017] py-3 px-6 rounded-xl font-semibold hover:bg-[#d4a017]/5 transition-colors"
                >
                  Ask AI Assistant
                </motion.button>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Understanding your rights during police questioning", category: "Criminal Law" },
                  { title: "How to file a complaint against police misconduct", category: "Criminal Law" },
                ].map((related, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <span className="text-xs text-[#d4a017] font-medium">{related.category}</span>
                    <h4 className="font-semibold text-gray-900 mt-1">{related.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}