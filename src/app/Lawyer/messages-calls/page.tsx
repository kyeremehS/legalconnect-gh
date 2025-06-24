"use client";

import { motion } from "framer-motion";
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
import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMessaging } from "../../../hooks/useMessaging";
import { Chat, Message } from "../../../lib/messaging";

export default function MessagesAndCalls() {
  const { user } = useUser();
  const {
    chats,
    selectedChat,
    messages,
    isLoading,
    error,
    incomingCalls,
    activeCall,
    isInCall,
    selectChat,
    sendTextMessage,
    markMessageAsRead,
    startVoiceCall,
    startVideoCall,
    answerCall,
    declineCall,
    endCall,
    toggleMute,
    toggleVideo,
    formatMessageTime,
    getUnreadCountForChat,
  } = useMessaging();

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark messages as read when chat is selected
  useEffect(() => {
    if (selectedChat && messages.length > 0) {
      messages.forEach((message) => {
        if (!message.read && message.senderId !== user?.id) {
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

  const handleStartVoiceCall = async () => {
    if (!selectedChat) return;
    
    const otherParticipant = selectedChat.participants.find(p => p !== user?.id);
    const otherParticipantName = otherParticipant ? selectedChat.participantNames[otherParticipant] : "Unknown";
    
    if (otherParticipant) {
      await startVoiceCall(selectedChat.id, otherParticipant, otherParticipantName);
    }
  };

  const handleStartVideoCall = async () => {
    if (!selectedChat) return;
    
    const otherParticipant = selectedChat.participants.find(p => p !== user?.id);
    const otherParticipantName = otherParticipant ? selectedChat.participantNames[otherParticipant] : "Unknown";
    
    if (otherParticipant) {
      await startVideoCall(selectedChat.id, otherParticipant, otherParticipantName);
    }
  };

  const handleToggleMute = async () => {
    const muted = await toggleMute();
    setIsMuted(muted);
  };

  const handleToggleVideo = async () => {
    const videoOff = await toggleVideo();
    setIsVideoOff(videoOff);
  };

  const getOtherParticipantName = (chat: Chat) => {
    const otherParticipant = chat.participants.find(p => p !== user?.id);
    return otherParticipant ? chat.participantNames[otherParticipant] : "Unknown";
  };

  const getLastMessagePreview = (chat: Chat) => {
    if (!chat.lastMessage) return "No messages yet";
    return chat.lastMessage.content.length > 50 
      ? chat.lastMessage.content.substring(0, 50) + "..."
      : chat.lastMessage.content;
  };

  const filteredChats = chats.filter(chat => {
    const participantName = getOtherParticipantName(chat);
    return participantName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">Please sign in to access messaging</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-white">
      <main className="p-4 lg:p-8 pt-20 lg:pt-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-[calc(100vh-100px)]"
        >
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1a1a1a]">
              Messages & Calls
            </h1>
            <p className="text-[#4a4a4a] font-medium">
              Manage your communications
            </p>
          </div>

          {/* Main Chat Interface */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-[calc(100%-80px)]">
            <div className="flex h-full flex-col lg:flex-row">
              {/* Chat List */}
              <div className="md:w-[320px] w-full border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#4a4a4a]" />
                    <input
                      type="text"
                      placeholder="Search chats"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-[#d4a017] text-[#1a1a1a]"
                    />
                  </div>
                </div>

                <div className="overflow-y-auto flex-1">
                  {filteredChats.map((chat) => {
                    const unreadCount = getUnreadCountForChat(chat);
                    const isSelected = selectedChat?.id === chat.id;
                    const participantName = getOtherParticipantName(chat);
                    
                    return (
                      <motion.div
                        key={chat.id}
                        onClick={() => selectChat(chat)}
                        className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100
                          hover:bg-[#fff8eb] transition-colors
                          ${isSelected ? "bg-[#fff8eb]" : ""}`}
                      >
                        <div className="w-12 h-12 rounded-full bg-[#d4a017] flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {participantName.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-semibold text-[#1a1a1a] truncate">
                              {participantName}
                            </h3>
                            <span className="text-xs font-medium text-[#4a4a4a]">
                              {chat.lastMessageTime ? formatMessageTime(chat.lastMessageTime) : "No messages"}
                            </span>
                          </div>
                          <p className="text-sm text-[#4a4a4a] truncate">
                            {getLastMessagePreview(chat)}
                          </p>
                        </div>
                        {unreadCount > 0 && (
                          <span
                            className="bg-[#d4a017] text-white text-xs font-bold rounded-full 
                            w-5 h-5 flex items-center justify-center"
                          >
                            {unreadCount}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Chat Area */}
              {selectedChat ? (
                <div className="flex-1 flex flex-col bg-[#fafafa]">
                  <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4a017] flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {getOtherParticipantName(selectedChat).charAt(0)}
                        </span>
                      </div>
                      <h2 className="font-semibold text-[#1a1a1a]">
                        {getOtherParticipantName(selectedChat)}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-[#fff8eb] rounded-full text-[#d4a017]"
                        onClick={handleStartVoiceCall}
                        disabled={isInCall}
                        title="Voice Call"
                      >
                        <Phone className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 hover:bg-[#fff8eb] rounded-full text-[#d4a017]"
                        onClick={handleStartVideoCall}
                        disabled={isInCall}
                        title="Video Call"
                      >
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-[#fff8eb] rounded-full text-[#d4a017]">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`max-w-[70%] mb-4 ${
                          message.senderId === user.id ? "ml-auto" : "mr-auto"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-xl shadow-sm ${
                            message.senderId === user.id
                              ? "bg-[#d4a017] text-white"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          <p
                            className={
                              message.senderId === user.id
                                ? "text-white"
                                : "text-[#1a1a1a]"
                            }
                          >
                            {message.content}
                          </p>
                          <span
                            className={`text-xs block text-right mt-1 
                            ${
                              message.senderId === user.id
                                ? "text-white/80"
                                : "text-[#4a4a4a]"
                            }`}
                          >
                            {formatMessageTime(message.timestamp)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
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
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message"
                        className="flex-1 bg-transparent focus:outline-none text-[#1a1a1a] placeholder-[#4a4a4a]"
                        disabled={isLoading}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !newMessage.trim()}
                        className="p-2 hover:bg-[#fff8eb] rounded-full text-[#d4a017] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
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

      {/* Incoming Calls Overlay */}
      {incomingCalls.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {incomingCalls.map((call) => (
            <div key={call.id} className="bg-white rounded-lg shadow-lg p-4 border border-yellow-200 max-w-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-[#1a1a1a]">
                  {call.callerName}
                </span>
                <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                  {call.callType}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition"
                  onClick={() => answerCall(call)}
                >
                  Answer
                </button>
                <button
                  className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition"
                  onClick={() => declineCall(call)}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active Call Overlay */}
      {isInCall && activeCall && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                {activeCall.callType === 'video' ? 'Video Call' : 'Voice Call'}
              </h3>
              <p className="text-[#4a4a4a]">
                {activeCall.callerId === user.id ? activeCall.receiverName : activeCall.callerName}
              </p>
            </div>
            
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={handleToggleMute}
                className={`p-3 rounded-full ${
                  isMuted ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                } hover:opacity-80 transition`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              
              {activeCall.callType === 'video' && (
                <button
                  onClick={handleToggleVideo}
                  className={`p-3 rounded-full ${
                    isVideoOff ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                  } hover:opacity-80 transition`}
                >
                  {isVideoOff ? <VideoOff className="w-6 h-6" /> : <VideoIcon className="w-6 h-6" />}
                </button>
              )}
              
              <button
                onClick={endCall}
                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="fixed top-4 left-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {error}
        </div>
      )}
    </div>
  );
}
