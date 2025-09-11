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
} from "lucide-react";
import { motion } from "framer-motion";
import LawyerAuthWrapper from "../../components/auth/LawyerAuthWrapper";
import { useChat } from "../../../hooks/useChat";

export default function LawyerMessages() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Get lawyer ID from localStorage (adjust if you have AuthContext for lawyers)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  useEffect(() => {
    const lawyer = localStorage.getItem("user");
    if (lawyer) setCurrentUserId(JSON.parse(lawyer).id);
  }, []);

  const {
    chats,
    selectedChat,
    messages,
    isLoading,
    error,
    selectChat,
    sendTextMessage,
    formatMessageTime,
    getUnreadCountForChat,
    markMessageAsRead,
  } = useChat(currentUserId, "LAWYER");

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

  return (
    <LawyerAuthWrapper>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div className="w-1/3 border-r bg-white flex flex-col">
          <div className="p-4 flex items-center justify-between border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages
            </h2>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Client/Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat: any) => (
              <div
                key={chat.id}
                onClick={() => selectChat(chat)}
                className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${selectedChat?.id === chat.id ? "bg-blue-50" : ""
                  }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium">{getOtherParticipantName(chat)}</p>
                  <span className="text-xs text-gray-500">
                    {chat.lastMessage
                      ? formatMessageTime(chat.lastMessage.createdAt)
                      : ""}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {getLastMessagePreview(chat)}
                </p>
                {getUnreadCountForChat(chat) > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getUnreadCountForChat(chat)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedChat ? (
            <>
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center bg-white">
                <div>
                  <h3 className="font-medium">{getOtherParticipantName(selectedChat)}</h3>
                  <p className="text-sm text-gray-500">Client</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Video className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg: any) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.senderId === currentUserId
                      ? "justify-end"
                      : "justify-start"
                      }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${msg.senderId === currentUserId
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-900"
                        }`}
                    >
                      <p>{msg.content}</p>
                      <span className="text-xs opacity-70">
                        {formatMessageTime(msg.createdAt)}
                      </span>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-white flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Paperclip className="h-5 w-5 text-gray-500" />
                </button>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a client to start messaging
            </div>
          )}
        </div>
      </div>
    </LawyerAuthWrapper>
  );
}



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
