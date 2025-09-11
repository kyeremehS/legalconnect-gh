"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MessageSquare,
  Search,
  MoreVertical,
  Send,
  Paperclip,
  Phone,
  Video,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMessaging } from "../../../hooks/useMessaging"; // unified hook
import ClientAuthWrapper from "../../components/auth/ClientAuthWrapper";
import { useAuth } from "../../../contexts/AuthContext";
import LawyerSelectionModal from "../../components/messaging/LawyerSelectionModal";

export default function ClientMessagesComponent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Use unified useChat hook
  const {
    chats,
    selectedChat,
    messages,
    isLoading,
    error,
    selectChat,
    sendTextMessage,
    markMessageAsRead,
    formatMessageTime,
    getUnreadCountForChat,
    createChat,
    loadConversation,
  } = useMessaging(user?.id, "CLIENT");

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLawyerSelection, setShowLawyerSelection] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('ClientMessagesComponent - User state:', { user, userId: user?.id });
  }, [user, user?.id]);

  useEffect(() => {
    const lawyerId = searchParams.get('lawyer');
    const lawyerName = searchParams.get('name');

    if (lawyerId && lawyerName && !selectedChat && user?.id) {
      const lawyerChat = createChat(lawyerId, decodeURIComponent(lawyerName));
      if (lawyerChat) selectChat(lawyerChat);
    }
  }, [searchParams, selectedChat, createChat, selectChat, user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedChat && messages.length > 0) {
      messages.forEach((message: any) => {
        if (!message.readAt && message.senderId !== user?.id) {
          markMessageAsRead(message.id);
        }
      });
    }
  }, [selectedChat, messages, user?.id, markMessageAsRead]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    await sendTextMessage(newMessage);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectLawyer = (lawyerId: string, lawyerName: string) => {
    const lawyerChat = createChat(lawyerId, lawyerName);
    if (lawyerChat) {
      selectChat(lawyerChat);
      setShowLawyerSelection(false);
    }
  };

  const getOtherParticipantName = (chat: any) => {
    const otherParticipant = chat.participants.find((p: string) => p !== user?.id);
    return otherParticipant ? chat.participantNames[otherParticipant] : "Unknown";
  };

  const getLastMessagePreview = (chat: any) => {
    if (!chat.lastMessage) return "No messages yet";
    return chat.lastMessage.content.length > 50
      ? chat.lastMessage.content.substring(0, 50) + "..."
      : chat.lastMessage.content;
  };

  const filteredChats = chats.filter((chat: any) => {
    const participantName = getOtherParticipantName(chat);
    return participantName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <ClientAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <div className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link href="/User-landing" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4a017] rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-blue-800">My Messages</h1>
              </div>
            </div>
            <Link href="/User-landing" className="text-blue-500 hover:underline">
              Back to Dashboard
            </Link>
          </header>

          {/* Main Chat Interface */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-[calc(100vh-160px)]">
            <div className="flex h-full flex-col lg:flex-row">
              {/* Chat List */}
              <div className="md:w-[320px] w-full border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="relative mb-3">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#4a4a4a]" />
                    <input
                      type="text"
                      placeholder="Search conversations"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-[#d4a1a1] text-[#1a1a1a]"
                    />
                  </div>
                  <button
                    onClick={() => setShowLawyerSelection(true)}
                    className="w-full px-4 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b8901a] transition-colors text-sm font-medium"
                  >
                    + Start New Conversation
                  </button>
                </div>

                <div className="overflow-y-auto flex-1">
                  {/* Loading State */}
                  {isLoading && (
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4a017]"></div>
                    </div>
                  )}

                  {/* Error State */}
                  {error && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  {/* Empty State */}
                  {filteredChats.length === 0 && !isLoading && !error && (
                    <div className="flex items-center justify-center p-8">
                      <div className="text-center">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-2">No conversations yet</p>
                        <p className="text-sm text-gray-400 mb-4">Start chatting with lawyers to get legal help</p>
                        <button
                          onClick={() => setShowLawyerSelection(true)}
                          className="px-4 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b8941f] transition-colors text-sm font-medium"
                        >
                          Find Lawyers
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Chat List Items */}
                  {filteredChats.map((chat: any) => (
                    <div
                      key={chat.id}
                      onClick={() => selectChat(chat)}
                      className={`flex items-center gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                        }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#d4a017] flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {getOtherParticipantName(chat).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-semibold text-[#1a1a1a] truncate">
                            {getOtherParticipantName(chat)}
                          </h3>
                          {chat.lastMessage && (
                            <span className="text-xs font-medium text-[#4a4a4a]">
                              {formatMessageTime(chat.lastMessage.createdAt)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#4a4a4a] truncate">
                          {getLastMessagePreview(chat)}
                        </p>
                      </div>
                      {getUnreadCountForChat(chat) > 0 && (
                        <span className="bg-[#d4a017] text-white text-xs font-bold rounded-full 
                          w-5 h-5 flex items-center justify-center">
                          {getUnreadCountForChat(chat)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col bg-[#fafafa]">
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#d4a017] flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {getOtherParticipantName(selectedChat).charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a]">
                            {getOtherParticipantName(selectedChat)}
                          </h3>
                          <p className="text-sm text-[#4a4a4a]">Legal Practitioner</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Phone className="w-5 h-5 text-[#4a4a4a]" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Video className="w-5 h-5 text-[#4a4a4a]" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5 text-[#4a4a4a]" />
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message: any) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'
                            }`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${message.senderId === user?.id
                                ? 'bg-[#d4a017] text-white'
                                : 'bg-white text-[#1a1a1a] shadow-sm border border-gray-200'
                              }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.senderId === user?.id ? 'text-yellow-100' : 'text-[#4a4a4a]'
                              }`}>
                              {formatMessageTime(message.createdAt)}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-4 bg-white border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Paperclip className="w-5 h-5 text-[#4a4a4a]" />
                        </button>
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="w-full px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 
                              focus:outline-none focus:ring-2 focus:ring-[#d4a017] text-[#1a1a1a]"
                          />
                        </div>
                        <button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="p-2.5 bg-[#d4a017] text-white rounded-lg hover:bg-[#b8901a] 
                            transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* No Chat Selected */
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">Ready to get legal help?</h3>
                      <p className="text-gray-400 mb-4">Choose a lawyer to start messaging or find new lawyers to connect with</p>
                      <button
                        onClick={() => setShowLawyerSelection(true)}
                        className="px-4 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b8941f] transition-colors text-sm font-medium"
                      >
                        Find Lawyers to Message
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lawyer Selection Modal */}
      <LawyerSelectionModal
        isOpen={showLawyerSelection}
        onClose={() => setShowLawyerSelection(false)}
        onSelectLawyer={handleSelectLawyer}
      />
    </ClientAuthWrapper>
  );
}
