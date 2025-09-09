"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Search,
  MoreVertical,
  Send,
  Paperclip,
  Phone,
  Video,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
} from "lucide-react";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import LawyerAuthWrapper from "../../components/auth/LawyerAuthWrapper";
import { useMessaging } from "../../../hooks/useMessaging";

export default function MessagesAndCalls() {
  // Temporary user ID for testing - in production this would come from your auth system
  const user = { id: "lawyer-user-id" };
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  
  // Get current user ID from Clerk
  const currentUserId = user?.id;
  
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
  } = useMessaging(currentUserId, "LAWYER");

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedChat && messages.length > 0) {
      messages.forEach((message: any) => {
        if (!message.readAt && message.senderId !== currentUserId) {
          markMessageAsRead(message.id);
        }
      });
    }
  }, [selectedChat, messages, currentUserId, markMessageAsRead]);

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

  const getOtherParticipantName = (chat: any) => {
    const otherParticipant = chat.participants.find((p: string) => p !== currentUserId);
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

  // const [newMessage, setNewMessage] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");
  // const [isMuted, setIsMuted] = useState(false);
  // const [isVideoOff, setIsVideoOff] = useState(false);
  // const messagesEndRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // useEffect(() => {
  //   if (selectedChat && messages.length > 0) {
  //     messages.forEach((message) => {
  //       if (!message.read && message.senderId !== user?.id) {
  //         markMessageAsRead(message.id);
  //       }
  //     });
  //   }
  // }, [selectedChat, messages, user?.id, markMessageAsRead]);

  // const handleSendMessage = async () => {
  //   if (!newMessage.trim()) return;
  //   await sendTextMessage(newMessage);
  //   setNewMessage("");
  // };

  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSendMessage();
  //   }
  // };

  // const handleStartVoiceCall = async () => {
  //   if (!selectedChat) return;
  //   const otherParticipant = selectedChat.participants.find(p => p !== user?.id);
  //   const otherParticipantName = otherParticipant ? selectedChat.participantNames[otherParticipant] : "Unknown";
  //   if (otherParticipant) {
  //     await startVoiceCall(selectedChat.id, otherParticipant, otherParticipantName);
  //   }
  // };

  // const handleStartVideoCall = async () => {
  //   if (!selectedChat) return;
  //   const otherParticipant = selectedChat.participants.find(p => p !== user?.id);
  //   const otherParticipantName = otherParticipant ? selectedChat.participantNames[otherParticipant] : "Unknown";
  //   if (otherParticipant) {
  //     await startVideoCall(selectedChat.id, otherParticipant, otherParticipantName);
  //   }
  // };

  // const handleToggleMute = async () => {
  //   const muted = await toggleMute();
  //   setIsMuted(muted);
  // };

  // const handleToggleVideo = async () => {
  //   const videoOff = await toggleVideo();
  //   setIsVideoOff(videoOff);
  // };

  // const getOtherParticipantName = (chat: Chat) => {
  //   const otherParticipant = chat.participants.find(p => p !== user?.id);
  //   return otherParticipant ? chat.participantNames[otherParticipant] : "Unknown";
  // };

  // const getLastMessagePreview = (chat: Chat) => {
  //   if (!chat.lastMessage) return "No messages yet";
  //   return chat.lastMessage.content.length > 50
  //     ? chat.lastMessage.content.substring(0, 50) + "..."
  //     : chat.lastMessage.content;
  // };

  // const filteredChats = chats.filter(chat => {
  //   const participantName = getOtherParticipantName(chat);
  //   return participantName.toLowerCase().includes(searchQuery.toLowerCase());
  // });

  // if (!user) {
  //   return (
  //     <div className="min-h-screen bg-white flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">Please sign in to access messaging</h2>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <LawyerAuthWrapper>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Hamburger Menu (Mobile) */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-blue-800 text-white p-4 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:hidden`}
        >
          <button
            onClick={toggleMenu}
          className="text-white text-2xl mb-4"
          aria-label="Close Menu"
        >
          ✕
        </button>
        <nav className="space-y-2">
          <Link
            href="/lawyer/dashboard"
            onClick={toggleMenu}
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Dashboard
          </Link>
          <Link
            href="/Lawyer/appointments"
            onClick={toggleMenu}
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Appointments
          </Link>
          <Link
            href="/Lawyer/messages"
            onClick={toggleMenu}
            className="block p-2 bg-blue-700 rounded"
          >
            Messages & Calls
          </Link>
          <Link
            href="/Lawyer/videos"
            onClick={toggleMenu}
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Videos
          </Link>
          <Link
            href="/Lawyer/engagement"
            onClick={toggleMenu}
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Engagement
          </Link>
          <Link
            href="/Lawyer/profile"
            onClick={toggleMenu}
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Profile
          </Link>
          <Link
            href="/Lawyer/settings"
            onClick={toggleMenu}
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="flex justify-between items-center p-6 bg-white shadow">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="block md:hidden text-blue-800 text-2xl mr-4"
              aria-label="Toggle Menu"
            >
              ☰
            </button>
            <h1 className="text-2xl font-bold text-blue-800">
              Messages & Calls
            </h1>
          </div>
          <Link href="/Lawyer" className="text-blue-500 hover:underline">
            Back to Dashboard
          </Link>
        </header>

        {/* Main Chat Interface */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-[calc(100%-80px)]">
          <div className="flex h-full flex-col lg:flex-row">
            {/* Chat List */}
            <div className="md:w-[320px] w-full border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="relative mb-3">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#4a4a4a]" />
                  <input
                    type="text"
                    placeholder="Search chats"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-[#d4a1a1] text-[#1a1a1a]"
                  />
                </div>
                <button
                  onClick={() => {
                    // Create a test chat for demonstration
                    const testChat = createChat("test-client-id", "Test Client");
                    selectChat(testChat);
                  }}
                  className="w-full px-4 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b8901a] transition-colors text-sm font-medium"
                >
                  + Start Test Conversation
                </button>
              </div>

              <div className="overflow-y-auto flex-1">
                {/* Chat list items */}
                {isLoading && (
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4a017]"></div>
                  </div>
                )}
                
                {error && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                
                {filteredChats.length === 0 && !isLoading && (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No conversations yet</p>
                      <p className="text-sm text-gray-400 mt-1">Start chatting with your clients</p>
                    </div>
                  </div>
                )}
                
                {filteredChats.map((chat: any) => (
                  <div
                    key={chat.id}
                    onClick={() => selectChat(chat)}
                    className={`flex items-center gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedChat?.id === chat.id ? 'bg-blue-50' : ''
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
                  <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4a017] flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {getOtherParticipantName(selectedChat).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <h2 className="font-semibold text-[#1a1a1a]">
                        {getOtherParticipantName(selectedChat)}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-[#fff8eb] rounded-full text-[#d4a017]"
                        title="Voice Call"
                      >
                        <Phone className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 hover:bg-[#fff8eb] rounded-full text-[#d4a017]"
                        title="Video Call"
                      >
                        <Video className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 hover:bg-[#fff8eb] rounded-full text-[#d4a017]"
                        title="More options"
                        aria-label="More options"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No messages yet</p>
                          <p className="text-sm text-gray-400 mt-1">Start the conversation</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {messages.map((message: any) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`max-w-[70%] mb-4 ${
                              message.senderId === currentUserId ? 'ml-auto' : 'mr-auto'
                            }`}
                          >
                            <div className={`p-3 rounded-xl shadow-sm ${
                              message.senderId === currentUserId
                                ? 'bg-[#d4a017] text-white'
                                : 'bg-white border border-gray-200 text-[#1a1a1a]'
                            }`}>
                              <p className={message.senderId === currentUserId ? 'text-white' : ''}>
                                {message.content}
                              </p>
                              <span className={`text-xs block text-right mt-1 ${
                                message.senderId === currentUserId 
                                  ? 'text-white/80' 
                                  : 'text-[#4a4a4a]'
                              }`}>
                                {formatMessageTime(message.createdAt)}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex items-center gap-2 bg-[#fafafa] rounded-xl p-3 border border-gray-200">
                      <button
                        className="p-2 hover:bg-[#fff8eb] rounded-full text-[#d4a017]"
                        title="Attach file"
                        aria-label="Attach file"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message"
                        className="flex-1 bg-transparent focus:outline-none text-[#1a1a1a] placeholder-[#4a4a4a]"
                        disabled={isLoading}
                      />
                      <button
                        title="Send message"
                        onClick={handleSendMessage}
                        disabled={isLoading || !newMessage.trim()}
                        className="p-2 hover:bg-[#fff8eb] rounded-full text-[#d4a017] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">Select a conversation</h3>
                    <p className="text-gray-400">Choose a chat from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </LawyerAuthWrapper>
  );
}
