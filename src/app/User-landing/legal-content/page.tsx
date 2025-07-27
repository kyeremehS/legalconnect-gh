"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inter } from 'next/font/google';
import {
  Heart,
  MessageCircle,
  Share,
  Home,
  Compass,
  User,
  PlusSquare,
  Tv,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
  Search,
  Filter,
  BookOpen,
  Download,
  MessageSquare,
  Award,
  Calendar,
  FileText,
  Brain,
  HelpCircle,
  Languages,
  Clock,
  Eye,
  Star,
  Bookmark,
  Share2,
  Check, ChevronRight
} from "lucide-react";


import InteractiveQuiz from "../../components/InteractiveQuiz"
import UserProgressModal from "../../components/UserProgressModal";
import TemplateDownloader from "../../components/TemplateDownloader"
import ArticleCard from "../../components/ArticleCard";

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Video categories and data
const videoCategories = [
  {
    label: "Land Law",
    description: "Videos about land rights, disputes, and property law.",
    videos: [
      {
        id: "1",
        title: "Understanding Land Ownership in Ghana",
        url: "/legal-videos/GFA and footballer.mp4", // ✅ Fixed path
        lawyer: "Ama Kwarteng, Esq.",
        views: "12.5K",
        duration: "5:32",
        language: "English",
        thumbnail: "/thumbnails/land1.jpg",
        description: "Learn about the different types of land ownership in Ghana and your rights as a landowner.",
      },
      {
        id: "2",
        title: "Resolving Land Disputes",
        url: "/legal-videos/Child-labour.mp4", // ✅ Fixed path
        lawyer: "Kwame Mensah, Esq.",
        views: "8.2K",
        duration: "7:15",
        language: "Twi",
        thumbnail: "/thumbnails/land2.jpg",
        description: "Step-by-step guide on how to resolve land disputes through legal channels.",
      },
    ],
  },
  {
    label: "Family Law",
    description: "Videos about marriage, divorce, child custody, and related issues.",
    videos: [
      {
        id: "3",
        title: "Marriage and Divorce Laws",
        url: "/legal-videos/GFA and footballer.mp4", // ✅ Fixed path
        lawyer: "Abena Owusu, Esq.",
        views: "15.1K",
        duration: "6:45",
        language: "English",
        thumbnail: "/thumbnails/family1.jpg",
        description: "Understanding marriage laws and divorce procedures in Ghana.",
      },
      {
        id: "4",
        title: "Child Custody Explained",
        url: "/legal-videos/GFA and footballer.mp4", // ✅ Fixed path
        lawyer: "Kojo Asante, Esq.",
        views: "9.8K",
        duration: "4:20",
        language: "English",
        thumbnail: "/thumbnails/family2.jpg",
        description: "Learn about child custody rights and how courts make decisions.",
      },
    ],
  },
  {
    label: "Employment Law",
    description: "Videos about employee rights, contracts, and workplace issues.",
    videos: [
      {
        id: "5",
        title: "Your Rights as an Employee",
        url: "/legal-videos/GFA and footballer.mp4", // ✅ Fixed path
        lawyer: "Efua Boateng, Esq.",
        views: "11.3K",
        duration: "8:12",
        language: "English",
        thumbnail: "/thumbnails/employment1.jpg",
        description: "Know your workplace rights and how to protect yourself from exploitation.",
      },
      {
        id: "6",
        title: "Understanding Employment Contracts",
        url: "/legal-videos/GFA and footballer.mp4", // ✅ Fixed path
        lawyer: "Yaw Adu, Esq.",
        views: "6.7K",
        duration: "5:58",
        language: "Ewe",
        thumbnail: "/thumbnails/employment2.jpg",
        description: "What to look for in employment contracts and red flags to avoid.",
      },
    ],
  },
];

