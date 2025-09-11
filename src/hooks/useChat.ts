import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { apiClient, MessageData, SendMessageRequest } from "../lib/api";

let socket: Socket | null = null;

export const useChat = (currentUserId?: string, userRole: "CLIENT" | "LAWYER" = "CLIENT") => {
    const [chats, setChats] = useState<any[]>([]);
    const [selectedChat, setSelectedChat] = useState<any | null>(null);
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ✅ Connect socket on mount
    useEffect(() => {
        if (!currentUserId) return;

        if (!socket) {
            socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", {
                query: { userId: currentUserId, role: userRole }
            });
        }

        // Listen for new messages
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

        return () => {
            socket?.off("newMessage");
        };
    }, [currentUserId, userRole]);

    // ✅ Send a message
    const sendMessage = useCallback(
        async (content: string, type: "message" | "call-request" = "message") => {
            if (!selectedChat || !currentUserId || !content.trim()) return;

            try {
                setIsLoading(true);
                setError(null);

                const receiverId = selectedChat.participants.find((p: string) => p !== currentUserId);
                if (!receiverId) throw new Error("No recipient found");

                const messageData: SendMessageRequest = {
                    receiverId,
                    content: content.trim(),
                    messageType: type
                };

                const response = await apiClient.sendMessage(messageData);

                if (response.success && response.data) {
                    setMessages((prev) => [...prev, response.data!]);
                    setSelectedChat((prev) =>
                        prev ? { ...prev, lastMessage: response.data! } : null
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

    // ✅ Load conversation
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

    // ✅ Select a chat
    const selectChat = useCallback(
        async (chat: any) => {
            setSelectedChat(chat);
            if (currentUserId) {
                const otherParticipant = chat.participants.find((p: string) => p !== currentUserId);
                if (otherParticipant) {
                    await loadConversation(currentUserId, otherParticipant);
                }
            }
        },
        [currentUserId, loadConversation]
    );

    // ✅ Create a new chat
    const createChat = useCallback(
        (userId: string, userName: string) => {
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
        sendMessage,       // ✅ use sendMessage(content, "message")
        sendCallRequest: (lawyerId: string) => sendMessage("Requesting a call", "call-request"),
        selectChat,
        createChat,
        loadConversation
    };
};
