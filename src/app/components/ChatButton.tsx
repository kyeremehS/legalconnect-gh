'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatModal from './ChatModal';

export default function ChatButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-[#1A237E] text-white rounded-full shadow-lg hover:bg-[#1A237E]/90 transition-all hover:scale-105 group"
        aria-label="Chat with Legal Assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#1A237E] text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with Legal Assistant
        </span>
      </button>

      <ChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 