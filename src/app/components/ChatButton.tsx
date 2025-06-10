"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatModal from "./ChatModal";

type ChatButtonProps = {
  onClick?: () => void;
};

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#F9A825] text-[#1A237E] px-6 py-3 rounded-full shadow-lg hover:bg-[#F9A825]/90 transition-all font-bold"
        aria-label="Open chat"
      >
        Chat
      </button>

      <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ChatButton;
