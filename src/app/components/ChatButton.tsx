"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatModal from "./ChatModal";

export default function ChatButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-amber-600 text-white rounded-full shadow-xl hover:bg-amber-600/90 transition-all hover:scale-105 hover:shadow-2xl group z-50"
        aria-label="Chat with Legal Assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Chat with Legal Assistant
        </span>
      </button>

      <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
