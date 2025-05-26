"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import SidebarLayout from "@/components/SidebarLayout";

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

const LegalChatbot: React.FC = () => {
  // State for mobile sidebar toggle and chat input
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [input, setInput] = useState('');

  // Mock send function (logs input to console)
  const handleSend = () => {
    if (input.trim()) {
      console.log('User query:', input);
      setInput('');
    }
  };

  return (
    <SidebarLayout navItems={navItems} active="Chatbot">
      <div className="flex-1 p-6 md:ml-0 ml-0">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Legal Chatbot - Welcome, {mockUser.displayName}!
          </h1>
          <Link href="/user/settings">
            <button className="bg-[var(--primary)] text-black px-4 py-2 rounded hover:bg-[var(--accent)] transition-colors">
              Settings
            </button>
          </Link>
        </header>

        {/* Chatbot Interface */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ask Your Legal Questions</h2>
          <div className="h-96 overflow-y-auto mb-4 bg-gray-50 p-4 rounded border border-gray-200">
            {mockChat.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className='text-[#0d1b2a]'>{message.text}</p>
                  <p className="text-xs mt-1 opacity-70 text-[#0d1b2a]">{message.time}</p>
                </div>
              </div>
            ))}
          </div>
          <form
            className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 shadow-inner border border-gray-200"
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your legal question…"
              className="flex-1 bg-transparent outline-none px-2 py-2 text-[#0d1b2a]"
            />
            {input && (
              <button
                onClick={() => setInput('')}
                className="text-black-400 hover:text-red-500 transition-colors"
                aria-label="Clear"
                type="button"
              >
                {/* X (clear) icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="bg-[#1A237E] hover:bg-[#283593] text-white rounded-full p-2 transition-colors flex items-center justify-center"
              aria-label="Send"
            >
              {/* Paper plane (send) icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l14-7-7 14-2-5-5-2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default LegalChatbot;