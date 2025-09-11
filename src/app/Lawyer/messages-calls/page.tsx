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

// Custom hook specifically for lawyer message calls
const useLawyerMessageCalls = () => {
  const [clientMessages, setClientMessages] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLawyerMessageCalls = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (!token || !user.id) {
        setError('Authentication required');
        return;
      }

      console.log('🔍 Fetching lawyer message calls for:', user.id);
      
      const response = await fetch(`http://localhost:4000/api/messages/lawyer/calls`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📨 Lawyer message calls response:', data);
      
      if (data.success) {
        setClientMessages(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch message calls');
      }
    } catch (err: any) {
      console.error('❌ Error fetching lawyer message calls:', err);
      setError(err.message || 'Failed to fetch message calls');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchConversationWith = async (clientId: string) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const response = await fetch(`http://localhost:4000/api/messages/${user.id}/${clientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMessages(data.data || []);
        }
      }
    } catch (err: any) {
      console.error('❌ Error fetching conversation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!selectedClient || !content.trim()) return;

    try {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const response = await fetch('http://localhost:4000/api/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverId: selectedClient.clientId,
          content,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Refresh the conversation
          await fetchConversationWith(selectedClient.clientId);
          // Refresh the client list
          await fetchLawyerMessageCalls();
        }
      }
    } catch (err: any) {
      console.error('❌ Error sending message:', err);
    }
  };

  const selectClient = (clientData: any) => {
    setSelectedClient(clientData);
    if (clientData?.clientId) {
      fetchConversationWith(clientData.clientId);
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    fetchLawyerMessageCalls();
  }, []);

  return {
    clientMessages,
    selectedClient,
    messages,
    isLoading,
    error,
    selectClient,
    sendMessage,
    formatMessageTime,
    refreshData: fetchLawyerMessageCalls,
  };
};

export default function MessagesAndCalls() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  
  // Use the specialized lawyer message calls hook
  const {
    clientMessages,
    selectedClient,
    messages,
    isLoading,
    error,
    selectClient,
    sendMessage,
    formatMessageTime,
    refreshData,
  } = useLawyerMessageCalls();

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUserId(userData.id);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(newMessage);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getClientName = (client: any) => {
    if (client?.fullName) return client.fullName;
    if (client?.firstName && client?.lastName) {
      return `${client.firstName} ${client.lastName}`;
    }
    return client?.email || "Unknown Client";
  };

  const getLastMessagePreview = (latestMessage: any) => {
    if (!latestMessage?.content) return "No messages yet";
    return latestMessage.content.length > 50
      ? latestMessage.content.substring(0, 50) + "..."
      : latestMessage.content;
  };

  const filteredClients = clientMessages.filter((clientData: any) => {
    const clientName = getClientName(clientData.client);
    return clientName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Debug logging
  useEffect(() => {
    console.log('📊 Lawyer Messages Page State:', {
      clientMessages,
      selectedClient,
      currentUserId,
      isLoading,
      error
    });
  }, [clientMessages, selectedClient, currentUserId, isLoading, error]);

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
          <div className="flex items-center gap-4">
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
            <Link href="/Lawyer" className="text-blue-500 hover:underline">
              Back to Dashboard
            </Link>
          </div>
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
                    placeholder="Search clients"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-[#d4a1a1] text-[#1a1a1a]"
                  />
                </div>
                <button
                  onClick={refreshData}
                  className="w-full px-4 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b8901a] transition-colors text-sm font-medium mb-2"
                >
                  Refresh Messages
                </button>
              </div>

              <div className="overflow-y-auto flex-1">
                {/* Client list items */}
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
                
                {filteredClients.length === 0 && !isLoading && !error && (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No client messages yet</p>
                      <p className="text-sm text-gray-400 mt-1">Clients will appear here when they send messages</p>
                    </div>
                  </div>
                )}
                
                {filteredClients.map((clientData: any) => (
                  <div
                    key={clientData.clientId}
                    onClick={() => selectClient(clientData)}
                    className={`flex items-center gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedClient?.clientId === clientData.clientId ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#d4a017] flex items-center justify-center relative">
                      <span className="text-white font-semibold text-lg">
                        {getClientName(clientData.client).charAt(0).toUpperCase()}
                      </span>
                      {/* Call request indicator */}
                      {clientData.statistics?.callRequestCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <Phone className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-semibold text-[#1a1a1a] truncate">
                          {getClientName(clientData.client)}
                        </h3>
                        {clientData.latestMessage && (
                          <span className="text-xs font-medium text-[#4a4a4a]">
                            {formatMessageTime(clientData.latestMessage.createdAt)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#4a4a4a] truncate">
                        {getLastMessagePreview(clientData.latestMessage)}
                      </p>
                      {/* Message statistics for lawyers */}
                      <div className="flex gap-2 mt-1">
                        {clientData.statistics?.callRequestCount > 0 && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {clientData.statistics.callRequestCount} call{clientData.statistics.callRequestCount !== 1 ? 's' : ''}
                          </span>
                        )}
                        {clientData.statistics?.regularMessageCount > 0 && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {clientData.statistics.regularMessageCount} message{clientData.statistics.regularMessageCount !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-[#fafafa]">
              {selectedClient ? (
                <>
                  <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4a017] flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {getClientName(selectedClient.client).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h2 className="font-semibold text-[#1a1a1a]">
                          {getClientName(selectedClient.client)}
                        </h2>
                        <p className="text-sm text-gray-500">{selectedClient.client?.email}</p>
                      </div>
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
                              {message.messageType === 'call-request' && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Phone className="w-3 h-3" />
                                  <span className="text-xs">Call Request</span>
                                </div>
                              )}
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
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">Select a client</h3>
                    <p className="text-gray-400">Choose a client from the sidebar to view messages</p>
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
