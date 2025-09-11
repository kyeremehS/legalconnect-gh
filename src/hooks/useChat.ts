import { useState, useEffect, useCallback } from "react";
// Only import socket.io-client on client side
let io: any = null;
if (typeof window !== "undefined") {
  io = require("socket.io-client");
}
import { apiClient, MessageData, SendMessageRequest } from "../lib/api";

// Define a chat type
interface Chat {
    id: string;
    participants: string[];
    participantNames: Record<string, string>;
    lastMessage?: MessageData;
    unreadCount: number;
}

let socket: any = null;

export const useChat = (
    currentUserId?: string,
    userRole: "CLIENT" | "LAWYER" = "CLIENT"
) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Connect socket on mount
    useEffect(() => {
        if (!currentUserId || typeof window === "undefined" || !io) return;

        // Always create a new socket for each user
        socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000", {
            query: { userId: currentUserId, role: userRole }
        });

        if (socket) {
            socket.on("newMessage", (message: MessageData) => {
                setMessages((prev) => [...prev, message]);
                setChats((prev) =>
                    prev.map((chat) =>
                        chat.id === `${message.senderId}-${message.receiverId}`
                            ? { ...chat, lastMessage: message }
                            : chat
                    )
                );
            });
        }

        return () => {
            if (socket) {
                socket.off("newMessage");
                socket.disconnect();
                socket = null;
            }
        };
    }, [currentUserId, userRole]);

    // Send a message
    const sendMessage = useCallback(
        async (content: string, type: "message" | "call-request" = "message") => {
            if (!selectedChat || !currentUserId || !content.trim()) return;

            try {
                setIsLoading(true);
                setError(null);

                const receiverId = selectedChat.participants.find((p) => p !== currentUserId);
                if (!receiverId) throw new Error("No recipient found");

                // If SendMessageRequest does not have 'type', remove it from here
                const messageData: SendMessageRequest = {
                    receiverId,
                    content: content.trim(),
                    // type // Remove this line if not in SendMessageRequest
                };

                const response = await apiClient.sendMessage(messageData);

                if (response.success && response.data) {
                    setMessages((prev) => [...prev, response.data as MessageData]);
                    setSelectedChat((prev) =>
                        prev ? { ...prev, lastMessage: response.data as MessageData } : null
                    );
                } else {
                    throw new Error(response.message || "Failed to send message");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to send message");
            } finally {
                setIsLoading(false);
            }
        },
        [selectedChat, currentUserId]
    );

    // Load conversation
    const loadConversation = useCallback(async (senderId: string, receiverId: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await apiClient.getConversation(senderId, receiverId);

            if (response.success && response.data) {
                setMessages(response.data);
            } else {
                throw new Error(response.message || "Failed to load conversation");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load conversation");
            setMessages([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Select a chat
    const selectChat = useCallback(
        async (chat: Chat) => {
            setSelectedChat(chat);
            if (currentUserId) {
                const otherParticipant = chat.participants.find((p) => p !== currentUserId);
                if (otherParticipant) {
                    await loadConversation(currentUserId, otherParticipant);
                }
            }
        },
        [currentUserId, loadConversation]
    );

    // Create a new chat
    const createChat = useCallback(
        (userId: string, userName: string): Chat => {
            if (!currentUserId) throw new Error("Current user ID is required");

            return {
                id: `${currentUserId}-${userId}`,
                participants: [currentUserId, userId],
                participantNames: {
                    [currentUserId]: "You",
                    [userId]: userName
                },
                unreadCount: 0
            };
        },
        [currentUserId]
    );

    return {
        chats,
        selectedChat,
        messages,
        isLoading,
        error,
        sendMessage,
        sendCallRequest: (lawyerId: string) => sendMessage("Requesting a call", "call-request"),
        selectChat,
        createChat,
        loadConversation
    };
};
