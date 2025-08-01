"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Award, Check } from "lucide-react";

interface Achievement {
  title: string;
  description: string;
  completed: boolean;
  icon: string;
}

interface UserStats {
  totalPoints: number;
  level: number;
  nextLevelPoints: number;
  completedQuizzes: number;
  articlesRead: number;
  videosWatched: number;
  templatesDownloaded: number;
}

interface UserProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProgressModal({ isOpen, onClose }: UserProgressModalProps) {
  const achievements: Achievement[] = [
    { title: "First Quiz", description: "Complete your first quiz", completed: true, icon: "🎯" },
    { title: "Knowledge Seeker", description: "Read 10 articles", completed: true, icon: "📚" },
    { title: "Video Learner", description: "Watch 20 videos", completed: false, icon: "🎬" },
    { title: "Template Master", description: "Download 5 templates", completed: false, icon: "📄" },
    { title: "Legal Expert", description: "Score 90%+ on 5 quizzes", completed: false, icon: "⚖️" },
  ];

  const userStats: UserStats = {
    totalPoints: 1250,
    level: 3,
    nextLevelPoints: 1500,
    completedQuizzes: 8,
    articlesRead: 15,
    videosWatched: 23,
    templatesDownloaded: 3
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Level */}
        <div className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Level {userStats.level}</h3>
              <p className="text-white/80">Legal Learner</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{userStats.totalPoints}</div>
              <div className="text-white/80 text-sm">points</div>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${(userStats.totalPoints / userStats.nextLevelPoints) * 100}%` }}
            />
          </div>
          <p className="text-white/80 text-sm mt-2">
            {userStats.nextLevelPoints - userStats.totalPoints} points to next level
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-600">{userStats.completedQuizzes}</div>
            <div className="text-sm text-gray-600">Quizzes</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-600">{userStats.articlesRead}</div>
            <div className="text-sm text-gray-600">Articles</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-purple-600">{userStats.videosWatched}</div>
            <div className="text-sm text-gray-600">Videos</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-orange-600">{userStats.templatesDownloaded}</div>
            <div className="text-sm text-gray-600">Downloads</div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                  achievement.completed
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
                {achievement.completed && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}