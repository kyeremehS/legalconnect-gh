import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Tv, FileText, MessageSquare, X, Brain, House } from "lucide-react";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

type ContentType = "videos" | "articles" | "quizzes" | "templates" 

import SidebarItem from "../components/content-sidebar";

export default function MobileSidebar({
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
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push("/User-landing");
    onClose();
  };

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
                      <h1 className="font-bold text-xl text-gray-800">
                        Legal Hub
                      </h1>
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
                    icon={<House className="w-5 h-5" />}
                    label="Dashboard"
                    onClick={handleBackToDashboard}
                  />

                  <SidebarItem
                    icon={<Tv className="w-5 h-5" />}
                    label="LawTok Videos"
                    active={activeContent === "videos"}
                    onClick={() => {
                      setActiveContent("videos");
                      onClose();
                    }}
                    // badge="New"
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
                
                  
                </nav>

                {/* Quick Stats */}
                <div className="mt-8 bg-gradient-to-r from-[#d4a017]/10 to-[#b8941f]/10 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                    Learning Stats
                  </h3>
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
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}