// Legal Articles Data
const legalArticles = [
  {
    id: "1",
    title: "What are your rights if arrested in Ghana?",
    category: "Criminal Law",
    excerpt: "Understanding your fundamental rights when facing arrest in Ghana.",
    readTime: "5 min read",
    author: "Kojo Asante, Esq.",
    publishDate: "2024-01-15",
    featured: true,
    content: `
      <p>When you're arrested in Ghana, you have specific rights protected by the 1992 Constitution. Here's what you need to know to protect yourself during this critical time.</p>

      <h2>Your Right to Remain Silent</h2>
      <p>You have the <strong>constitutional right to remain silent</strong> and not answer questions until you have a lawyer present. This is one of your most important protections. Anything you say can and will be used against you in court, so it's often best to exercise this right.</p>

      <h2>Right to Legal Representation</h2>
      <p>You have the right to a lawyer from the moment of arrest. If you cannot afford one, the state should provide legal aid through the Legal Aid Commission. <strong>Always ask for a lawyer immediately</strong> - this is not a sign of guilt, but a smart legal protection.</p>

      <h2>Right to Know the Charges</h2>
      <p>The police must clearly tell you:</p>
      <ul>
        <li>Why you're being arrested</li>
        <li>What specific charges you're facing</li>
        <li>The reason for your detention</li>
      </ul>

      <h2>Time Limits for Detention</h2>
      <p>This is crucial: <strong>You must be brought before a court within 48 hours of arrest</strong> (excluding weekends and public holidays). If this doesn't happen, your detention becomes unlawful.</p>

      <h2>Right to Contact Family</h2>
      <p>You have the right to inform someone about your arrest - usually a family member or close friend. The police should allow you to make this contact.</p>

      <h2>Protection from Torture and Abuse</h2>
      <p>You have the absolute right to be treated humanely. Any form of torture, assault, or inhumane treatment is strictly prohibited and can lead to serious consequences for the officers involved.</p>

      <h2>What to Do if Your Rights Are Violated</h2>
      <p>If any of these rights are violated, you can:</p>
      <ul>
        <li>File a complaint with the Police Professional Standards Bureau</li>
        <li>Report to the Commission on Human Rights and Administrative Justice (CHRAJ)</li>
        <li>Seek legal remedy through the courts</li>
      </ul>

      <p><strong>Remember:</strong> Knowing your rights is the first step to protecting yourself. Stay calm, be respectful, but firmly assert your rights.</p>
    `,
    relatedLawyers: ["kojo-asante", "ama-kwarteng"],
  },
  {
    id: "2",
    title: "How to register land in Ghana",
    category: "Land Law",
    excerpt: "Step-by-step guide to registering your land with the Lands Commission.",
    readTime: "8 min read",
    author: "Kwame Mensah, Esq.",
    publishDate: "2024-01-10",
    featured: true,
    content: `
      <p>Land registration in Ghana is crucial for securing your property rights and avoiding future disputes. This comprehensive guide will walk you through the entire process.</p>

      <h2>Why Register Your Land?</h2>
      <p>Land registration provides:</p>
      <ul>
        <li><strong>Legal security</strong> - Official government recognition of your ownership</li>
        <li><strong>Protection against fraud</strong> - Prevents illegal sales by others</li>
        <li><strong>Access to credit</strong> - Banks accept registered land as collateral</li>
        <li><strong>Easier inheritance</strong> - Clear ownership transfer to family</li>
      </ul>

      <h2>Step 1: Verify the Land</h2>
      <p>Before purchasing or registering land, always:</p>
      <ul>
        <li><strong>Conduct a search</strong> at the Lands Commission to check ownership history</li>
        <li><strong>Verify boundaries</strong> with a licensed surveyor</li>
        <li><strong>Check for disputes</strong> - Ask neighbors and local authorities</li>
        <li><strong>Confirm the seller's authority</strong> - Ensure they have the right to sell</li>
      </ul>

      <h2>Step 2: Prepare Required Documents</h2>
      <p>You'll need the following documents:</p>

      <h3>Primary Documents:</h3>
      <ul>
        <li><strong>Indenture or Deed of Conveyance</strong> - The sale agreement</li>
        <li><strong>Site plan</strong> - Prepared by a licensed surveyor</li>
        <li><strong>Search report</strong> - From the Lands Commission</li>
        <li><strong>Statutory declaration</strong> - Sworn statement about the land</li>
      </ul>

      <h3>Supporting Documents:</h3>
      <ul>
        <li>Building permit (if applicable)</li>
        <li>Tax clearance certificate</li>
        <li>Identity documents of buyer and seller</li>
        <li>Witness statements</li>
      </ul>

      <h2>Step 3: The Registration Process</h2>

      <h3>Application Submission</h3>
      <p>Submit your application to the appropriate Lands Commission office with:</p>
      <ul>
        <li>Completed application forms</li>
        <li>All required documents</li>
        <li>Payment of prescribed fees</li>
      </ul>

      <h3>Processing Timeline</h3>
      <p>The typical timeline is:</p>
      <ul>
        <li><strong>Acknowledgment</strong> - Within 7 days</li>
        <li><strong>Initial review</strong> - 14-21 days</li>
        <li><strong>Field verification</strong> - 30-45 days</li>
        <li><strong>Final processing</strong> - 60-90 days</li>
      </ul>

      <h2>Costs Involved</h2>
      <p>Registration fees vary by location and land value, but typically include:</p>
      <ul>
        <li>Search fees: GHS 20-50</li>
        <li>Registration fees: 0.5% of property value</li>
        <li>Survey fees: GHS 1,000-5,000</li>
        <li>Legal fees: GHS 500-2,000</li>
      </ul>

      <h2>Common Challenges and Solutions</h2>

      <h3>Multiple Claims</h3>
      <p>If multiple people claim the same land, the Commission will investigate and may require additional evidence or mediation.</p>

      <h3>Boundary Disputes</h3>
      <p>Accurate surveying and neighbor consultation before registration can prevent these issues.</p>

      <h3>Document Issues</h3>
      <p>Ensure all documents are properly prepared, signed, and witnessed to avoid delays.</p>

      <h2>After Registration</h2>
      <p>Once registered, you'll receive:</p>
      <ul>
        <li><strong>Land Certificate</strong> - Official proof of ownership</li>
        <li><strong>Registration number</strong> - For future reference</li>
        <li><strong>Updated site plan</strong> - With official markings</li>
      </ul>

      <p><strong>Important:</strong> Keep your land certificate safe and make certified copies for transactions. Registration protects your investment and provides peace of mind.</p>
    `,
    relatedLawyers: ["kwame-mensah", "ama-kwarteng"],
  },
  {
    id: "3",
    title: "Understanding tenancy agreements",
    category: "Property Law",
    excerpt: "Know your rights and obligations as a tenant or landlord.",
    readTime: "6 min read",
    author: "Abena Owusu, Esq.",
    publishDate: "2024-01-05",
    featured: false,
    content: `A tenancy agreement is a contract between landlord and tenant. Key elements include:

**Rent and Payment Terms**
- Amount of rent and when it's due
- Acceptable payment methods
- Late payment penalties

**Property Condition**
- Initial condition of the property
- Tenant's maintenance responsibilities
- Landlord's repair obligations

**Termination Clauses**
- Notice periods required
- Grounds for eviction
- Return of security deposits`,
    relatedLawyers: ["abena-owusu"],
  },
];

