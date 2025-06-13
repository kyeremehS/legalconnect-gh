"use client";
import Link from 'next/link';
import Image from 'next/image';
import { JSX, useState } from 'react';
import SidebarLayout from "@/components/SidebarLayout";
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Mock user and chat data
const mockUser = { displayName: 'Kofi Mensah' };
const mockChat = [
  { id: 1, sender: 'chatbot', text: 'How can I assist you with your legal questions today?', time: '10:55 PM' },
  { id: 2, sender: 'user', text: 'What is a power of attorney?', time: '10:56 PM' },
  { id: 3, sender: 'chatbot', text: 'A power of attorney is a legal document that allows someone to act on your behalf in legal or financial matters. Would you like more details?', time: '10:57 PM' },
];

const navItems = [
  { name: "Dashboard", href: "/User-landing" },
  { name: "Videos", href: "/legal-content" },
  { name: "Appointments", href: "/user/appointments" },
  { name: "Messages", href: "/user/messages" },
  { name: "Education", href: "/user/education" },
  { name: "Chatbot", href: "/legal-chatbot" },
  { name: "Settings", href: "/user/settings" },
];


interface LegalChatbotProps {
  trigger: React.ReactNode;
}

// Remove the props destructuring and just define as a standard component
export const LegalChatbot: React.FC<LegalChatbotProps> = ({ trigger }) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(mockChat);
  const [isTyping, setIsTyping] = useState(false);

  // Handle chat message submission
  const handleSend = async () => {
    if (input.trim()) {
      // Add user message
      const userMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: input.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);

      try {
        // Make API call to your chatbot backend
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input.trim() }),
        });

        if (!response.ok) throw new Error('Failed to get response');

        const data = await response.json();

        // Add bot response
        setMessages(prev => [...prev, {
          id: prev.length + 2,
          sender: 'chatbot',
          text: data.message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } catch (error) {
        console.error('Chat error:', error);
        // Add error message
        setMessages(prev => [...prev, {
          id: prev.length + 2,
          sender: 'chatbot',
          text: 'Sorry, I encountered an error. Please try again.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div onClick={() => setIsOpen(true)}>{trigger}</div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed bottom-[100px] right-6 w-[90vw] max-w-[400px] bg-white rounded-2xl shadow-xl z-50 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Legal Assistant</h3>
                    <p className="text-sm text-gray-500">Ask me anything</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="h-[400px] overflow-y-auto p-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-6 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md p-4 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gray-900 text-white ml-12'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-100 mr-12'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-gray-300' : 'text-gray-400'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start mb-6">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mr-12">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-100">
                <form
                  className="flex items-center gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                  />
                  <button
                    type="submit"
                    className="bg-gray-900 p-3 rounded-xl text-white hover:bg-gray-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13"></path>
                      <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                    </svg>
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LegalChatbot;