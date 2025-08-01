"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Clock, Award, ChevronRight } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface InteractiveQuizProps {
  quiz: {
    id: string;
    title: string;
    description: string;
    category: string;
    questions: number;
    duration: string;
    difficulty: string;
  };
  onClose: () => void;
}

const sampleQuestions: QuizQuestion[] = [
  {
    question: "What is the maximum time police can hold you without charge in Ghana?",
    options: ["24 hours", "48 hours", "72 hours", "1 week"],
    correct: 1,
    explanation: "According to Ghana's Constitution, you must be brought before a court within 48 hours (excluding weekends and holidays)."
  },
  {
    question: "Who can witness a Will in Ghana?",
    options: ["Anyone over 18", "Only lawyers", "Two independent witnesses", "Family members only"],
    correct: 2,
    explanation: "A Will must be signed by the testator in the presence of two independent witnesses who are not beneficiaries."
  },
  {
    question: "What is the legal working age in Ghana?",
    options: ["15 years", "16 years", "18 years", "21 years"],
    correct: 0,
    explanation: "The minimum working age in Ghana is 15 years, but with restrictions on hazardous work."
  }
];

export default function InteractiveQuiz({ quiz, onClose }: InteractiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, showResults]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === sampleQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < sampleQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(60);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setTimeLeft(60);
  };

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600 mb-4">Your Score: {score}/{sampleQuestions.length}</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] h-3 rounded-full transition-all duration-500"
                style={{ width: `${(score / sampleQuestions.length) * 100}%` }}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={resetQuiz}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Retry Quiz
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-[#d4a017] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#b8941f] transition-colors"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

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
        {/* Quiz Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{quiz.title}</h2>
            <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {sampleQuestions.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-[#d4a017] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {sampleQuestions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {sampleQuestions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  selectedAnswer === index
                    ? "border-[#d4a017] bg-[#d4a017]/10"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="bg-[#d4a017] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#b8941f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {currentQuestion + 1 === sampleQuestions.length ? "Finish Quiz" : "Next Question"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}