"use client";
import React, { useState } from "react";

// Example data types
type Conversation = {
  id: string;
  lawyerName: string;
  lastMessage: string;
  unread: boolean;
  timestamp: string;
};

type Message = {
  id: string;
  sender: "user" | "lawyer";
  content: string;
  timestamp: string;
};

type Call = {
  id: string;
  lawyerName: string;
  scheduledAt: string;
  status: "upcoming" | "completed" | "missed";
};

const exampleConversations: Conversation[] = [
  {
    id: "1",
    lawyerName: "Jane Doe",
    lastMessage: "Your documents are ready.",
    unread: true,
    timestamp: "2025-06-10 10:30",
  },
  {
    id: "2",
    lawyerName: "Kwame Mensah",
    lastMessage: "Let's schedule a call.",
    unread: false,
    timestamp: "2025-06-09 15:20",
  },
];

const exampleMessages: Message[] = [
  {
    id: "m1",
    sender: "lawyer",
    content: "Hello, how can I assist you today?",
    timestamp: "2025-06-10 10:00",
  },
  {
    id: "m2",
    sender: "user",
    content: "I need help with a land dispute.",
    timestamp: "2025-06-10 10:01",
  },
];

const exampleCalls: Call[] = [
  {
    id: "c1",
    lawyerName: "Jane Doe",
    scheduledAt: "2025-06-12 14:00",
    status: "upcoming",
  },
  {
    id: "c2",
    lawyerName: "Kwame Mensah",
    scheduledAt: "2025-06-08 11:00",
    status: "completed",
  },
];

export default function UserMessageCall() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(exampleConversations[0]?.id || null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(exampleMessages);
  const [showCallModal, setShowCallModal] = useState(false);

  // Simulate sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m${prev.length + 1}`,
        sender: "user",
        content: messageInput,
        timestamp: new Date().toLocaleString(),
      },
    ]);
    setMessageInput("");
  };

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
            {exampleConversations.map((conv) => (
              <li
                key={conv.id}
                className={`p-3 rounded cursor-pointer mb-2 transition-colors ${
                  selectedConversation === conv.id
                    ? "bg-[#F9A825]/20 border-l-4 border-[#F9A825]"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedConversation(conv.id)}
                aria-current={selectedConversation === conv.id}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#1A237E]">
                    {conv.lawyerName}
                  </span>
                  {conv.unread && (
                    <span
                      className="ml-2 inline-block w-2 h-2 rounded-full bg-[#F9A825]"
                      aria-label="unread message"
                    ></span>
                  )}
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {conv.lastMessage}
                </div>
                <div className="text-xs text-gray-400">{conv.timestamp}</div>
              </li>
            ))}
          </ul>
        </section>
        {/* Calls */}
        <section>
          <h2 className="text-lg font-semibold text-[#1A237E] mb-4">Calls</h2>
          <ul>
            {exampleCalls.map((call) => (
              <li key={call.id} className="mb-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#1A237E]">
                    {call.lawyerName}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      call.status === "upcoming"
                        ? "bg-[#F9A825]/20 text-[#F9A825]"
                        : call.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{call.scheduledAt}</div>
              </li>
            ))}
          </ul>
          <button
            className="mt-2 w-full bg-[#F9A825] text-[#1A237E] font-semibold py-2 rounded hover:bg-[#F9A825]/90 transition"
            onClick={() => setShowCallModal(true)}
            aria-label="Request a call"
          >
            Request a Call
          </button>
        </section>
      </aside>

      {/* Main Panel: Chat */}
      <section className="flex-1 flex flex-col h-[80vh]">
        {/* Lawyer Info Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#1A237E]">
              {exampleConversations.find((c) => c.id === selectedConversation)
                ?.lawyerName || "Select a conversation"}
            </h3>
            <span className="text-sm text-gray-500">
              {/* Placeholder for lawyer specialization or status */}
              Legal Practitioner
            </span>
          </div>
          <button
            className="bg-[#F9A825] text-[#1A237E] px-4 py-2 rounded font-medium hover:bg-[#F9A825]/90 transition"
            onClick={() => setShowCallModal(true)}
            aria-label="Schedule a call"
          >
            Schedule Call
          </button>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F7F9FC]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                  msg.sender === "user"
                    ? "bg-[#F9A825] text-[#1A237E] rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
                aria-label={
                  msg.sender === "user" ? "Your message" : "Lawyer message"
                }
              >
                <div className="text-sm">{msg.content}</div>
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form
          className="bg-white border-t border-gray-200 p-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded   text-gray-600 bg-focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
            aria-label="Type your message"
          />
          <button
            type="submit"
            className="bg-[#1A237E] text-white px-4 py-2 rounded hover:bg-[#3949ab] transition"
            aria-label="Send message"
          >
            Send
          </button>
        </form>
      </section>

      {/* Call Modal (simple placeholder) */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-[#1A237E]">
              Request a Call
            </h2>
            <p className="mb-4 text-gray-700">
              A lawyer will contact you at your preferred time.
            </p>
            <button
              className="w-full bg-[#F9A825] text-[#1A237E] font-semibold py-2 rounded hover:bg-[#F9A825]/90 transition mb-2"
              onClick={() => setShowCallModal(false)}
              aria-label="Close call modal"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
