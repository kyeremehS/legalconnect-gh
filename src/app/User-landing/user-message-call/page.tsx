"use client";
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMessaging } from "../../../hooks/useMessaging";
import { Phone, Video, Send, Paperclip, Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff } from "lucide-react";
import { Chat, Message } from "../../../lib/messaging";

export default function UserMessageCall() {
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

  const [messageInput, setMessageInput] = useState("");
  const [showCallModal, setShowCallModal] = useState(false);
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
    if (!messageInput.trim()) return;
    await sendTextMessage(messageInput);
    setMessageInput("");
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

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#1A237E] mb-4">Please sign in to access messaging</h2>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F9FC] flex flex-col md:flex-row">
      {/* Sidebar: Conversations and Calls */}
      <aside className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 p-4 flex flex-col gap-8">
        {/* Conversations */}
        <section>
          <h2 className="text-lg font-semibold text-[#1A237E] mb-4">
            Messages
          </h2>
          <ul>
            {chats.map((chat) => {
              const unreadCount = getUnreadCountForChat(chat);
              const isSelected = selectedChat?.id === chat.id;
              
              return (
              <li
                  key={chat.id}
                className={`p-3 rounded cursor-pointer mb-2 transition-colors ${
                    isSelected
                    ? "bg-[#F9A825]/20 border-l-4 border-[#F9A825]"
                    : "hover:bg-gray-100"
                }`}
                  onClick={() => selectChat(chat)}
                  aria-current={isSelected}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#1A237E]">
                      {getOtherParticipantName(chat)}
                    </span>
                    {unreadCount > 0 && (
                      <span className="ml-2 inline-block w-5 h-5 rounded-full bg-[#F9A825] text-white text-xs flex items-center justify-center">
                        {unreadCount}
                  </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 truncate">
                    {getLastMessagePreview(chat)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {chat.lastMessageTime ? formatMessageTime(chat.lastMessageTime) : "No messages"}
                </div>
              </li>
              );
            })}
          </ul>
        </section>

        {/* Incoming Calls */}
        {incomingCalls.length > 0 && (
        <section>
            <h2 className="text-lg font-semibold text-[#1A237E] mb-4">Incoming Calls</h2>
          <ul>
              {incomingCalls.map((call) => (
                <li key={call.id} className="mb-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-[#1A237E]">
                      {call.callerName}
                  </span>
                    <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                      {call.callType}
                  </span>
                </div>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
                      onClick={() => answerCall(call)}
                    >
                      Answer
                    </button>
                    <button
                      className="flex-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                      onClick={() => declineCall(call)}
                    >
                      Decline
                    </button>
                  </div>
              </li>
            ))}
          </ul>
        </section>
        )}
      </aside>

      {/* Main Panel: Chat */}
      <section className="flex-1 flex flex-col h-[80vh]">
        {selectedChat ? (
          <>
            {/* Chat Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#1A237E]">
                  {getOtherParticipantName(selectedChat)}
            </h3>
            <span className="text-sm text-gray-500">
              Legal Practitioner
            </span>
          </div>
              <div className="flex gap-2">
                <button
                  className="p-2 bg-[#F9A825] text-[#1A237E] rounded hover:bg-[#F9A825]/90 transition"
                  onClick={handleStartVoiceCall}
                  disabled={isInCall}
                  title="Voice Call"
                >
                  <Phone className="w-5 h-5" />
                </button>
          <button
                  className="p-2 bg-[#F9A825] text-[#1A237E] rounded hover:bg-[#F9A825]/90 transition"
                  onClick={handleStartVideoCall}
                  disabled={isInCall}
                  title="Video Call"
          >
                  <Video className="w-5 h-5" />
          </button>
              </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F7F9FC]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                    msg.senderId === user.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                      msg.senderId === user.id
                    ? "bg-[#F9A825] text-[#1A237E] rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
                aria-label={
                      msg.senderId === user.id ? "Your message" : "Other message"
                }
              >
                <div className="text-sm">{msg.content}</div>
                <div className="text-xs text-gray-500 mt-1 text-right">
                      {formatMessageTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
              <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition">
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </button>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
            placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
                  disabled={isLoading}
          />
          <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !messageInput.trim()}
                  className="p-2 bg-[#F9A825] text-[#1A237E] rounded-lg hover:bg-[#F9A825]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
                  <Send className="w-5 h-5" />
          </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#F7F9FC]">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#1A237E] mb-2">
                Select a conversation to start messaging
              </h3>
              <p className="text-gray-600">
                Choose from your existing conversations or start a new one
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Active Call Overlay */}
      {isInCall && activeCall && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-[#1A237E] mb-2">
                {activeCall.callType === 'video' ? 'Video Call' : 'Voice Call'}
              </h3>
              <p className="text-gray-600">
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
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {error}
        </div>
      )}
    </main>
  );
}