// Quiz Data
const legalQuizzes = [
  {
    id: "1",
    title: "Know Your Rights",
    description: "Test your knowledge of basic legal rights in Ghana",
    category: "General",
    questions: 10,
    duration: "5 minutes",
    difficulty: "Beginner",
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: "2",
    title: "Which Lawyer Do You Need?",
    description: "Find out what type of legal help you require",
    category: "Assessment",
    questions: 8,
    duration: "3 minutes",
    difficulty: "All Levels",
    icon: <HelpCircle className="w-6 h-6" />,
  },
  {
    id: "3",
    title: "Can You Sue?",
    description: "Interactive scenarios to test your legal knowledge",
    category: "Scenarios",
    questions: 12,
    duration: "8 minutes",
    difficulty: "Intermediate",
    icon: <Brain className="w-6 h-6" />,
  },
];

// Templates Data
const legalTemplates = [
  {
    id: "1",
    title: "Tenancy Agreement Template",
    description: "Standard lease contract for landlords and tenants",
    category: "Property",
    downloads: "2.1K",
    fileSize: "250 KB",
    format: "PDF",
    featured: true,
  },
  {
    id: "2",
    title: "Affidavit Sample",
    description: "Template for name change and other sworn statements",
    category: "General",
    downloads: "1.8K",
    fileSize: "180 KB",
    format: "PDF",
    featured: true,
  },
  {
    id: "3",
    title: "Power of Attorney",
    description: "Legal document for family and business matters",
    category: "Business",
    downloads: "1.5K",
    fileSize: "220 KB",
    format: "PDF",
    featured: false,
  },
  {
    id: "4",
    title: "Legal Complaint Letter",
    description: "Template for complaints to landlords, employers, etc.",
    category: "General",
    downloads: "3.2K",
    fileSize: "150 KB",
    format: "DOC",
    featured: true,
  },
];

