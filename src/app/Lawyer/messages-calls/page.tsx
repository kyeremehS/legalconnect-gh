"use client";
import { use, useState } from "react";
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
            href="/lawyer/appointments"
            onClick={toggleMenu}
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Appointments
          </Link>
          <Link
            href="/lawyer/messages"
            onClick={toggleMenu}
            className="block p-2 bg-blue-700 rounded"
          >
            Messages & Calls
          </Link>
          <Link
            href="/lawyer/videos"
            onClick={toggleMenu}
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Videos
          </Link>
          <Link
            href="/lawyer/engagement"
            onClick={toggleMenu}
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Engagement
          </Link>
          <Link
            href="/lawyer/profile"
            onClick={toggleMenu}
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Profile
          </Link>
          <Link
            href="/lawyer/settings"
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
              <h2 className="text-lg text-[#343a40] font-semibold mb-4 flex items-center">
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
                    className="w-full p-2 pl-10 border rounded focus:ring-blue-500 focus:border-blue-500 text-gray-800"
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
                          <p className="text-sm text-[#343a40] font-medium">
                            {msg.client}
                          </p>
                          <p className="text-xs text-gray-800 truncate">
                            {msg.subject}
                          </p>
                        </div>
                        <p className="text-xs text-gray-400">{msg.timestamp}</p>
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
                  <h2 className="text-lg text-gray-800 font-semibold mb-4">
                    Message from {selectedMessage.client}
                  </h2>
                  <div className="border-b pb-4 mb-4">
                    <p className="text-sm text-[#343a40] font-medium">
                      {selectedMessage.subject}
                    </p>
                    <p className="text-xs text-gray-400">
                      {selectedMessage.timestamp}
                    </p>
                    <p className="mt-2 text-[#343a40] text-sm">
                      {selectedMessage.text}
                    </p>
                  </div>
                  <div className="text-[#343a40] font-medium mb-2">
                    <textarea
                      id="reply-text"
                      placeholder="Type your reply..."
                      className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      aria-label="Reply to message"
                    />
                    <button
                      onClick={handleSendReply}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-center">
                  Select a message to view details.
                </div>
              )}

              {/* Call Requests */}
              <div className="mt-6">
                <h2 className="text-lg text-[#343a40] font-semibold mb-4 flex items-center">
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
                          <p className="text-sm text-[#343a40] font-medium">
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
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 text-center">
          <Link href="/help" className="text-blue-500 hover:underline">
            Messaging Guidelines
          </Link>
        </footer>
      </div>
    </div>
  );
}
