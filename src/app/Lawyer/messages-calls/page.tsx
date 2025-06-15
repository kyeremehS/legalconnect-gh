"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, MoreVertical, Send, Paperclip } from "lucide-react";
import { useState } from "react";

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  avatar?: string;
};

type Message = {
  id: string;
  content: string;
  timestamp: string;
  sender: "user" | "client";
};

const mockChats: Chat[] = [
  {
    id: "1",
    name: "John Smith",
    lastMessage: "I need legal advice regarding my business contract",
    timestamp: "2:30 PM",
    unreadCount: 3,
  },
  // ...add more mock chats
];

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hello, I need legal advice regarding my business contract",
    timestamp: "2:30 PM",
    sender: "client",
  },
  {
    id: "2",
    content: "Of course, I'd be happy to help. Could you provide more details about your situation?",
    timestamp: "2:31 PM",
    sender: "user",
  },
  // ...add more mock messages
];

export default function MessagesAndCalls() {
  const [chats] = useState<Chat[]>(mockChats);
  const [messages] = useState<Message[]>(mockMessages);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-[calc(100vh-100px)]"
        >
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Messages & Calls</h1>
            <p className="text-[#4a4a4a] font-medium">Manage your communications</p>
          </div>

          {/* Main Chat Interface */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-[calc(100%-80px)]">
            <div className="flex h-full">
              {/* Chat List */}
              <div className="w-[320px] border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#4a4a4a]" />
                    <input
                      type="text"
                      placeholder="Search chats"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-[#d4a017] text-[#1a1a1a]"
                    />
                  </div>
                </div>

                <div className="overflow-y-auto flex-1">
                  {chats.map((chat) => (
                    <motion.div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100
                        hover:bg-[#fff8eb] transition-colors
                        ${selectedChat?.id === chat.id ? "bg-[#fff8eb]" : ""}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#d4a017] flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">{chat.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-semibold text-[#1a1a1a] truncate">{chat.name}</h3>
                          <span className="text-xs font-medium text-[#4a4a4a]">{chat.timestamp}</span>
                        </div>
                        <p className="text-sm text-[#4a4a4a] truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unreadCount && (
                        <span className="bg-[#d4a017] text-white text-xs font-bold rounded-full 
                          w-5 h-5 flex items-center justify-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              {selectedChat ? (
                <div className="flex-1 flex flex-col bg-[#fafafa]">
                  <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4a017] flex items-center justify-center">
                        <span className="text-white font-semibold">{selectedChat.name.charAt(0)}</span>
                      </div>
                      <h2 className="font-semibold text-[#1a1a1a]">{selectedChat.name}</h2>
                    </div>
                    <button className="p-2 hover:bg-[#fff8eb] rounded-full text-[#d4a017]">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`max-w-[70%] mb-4 ${message.sender === "user" ? "ml-auto" : "mr-auto"}`}
                      >
                        <div className={`p-3 rounded-xl shadow-sm ${
                          message.sender === "user"
                            ? "bg-[#d4a017] text-white"
                            : "bg-white border border-gray-200"
                        }`}>
                          <p className={message.sender === "user" ? "text-white" : "text-[#1a1a1a]"}>
                            {message.content}
                          </p>
                          <span className={`text-xs block text-right mt-1 
                            ${message.sender === "user" ? "text-white/80" : "text-[#4a4a4a]"}`}>
                            {message.timestamp}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex items-center gap-2 bg-[#fafafa] rounded-xl p-3 border border-gray-200">
                      <button className="p-2 hover:bg-[#fff8eb] rounded-full text-[#d4a017]">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        className="flex-1 bg-transparent focus:outline-none text-[#1a1a1a] placeholder-[#4a4a4a]"
                      />
                      <button className="p-2 hover:bg-[#fff8eb] rounded-full text-[#d4a017]">
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-[#fafafa]">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-[#d4a017]" />
                    <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                      Select a chat to start messaging
                    </h3>
                    <p className="text-[#4a4a4a]">
                      Choose from your existing conversations or start a new one
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