type VideoItem = {
  id: string;
  title: string;
  url: string;
  lawyer: string;
  category: string;
  views: string;
  duration: string;
  language: string;
  thumbnail: string;
  description: string;
};

// Content Types
type ContentType = "videos" | "articles" | "quizzes" | "templates" | "chatbot";

// Flatten all videos into a single array for feed
function flattenVideos() {
  const videos: VideoItem[] = [];
  for (const cat of videoCategories) {
    for (const vid of cat.videos) {
      videos.push({ ...vid, category: cat.label });
    }
  }
  return videos;
}

// Sidebar navigation item
function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${
        active
          ? "bg-[#d4a017] text-white font-semibold shadow-lg"
          : "text-gray-700 hover:bg-gray-100 hover:text-[#d4a017]"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </motion.div>
  );
}

// Action button for videos
function ActionButton({
  icon,
  count,
  onClick,
}: {
  icon: React.ReactNode;
  count: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-[#d4a017]/20 transition-all"
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{count}</span>
    </motion.button>
  );
}

// Video controls component
function VideoControls({
  isPlaying,
  isMuted,
  onPlayPause,
  onMuteToggle,
}: {
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
}) {
  return (
    <div className="absolute bottom-20 left-4 flex gap-2 -mb-10">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all"
        onClick={onPlayPause}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all"
        onClick={onMuteToggle}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </motion.button>
    </div>
  );
} 

// Quiz Card Component
function QuizCard({ quiz }: { quiz: typeof legalQuizzes[0] }) {
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

// Template Card Component
function TemplateCard({ template }: { template: typeof legalTemplates[0] }) {
  return <TemplateDownloader template={template} />;
}

// AI Chatbot Component
function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! I'm your AI legal assistant. Ask me anything about Ghanaian law and I'll help you understand your rights and options.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: "user", content: inputValue }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: "bot",
        content: "Thank you for your question. Based on Ghanaian law, here's what you should know... Would you like to speak with a qualified lawyer about this matter?",
      }]);
    }, 1000);

    setInputValue("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Legal Assistant</h2>
              <p className="text-white/90 text-sm">Ask questions about Ghanaian law</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.type === "user"
                    ? "bg-[#d4a017] text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask a legal question..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4a017]/20 focus:border-[#d4a017] transition-colors"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#d4a017] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#b8941f] transition-colors"
              onClick={handleSendMessage}
            >
              Send
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile Sidebar Component
function MobileSidebar({
  isOpen,
  onClose,
  activeContent,
  setActiveContent,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeContent: ContentType;
  setActiveContent: (content: ContentType) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className={`fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-200 z-50 lg:hidden overflow-y-auto ${inter.className}`}
          >
            <div className="flex flex-col justify-between h-full py-6 px-4">
              <div>
                {/* Header with close button */}
                <div className="flex items-center justify-between mb-8 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#d4a017] rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="font-bold text-xl text-gray-800">Legal Hub</h1>
                      <p className="text-sm text-gray-500">Learn & Explore</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  <SidebarItem
                    icon={<Tv className="w-5 h-5" />}
                    label="LawTok Videos"
                    active={activeContent === "videos"}
                    onClick={() => {
                      setActiveContent("videos");
                      onClose();
                    }}
                    badge="New"
                  />
                  <SidebarItem
                    icon={<BookOpen className="w-5 h-5" />}
                    label="Legal Articles"
                    active={activeContent === "articles"}
                    onClick={() => {
                      setActiveContent("articles");
                      onClose();
                    }}
                  />
                  <SidebarItem
                    icon={<Brain className="w-5 h-5" />}
                    label="Legal Quizzes"
                    active={activeContent === "quizzes"}
                    onClick={() => {
                      setActiveContent("quizzes");
                      onClose();
                    }}
                  />
                  <SidebarItem
                    icon={<FileText className="w-5 h-5" />}
                    label="Templates"
                    active={activeContent === "templates"}
                    onClick={() => {
                      setActiveContent("templates");
                      onClose();
                    }}
                  />
                  <SidebarItem
                    icon={<MessageSquare className="w-5 h-5" />}
                    label="AI Assistant"
                    active={activeContent === "chatbot"}
                    onClick={() => {
                      setActiveContent("chatbot");
                      onClose();
                    }}
                  />
                </nav>

                {/* Quick Stats */}
                <div className="mt-8 bg-gradient-to-r from-[#d4a017]/10 to-[#b8941f]/10 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">Learning Stats</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Videos Watched</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Articles Read</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quizzes Completed</span>
                      <span className="font-medium">5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 pt-4">
                <div className="text-xs text-gray-400 space-y-1">
                  <div>© 2025 LegalConnect</div>
                  <div>Educational Content</div>
                  <div>Made in Ghana 🇬🇭</div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function LegalContentHub() {
  const videos = flattenVideos();
  const [likes, setLikes] = useState(Array(videos.length).fill(3292));
  const [comments, setComments] = useState(Array(videos.length).fill(84));
  const [shares, setShares] = useState(Array(videos.length).fill(68));
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeContent, setActiveContent] = useState<ContentType>("videos");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProgress, setShowProgress] = useState(false);

  // New state variables
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Handlers for actions
  const handleLike = (idx: number) => {
    setLikes((prev) => {
      const arr = [...prev];
      arr[idx]++;
      return arr;
    });
  };

  const handleComment = (idx: number) => {
    setComments((prev) => {
      const arr = [...prev];
      arr[idx]++;
      return arr;
    });
  };

  const handleShare = (idx: number) => {
    setShares((prev) => {
      const arr = [...prev];
      arr[idx]++;
      return arr;
    });
  };

  const handlePlayPause = () => {
    const video = document.querySelector(`#video-${activeIdx} video`) as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    const video = document.querySelector(`#video-${activeIdx} video`) as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // New handler functions
  const handleTimeUpdate = (video: HTMLVideoElement) => {
    if (video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(progress);
      setCurrentTime(video.currentTime);
    }
  };

  const handleLoadedMetadata = (video: HTMLVideoElement) => {
    setVideoDuration(video.duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Navigation functions
  const navigateVideo = (direction: "up" | "down") => {
    if (direction === "up" && activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
      setVideoProgress(0); // Reset progress
      setCurrentTime(0);
    } else if (direction === "down" && activeIdx < videos.length - 1) {
      setActiveIdx(activeIdx + 1);
      setVideoProgress(0); // Reset progress
      setCurrentTime(0);
    }
  };

  // Reset progress when changing content type
  useEffect(() => {
    if (activeContent !== "videos") {
      setVideoProgress(0);
      setCurrentTime(0);
      setVideoDuration(0);
    }
  }, [activeContent]);

  // Reset progress when changing videos
  useEffect(() => {
    setVideoProgress(0);
    setCurrentTime(0);
  }, [activeIdx]);

  // Render content based on active section
  const renderContent = () => {
    switch (activeContent) {
      case "videos":
        return (
          <main className="flex-1 bg-black relative overflow-hidden lg:m-5 lg:rounded-xl">
            <AnimatePresence mode="wait">
              {videos.map((video, idx) => (
                <motion.div
                  key={idx}
                  id={`video-${idx}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: idx === activeIdx ? 1 : 0,
                    scale: idx === activeIdx ? 1 : 0.9,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 flex items-center justify-center ${
                    idx === activeIdx ? "z-10" : "z-0 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full h-full flex justify-center items-center">
                    <video
                      src={video.url}
                      autoPlay={idx === activeIdx && isPlaying}
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full max-w-md h-full object-cover lg:rounded-2xl shadow-2xl"
                      style={{
                        maxHeight: "90vh",
                        maxWidth: "420px",
                      }}
                      onTimeUpdate={(e) => {
                        if (idx === activeIdx) {
                          handleTimeUpdate(e.currentTarget);
                        }
                      }}
                      onLoadedMetadata={(e) => {
                        if (idx === activeIdx) {
                          handleLoadedMetadata(e.currentTarget);
                        }
                      }}
                      onEnded={() => {
                        if (activeIdx < videos.length - 1) {
                          setActiveIdx(activeIdx + 1);
                          setVideoProgress(0);
                        }
                      }}
                    />

                    {/* Video Info Overlay with Enhanced Progress */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent lg:rounded-b-2xl"
                    >
                      <div className="mb-4">
                        <h2 className="text-xl font-bold text-white mb-2">{video.title}</h2>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-[#d4a017] font-medium">{video.lawyer}</span>
                          <span className="text-white/60">{video.views} views</span>
                          <span className="text-white/60">{video.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="inline-block px-3 py-1 bg-[#d4a017]/20 text-[#d4a017] text-xs rounded-full">
                            #{video.category}
                          </div>
                          <div className="inline-flex px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full items-center gap-1">
                            <Languages className="w-3 h-3" />
                            {video.language}
                          </div>
                        </div>
                        <p className="text-white/80 text-sm mt-2 line-clamp-2">{video.description}</p>
                      </div>

                      {/* Enhanced Progress bar with real-time updates */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs text-white/70">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(videoDuration)}</span>
                        </div>
                        
                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                             onClick={(e) => {
                               const rect = e.currentTarget.getBoundingClientRect();
                               const clickX = e.clientX - rect.left;
                               const width = rect.width;
                               const percentage = (clickX / width) * 100;
                               const video = document.querySelector(`#video-${activeIdx} video`) as HTMLVideoElement;
                               if (video && videoDuration) {
                                 const newTime = (percentage / 100) * videoDuration;
                                 video.currentTime = newTime;
                                 setVideoProgress(percentage);
                               }
                             }}>
                          <motion.div
                            animate={{ width: `${videoProgress}%` }}
                            className="h-full bg-[#d4a017] rounded-full relative"
                            transition={{ duration: 0.1 }}
                          >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#d4a017] rounded-full shadow-lg transform translate-x-1/2" />
                          </motion.div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-white/50">
                          <span>Video {activeIdx + 1} of {videos.length}</span>
                          <span>{Math.round(videoProgress)}% complete</span>
                        </div>
                      </div>

                      {/* Call to Action */}
                      <div className="flex gap-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-[#d4a017] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#b8941f] transition-colors flex items-center justify-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          Book Lawyer
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-white/20 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Ask AI
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Video Controls */}
                    <VideoControls
                      isPlaying={isPlaying}
                      isMuted={isMuted}
                      onPlayPause={handlePlayPause}
                      onMuteToggle={handleMuteToggle}
                    />

                    {/* Action Buttons */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                      <ActionButton
                        icon={<Heart className="w-6 h-6" />}
                        count={likes[idx]}
                        onClick={() => handleLike(idx)}
                      />
                      <ActionButton
                        icon={<MessageCircle className="w-6 h-6" />}
                        count={comments[idx]}
                        onClick={() => handleComment(idx)}
                      />
                      <ActionButton
                        icon={<Share className="w-6 h-6" />}
                        count={shares[idx]}
                        onClick={() => handleShare(idx)}
                      />
                    </div>

                    {/* Navigation Controls */}
                    <div className="absolute right-4 bottom-24 flex flex-col gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all disabled:opacity-50"
                        onClick={() => navigateVideo("up")}
                        disabled={activeIdx === 0}
                      >
                        <ChevronUp className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all disabled:opacity-50"
                        onClick={() => navigateVideo("down")}
                        disabled={activeIdx === videos.length - 1}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.button>
                        </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </main>
                );
        
              case "articles":
                return (
                  <main className="flex-1 bg-gray-50 p-6">
                    <div className="max-w-6xl mx-auto">
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {legalArticles.map((article) => (
                          <ArticleCard key={article.id} article={article} />
                        ))}
                      </div>
                    </div>
                  </main>
                );
        
              case "quizzes":
                return (
                  <main className="flex-1 bg-gray-50 p-6">
                    <div className="max-w-6xl mx-auto">
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {legalQuizzes.map((quiz) => (
                          <QuizCard key={quiz.id} quiz={quiz} />
                        ))}
                      </div>
                    </div>
                  </main>
                );
        
              case "templates":
                return (
                  <main className="flex-1 bg-gray-50 p-6">
                    <div className="max-w-6xl mx-auto">
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {legalTemplates.map((template) => (
                          <TemplateCard key={template.id} template={template} />
                        ))}
                      </div>
                    </div>
                  </main>
                );
        
              case "chatbot":
                return (
                  <main className="flex-1 bg-gray-50 p-6">
                    <AIChatbot />
                  </main>
                );
        
              default:
                return null;
            }
          };
        
          return (
            <div className={`min-h-screen bg-gray-50 flex ${inter.className}`}>
              {/* Mobile Header */}
              <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <Menu className="w-6 h-6 text-gray-600" />
                  </motion.button>
                  <h1 className="font-bold text-lg text-gray-800">Legal Hub</h1>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setShowProgress(true)}
                  >
                    <User className="w-6 h-6 text-gray-600" />
                  </motion.button>
                </div>
              </div>
        
              {/* Mobile Sidebar */}
              <MobileSidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                activeContent={activeContent}
                setActiveContent={setActiveContent}
              />
        
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 overflow-y-auto">
                <div className="flex flex-col justify-between h-full py-6 px-4">
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8 px-2">
                      <div className="w-10 h-10 bg-[#d4a017] rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="font-bold text-xl text-gray-800">Legal Hub</h1>
                        <p className="text-sm text-gray-500">Learn & Explore</p>
                      </div>
                    </div>
        
                    {/* Navigation */}
                    <nav className="space-y-2">
                      <SidebarItem
                        icon={<Tv className="w-5 h-5" />}
                        label="LawTok Videos"
                        active={activeContent === "videos"}
                        onClick={() => setActiveContent("videos")}
                        badge="New"
                      />
                      <SidebarItem
                        icon={<BookOpen className="w-5 h-5" />}
                        label="Legal Articles"
                        active={activeContent === "articles"}
                        onClick={() => setActiveContent("articles")}
                      />
                      <SidebarItem
                        icon={<Brain className="w-5 h-5" />}
                        label="Legal Quizzes"
                        active={activeContent === "quizzes"}
                        onClick={() => setActiveContent("quizzes")}
                      />
                      <SidebarItem
                        icon={<FileText className="w-5 h-5" />}
                        label="Templates"
                        active={activeContent === "templates"}
                        onClick={() => setActiveContent("templates")}
                      />
                      <SidebarItem
                        icon={<MessageSquare className="w-5 h-5" />}
                        label="AI Assistant"
                        active={activeContent === "chatbot"}
                        onClick={() => setActiveContent("chatbot")}
                      />
                    </nav>
        
                    {/* Quick Stats */}
                    <div className="mt-8 bg-gradient-to-r from-[#d4a017]/10 to-[#b8941f]/10 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-800 mb-3 text-sm">Learning Stats</h3>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Videos Watched</span>
                          <span className="font-medium">23</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Articles Read</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quizzes Completed</span>
                          <span className="font-medium">5</span>
                        </div>
                      </div>
                    </div>
                  </div>
        
                  {/* Footer */}
                  {/* <div className="border-t border-gray-200 pt-4">
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>© 2025 LegalConnect</div>
                      <div>Educational Content</div>
                      <div>Made in Ghana 🇬🇭</div>
                    </div>
                  </div> */}
                </div>
              </aside>
        
              {/* Main Content */}
              <div className="flex-1 flex flex-col pt-16 lg:pt-0">
                {renderContent()}
              </div>
        
              {/* User Progress Modal */}
              {showProgress && (
                <UserProgressModal isOpen={showProgress} onClose={() => setShowProgress(false)} />
              )}
            </div>
          );
        }