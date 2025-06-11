"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatModal from "./ChatModal";

type ChatButtonProps = {
  onClick?: () => void;
};

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#1A237E] text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center group"
        aria-label="Open chat"
        style={{ width: 64, height: 64 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircle size={32} color="#fff" />
        {/* Tooltip on hover */}
        <span
          className={`absolute right-20 bottom-1/2 translate-y-1/2 bg-white text-[#1A237E] px-4 py-2 rounded shadow-lg text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Chat with legal chatbot
        </span>
      </button>

      <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ChatButton;
