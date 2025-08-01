import { motion } from 'framer-motion';
import {
  Play,
  Award,
  Brain,
  HelpCircle,
  
} from "lucide-react";

import InteractiveQuiz from "../components/InteractiveQuiz";
import { useState } from 'react';

interface Quiz {
  id: string;
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
  questions: number;
  duration: string;
  difficulty: string;
}

export default function QuizCard({ quiz }: { quiz: Quiz }) {
    const [showQuiz, setShowQuiz] = useState(false);

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#d4a017] to-[#b8941f] rounded-xl flex items-center justify-center text-white">
                        {quiz.icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{quiz.title}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {quiz.category}
                        </span>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-4 text-xs text-gray-500">
                    <div className="text-center">
                        <div className="font-semibold text-gray-900">{quiz.questions}</div>
                        <div>Questions</div>
                    </div>
                    <div className="text-center">
                        <div className="font-semibold text-gray-900">{quiz.duration}</div>
                        <div>Duration</div>
                    </div>
                    <div className="text-center">
                        <div className="font-semibold text-gray-900">{quiz.difficulty}</div>
                        <div>Level</div>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQuiz(true)}
                    className="w-full bg-[#d4a017] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#b8941f] transition-colors flex items-center justify-center gap-2"
                >
                    <Play className="w-4 h-4" />
                    Start Quiz
                </motion.button>
            </motion.div>

            {showQuiz && (
                <InteractiveQuiz quiz={quiz} onClose={() => setShowQuiz(false)} />
            )}
        </>
    );
}

