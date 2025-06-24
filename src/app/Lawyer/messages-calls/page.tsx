"use client";
import { useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function Messages() {
  type Message = {
    id: number;
    client: string;
    subject: string;
    text: string;
    timestamp: string;
    unread: boolean;
  };
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMessageView, setIsMobileMessageView] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Mock message data
  const messages = [
    {
      id: 1,
      client: "Kwame Asante",
      subject: "Divorce Consultation",
      text: "I need advice on divorce proceedings.",
      timestamp: "2025-05-23 10:00 AM",
      unread: true,
    },
    {
      id: 2,
      client: "Ama Kwarteng",
      subject: "Contract Review",
      text: "Can you review my employment contract?",
      timestamp: "2025-05-22 3:15 PM",
      unread: false,
    },
    {
      id: 3,
      client: "Kofi Mensah",
      subject: "Land Dispute",
      text: "I have a dispute over inherited land.",
      timestamp: "2025-05-21 9:30 AM",
      unread: false,
    },
  ];

  // Mock call request data
  const callRequests = [
    {
      id: 1,
      client: "Kwame Asante",
      time: "2025-05-23 2:00 PM",
      status: "Pending",
    },
    {
      id: 2,
      client: "Ama Kwarteng",
      time: "2025-05-24 10:00 AM",
      status: "Pending",
    },
  ];

  // Filter messages based on search query
  const filteredMessages = messages.filter(
    (msg) =>
      msg.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle message selection
  const handleSelectMessage = (message: {
    id: number;
    client: string;
    subject: string;
    text: string;
    timestamp: string;
    unread: boolean;
  }) => {
    setSelectedMessage(message);
    setIsMobileMessageView(true);
  };

  // Simulate reply action
  const handleSendReply = () => {
    const replyTextArea = document.getElementById(
      "reply-text"
    ) as HTMLTextAreaElement | null;
    if (replyTextArea) {
      console.log("Reply sent:", replyTextArea.value);
      replyTextArea.value = "";
    }
  };

  // Simulate call request actions
  const handleAcceptCall = (id: number) =>
    console.log(`Accepted call request ${id}`);
  const handleRejectCall = (id: number) =>
    console.log(`Rejected call request ${id}`);

  // Toggle hamburger menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
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

        {/* Messages and Calls Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Messages List (Sidebar) */}
            <div
              className={`bg-white rounded shadow p-4 ${
                isMobileMessageView ? "hidden md:block" : "block"
              }`}
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-blue-500" />{" "}
                Messages
              </h2>
              <div className="mb-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 pl-10 border rounded focus:ring-blue-500 focus:border-blue-500"
                    aria-label="Search messages"
                  />
                </div>
              </div>
              <ul className="space-y-2">
                {filteredMessages.length === 0 ? (
                  <li className="text-gray-500">No messages found.</li>
                ) : (
                  filteredMessages.map((msg) => (
                    <li
                      key={msg.id}
                      onClick={() => handleSelectMessage(msg)}
                      className={`p-3 rounded cursor-pointer hover:bg-blue-100 ${
                        selectedMessage?.id === msg.id ? "bg-blue-200" : ""
                      } ${msg.unread ? "font-semibold" : ""}`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">{msg.client}</p>
                          <p className="text-xs text-gray-500 truncate">
                            {msg.subject}
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
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Message View and Call Requests (Main Panel) */}
            <div
              className={`md:col-span-2 bg-white rounded shadow p-4 ${
                isMobileMessageView ? "block" : "hidden md:block"
              }`}
            >
              {isMobileMessageView && (
                <button
                  onClick={() => setIsMobileMessageView(false)}
                  className="mb-4 text-blue-500 hover:underline"
                  aria-label="Back to messages list"
                >
                  Back to Messages
                </button>
              )}
              {selectedMessage ? (
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Message from {selectedMessage.client}
                  </h2>
                  <div className="border-b pb-4 mb-4">
                    <p className="text-sm font-medium">
                      {selectedMessage.subject}
                    </p>
                    <p className="text-xs text-gray-400">
                      {selectedMessage.timestamp}
                    </p>
                    <p className="mt-2 text-sm">{selectedMessage.text}</p>
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
                <div className="text-gray-500 text-center">
                  Select a message to view details.
                </div>
              )}

              {/* Call Requests */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <PhoneIcon className="h-5 w-5 mr-2 text-blue-500" /> Call
                  Requests
                </h2>
                {callRequests.length === 0 ? (
                  <p className="text-gray-500">No pending call requests.</p>
                ) : (
                  <ul className="space-y-4">
                    {callRequests.map((call) => (
                      <li
                        key={call.id}
                        className="p-4 border rounded flex justify-between items-center"
                      >
                        <div>
                          <p className="text-sm font-medium text-black">
                            {call.client}
                          </p>
                          <p className="text-xs text-gray-500">
                            Requested: {call.time}
                          </p>
                        </div>
                        <div className="space-x-2">
                          <button
                            onClick={() => handleAcceptCall(call.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectCall(call.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
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
