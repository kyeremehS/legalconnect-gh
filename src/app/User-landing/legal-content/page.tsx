"use client";

import React, { useState } from "react";
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
} from "lucide-react";

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
        url: "/GFA and footballer.mp4",
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
        url: "/legal-videos/Building_without permit.mp4",
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
        url: "/legal-videos/Building_without permit.mp4",
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
        url: "/legal-videos/Building_without permit.mp4",
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
        url: "/legal-videos/Building_without permit.mp4",
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
        url: "/videos/employment2.mp4",
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
    content: `When you're arrested in Ghana, you have specific rights protected by the 1992 Constitution. Here's what you need to know:

**Your Right to Remain Silent**
You have the right to remain silent and not answer questions until you have a lawyer present. Anything you say can be used against you in court.

**Right to Legal Representation**
You have the right to a lawyer. If you cannot afford one, the state should provide legal aid.

**Right to Know the Charges**
The police must tell you why you're being arrested and what charges you're facing.

**Time Limits**
You must be brought before a court within 48 hours of arrest (excluding weekends and public holidays).`,
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
    content: `Land registration in Ghana is crucial for securing your property rights. Here's the process:

**Step 1: Verify the Land**
- Conduct a search at the Lands Commission
- Check for any existing claims or disputes
- Verify the seller's ownership

**Step 2: Prepare Documents**
- Indenture or Deed of Conveyance
- Site plan prepared by a licensed surveyor
- Building permit (if applicable)

**Step 3: Registration Process**
- Submit application to the Lands Commission
- Pay the required fees
- Await processing and approval`,
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
      className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-[#d4a017]/20 transition-all border border-white/20"
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

// Article Card Component
function ArticleCard({ article }: { article: typeof legalArticles[0] }) {
  return (
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
  );
}

// Quiz Card Component
function QuizCard({ quiz }: { quiz: typeof legalQuizzes[0] }) {
  return (
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
        className="w-full bg-[#d4a017] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#b8941f] transition-colors flex items-center justify-center gap-2"
      >
        <Play className="w-4 h-4" />
        Start Quiz
      </motion.button>
    </motion.div>
  );
}

// Template Card Component
function TemplateCard({ template }: { template: typeof legalTemplates[0] }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            {template.format}
          </span>
        </div>
        {template.featured && (
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{template.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{template.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <span>{template.downloads} downloads</span>
        <span>{template.fileSize}</span>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-[#d4a017] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#b8941f] transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
        >
          <Eye className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
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

  // Navigation functions
  const navigateVideo = (direction: "up" | "down") => {
    if (direction === "up" && activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
    } else if (direction === "down" && activeIdx < videos.length - 1) {
      setActiveIdx(activeIdx + 1);
    }
  };

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
                    />

                    {/* Video Info Overlay */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent lg:rounded-b-2xl"
                    >
                      <div className="mb-15">
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

                      {/* Progress bar */}
                      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${((idx + 1) / videos.length) * 100}%` }}
                          className="h-full bg-[#d4a017] rounded-full"
                          transition={{ duration: 0.5 }}
                        />
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
          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Articles</h1>
                <p className="text-gray-600">Plain language explanations of Ghanaian law</p>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4a017]/20 focus:border-[#d4a017] transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Featured Articles */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {legalArticles.filter(article => article.featured).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>

              {/* All Articles */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">All Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {legalArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        );

      case "quizzes":
        return (
          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Quizzes</h1>
                <p className="text-gray-600">Test your legal knowledge and learn through play</p>
              </div>

              {/* Quizzes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {legalQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>

              {/* Recent Scores */}
              <div className="mt-12 bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Your Recent Scores</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium">Know Your Rights</span>
                    <span className="text-green-600 font-bold">8/10</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium">Which Lawyer Do You Need?</span>
                    <span className="text-blue-600 font-bold">Perfect Match</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case "templates":
        return (
          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Templates</h1>
                <p className="text-gray-600">Download professional legal document templates</p>
              </div>

              {/* Featured Templates */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Most Popular</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {legalTemplates.filter(template => template.featured).map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </div>

              {/* All Templates */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">All Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {legalTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        );

      case "chatbot":
        return (
          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Legal Assistant</h1>
                <p className="text-gray-600">Get instant answers to your legal questions</p>
              </div>

              <AIChatbot />

              {/* Quick Questions */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Popular Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Can I be arrested without a warrant?",
                    "How do I register my land?",
                    "What are my tenant rights?",
                    "How to start a business in Ghana?",
                    "What happens if I can't pay debt?",
                    "How to get a divorce?",
                  ].map((question, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-[#d4a017] hover:bg-[#d4a017]/5 transition-colors"
                    >
                      <p className="text-sm text-gray-700">{question}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </main>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 mb-20 lg:mb-0 ${inter.className}`}>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-30">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </motion.button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#d4a017] rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg text-gray-800">Legal Hub</h1>
          </div>

          <div className="w-10" />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeContent={activeContent}
        setActiveContent={setActiveContent}
      />

      <div className="flex h-screen pt-16 lg:pt-0">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col justify-between py-6 px-4 shadow-sm m-5 rounded-xl">
          <div>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-8 px-2"
            >
              <div className="w-10 h-10 bg-[#d4a017] rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-800">Legal Hub</h1>
                <p className="text-sm text-gray-500">Learn & Explore</p>
              </div>
            </motion.div>

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

            {/* Learning Progress */}
            <div className="mt-8 bg-gradient-to-r from-[#d4a017]/10 to-[#b8941f]/10 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Your Progress</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Videos Watched</span>
                    <span>23/50</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-[#d4a017] rounded-full" style={{ width: "46%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Articles Read</span>
                    <span>12/25</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "48%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Quiz Score</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "85%" }} />
                  </div>
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
        </aside>

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
}
