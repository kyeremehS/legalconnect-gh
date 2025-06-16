"use client";
import React, { useState, useEffect, useRef } from "react";

// Example data
const conversations = [
  {
    id: "1",
    name: "Kofi Mensah",
    avatar: "",
    lastMessage: "Thank you for your help!",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Abena Owusu",
    avatar: "",
    lastMessage: "Can we reschedule our call?",
    unread: 0,
    online: false,
  },
];

const messages = [
  {
    id: 1,
    fromLawyer: false,
    text: "Hello, I need legal advice.",
    time: "10:01 AM",
  },
  {
    id: 2,
    fromLawyer: true,
    text: "Sure, how can I help you?",
    time: "10:02 AM",
  },
  {
    id: 3,
    fromLawyer: false,
    text: "It's about a land dispute.",
    time: "10:03 AM",
  },
];

export default function MessagesCalls() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [input, setInput] = useState("");
  const [chat, setChat] = useState(messages);
  const [callStatus, setCallStatus] = useState<"idle" | "incoming" | "active">(
    "idle"
  );
  const [callDuration, setCallDuration] = useState(0);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Simulate call duration
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callStatus === "active") {
      timer = setInterval(() => setCallDuration((d) => d + 1), 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  // Handle sending a message
  const handleSend = () => {
    if (input.trim()) {
      setChat([
        ...chat,
        {
          id: chat.length + 1,
          fromLawyer: true,
          text: input,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setInput("");
    }
  };

  // Format call duration
  const formatDuration = (seconds: number) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <main className="min-h-screen bg-[#F7F9FC] flex flex-col items-center py-0 md:py-8">
      <div className="w-full max-w-5xl h-[90vh] bg-white rounded-xl shadow flex overflow-hidden">
        {/* Sidebar: Conversation List */}
        <aside className="hidden md:flex flex-col w-1/3 bg-[#F9A825]/10 border-r border-[#F9A825]/30">
          <div className="p-4 border-b border-[#F9A825]/20">
            <h2 className="text-lg font-bold text-[#1A237E]">Chats</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                className={`w-full flex items-center gap-3 px-4 py-3 transition text-left border-b border-[#F9A825]/10
                  ${
                    selectedConversation.id === conv.id
                      ? "bg-[#F9A825]/20"
                      : "hover:bg-[#F9A825]/10"
                  }`}
                onClick={() => setSelectedConversation(conv)}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#F9A825]/40 text-[#1A237E] flex items-center justify-center font-bold text-lg">
                    {conv.avatar ? (
                      <img
                        src={conv.avatar}
                        alt={conv.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      conv.name[0]
                    )}
                  </div>
                  {/* Online/Offline Dot */}
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      conv.online ? "bg-green-400" : "bg-gray-400"
                    }`}
                    title={conv.online ? "Online" : "Offline"}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-700">{conv.name}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {conv.lastMessage}
                  </div>
                </div>
                {/* Unread Badge */}
                {conv.unread > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Chat/Call Area */}
        <section className="flex-1 flex flex-col h-full bg-[#F7F9FC]">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#F9A825]/20 border-b border-[#F9A825]/30">
            <div className="w-10 h-10 rounded-full bg-[#F9A825]/40 text-[#1A237E] flex items-center justify-center font-bold text-lg">
              {selectedConversation.avatar ? (
                <img
                  src={selectedConversation.avatar}
                  alt={selectedConversation.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                selectedConversation.name[0]
              )}
            </div>
            <div>
              <div className="font-semibold text-gray-700">
                {selectedConversation.name}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <span
                  className={`w-2 h-2 rounded-full inline-block ${
                    selectedConversation.online ? "bg-green-400" : "bg-gray-400"
                  }`}
                />
                {selectedConversation.online ? "Online" : "Offline"}
              </div>
            </div>
            {/* Call Button */}
            <button
              type="button"
              className="ml-auto bg-gradient-to-r from-[#F9A825] to-[#FFD600] text-[#1A237E] px-4 py-2 rounded-full font-semibold shadow hover:from-[#FFD600] hover:to-[#F9A825] hover:scale-105 transition flex items-center gap-2"
              onClick={() => setCallStatus("incoming")}
              aria-label="Start Call"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 5l7 7-7 7M22 12H3"
                />
              </svg>
              Call
            </button>
          </div>

          {/* Call Controls */}
          {callStatus === "incoming" && (
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="text-lg font-bold text-[#1A237E] mb-4">
                Incoming Call...
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <button
                  type="button"
                  className="bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700 transition"
                  aria-label="Accept Call"
                  onClick={() => setCallStatus("active")}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="bg-red-600 text-white font-semibold px-6 py-2 rounded hover:bg-red-700 transition"
                  aria-label="Decline Call"
                  onClick={() => setCallStatus("idle")}
                >
                  Decline
                </button>
              </div>
            </div>
          )}

          {callStatus === "active" && (
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="text-lg font-bold text-[#1A237E] mb-2">
                Call in Progress
              </div>
              <div className="text-gray-700 mb-4">
                Duration: {formatDuration(callDuration)}
              </div>
              <button
                type="button"
                className="bg-red-600 text-white font-semibold px-6 py-2 rounded hover:bg-red-700 transition"
                aria-label="End Call"
                onClick={() => setCallStatus("idle")}
              >
                End Call
              </button>
            </div>
          )}

          {/* Chat Area */}
          {callStatus === "idle" && (
            <>
              {/* IDEA 2: Sticky Input Bar */}
              <div className="flex-1 overflow-y-auto px-2 md:px-8 py-4 flex flex-col gap-2 md:gap-3">
                {chat.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.fromLawyer ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl shadow
                        ${
                          msg.fromLawyer
                            ? "bg-[#F9A825] text-[#1A237E] rounded-br-none"
                            : "bg-white text-gray-700 rounded-bl-none"
                        }`}
                    >
                      {msg.text}
                      <div
                        className={`text-xs mt-1 ${
                          msg.fromLawyer
                            ? "text-[#1A237E] text-right"
                            : "text-gray-400"
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              {/* Sticky Input Bar at the bottom */}
              <form
                className="sticky bottom-0 bg-[#F9A825]/10 border-t border-[#F9A825]/20 p-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <input
                  type="text"
                  className="flex-1 border border-[#F9A825]/30 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F9A825] bg-white"
                  placeholder="Type a message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  aria-label="Type your message"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#F9A825] to-[#FFD600] text-[#1A237E] px-5 py-2 rounded-full font-semibold shadow hover:from-[#FFD600] hover:to-[#F9A825] hover:scale-105 transition flex items-center gap-2"
                  aria-label="Send message"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Send
                </button>
              </form>
            </>
          )}
        </section>
      </div>
      {/* Mobile conversation list */}
      <div className="md:hidden w-full max-w-5xl mt-2">
        <div className="flex overflow-x-auto gap-2 px-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              type="button"
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition
                ${
                  selectedConversation.id === conv.id
                    ? "bg-[#F9A825]/20"
                    : "hover:bg-[#F9A825]/10"
                }`}
              onClick={() => setSelectedConversation(conv)}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#F9A825]/40 text-[#1A237E] flex items-center justify-center font-bold text-lg">
                  {conv.avatar ? (
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    conv.name[0]
                  )}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    conv.online ? "bg-green-400" : "bg-gray-400"
                  }`}
                  title={conv.online ? "Online" : "Offline"}
                />
              </div>
              <span className="text-xs font-semibold text-[#1A237E]">
                {conv.name.split(" ")[0]}
              </span>
              {conv.unread > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
