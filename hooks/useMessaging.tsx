import { useState, useEffect, useCallback } from 'react';
import { apiClient, MessageData, SendMessageRequest } from '../src/lib/api';
import { useAuth } from '../src/contexts/AuthContext';

export interface Chat {
  id: string;
  participants: string[];
  participantNames: { [key: string]: string };
  lastMessage?: MessageData;
  unreadCount: number;
}

export interface UseMessagingReturn {
  currentUserId: string | undefined;
  chats: Chat[];
  selectedChat: Chat | null;
  messages: MessageData[];
  isLoading: boolean;
  error: string | null;
  selectChat: (chat: Chat) => Promise<void>;
  sendTextMessage: (content: string) => Promise<void>;
  markMessageAsRead: (messageId: string) => Promise<void>;
  formatMessageTime: (timestamp: string) => string;
  getUnreadCountForChat: (chat: Chat) => number;
  createChat: (userId: string, userName: string) => Chat | null;
  loadConversation: (senderId: string, receiverId: string) => Promise<void>;
}

export const useMessaging = (userRole: string = "LAWYER"): UseMessagingReturn => {
  const { user } = useAuth();
  const currentUserId = user?.id;
  
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Send a text message
  const sendTextMessage = useCallback(async (content: string) => {
    if (!selectedChat || !currentUserId || !content.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Find the other participant
      const receiverId = selectedChat.participants.find(p => p !== currentUserId);
      if (!receiverId) {
        throw new Error('No recipient found');
      }

      const messageData: SendMessageRequest = {
        receiverId: receiverId,
        content: content.trim()
      };

      console.log('🔍 Debug - Message data being sent:', {
        currentUserId,
        receiverId,
        userRole,
        messageData
      });

      const response = await apiClient.sendMessage(messageData);
      
      if (response.success && response.data) {
        // Add the new message to the current conversation
        setMessages(prev => [...prev, response.data!]);
        
        // Update the chat's last message
        setSelectedChat(prev => prev ? {
          ...prev,
          lastMessage: response.data!
        } : null);
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedChat, currentUserId]);

  // Load conversation between two users
  const loadConversation = useCallback(async (senderId: string, receiverId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiClient.getConversation(senderId, receiverId);
      
      if (response.success && response.data) {
        setMessages(response.data);
      } else {
        throw new Error(response.message || 'Failed to load conversation');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load conversation';
      setError(errorMessage);
      console.error('Error loading conversation:', err);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Select a chat and load its messages
  const selectChat = useCallback(async (chat: Chat) => {
    setSelectedChat(chat);
    
    if (currentUserId) {
      const otherParticipant = chat.participants.find(p => p !== currentUserId);
      if (otherParticipant) {
        await loadConversation(currentUserId, otherParticipant);
      }
    }
  }, [currentUserId, loadConversation]);

  // Create a new chat with a user
  const createChat = useCallback((userId: string, userName: string): Chat => {
    if (!currentUserId) {
      throw new Error('Current user ID is required');
    }

    return {
      id: `${currentUserId}-${userId}`,
      participants: [currentUserId, userId],
      participantNames: {
        [currentUserId]: 'You',
        [userId]: userName
      },
      unreadCount: 0
    };
  }, [currentUserId]);

  // Format message timestamp
  const formatMessageTime = useCallback((timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  }, []);

  // Get unread count for a chat
  const getUnreadCountForChat = useCallback((chat: Chat) => {
    return chat.unreadCount || 0;
  }, []);

  // Mark message as read (placeholder for future implementation)
  const markMessageAsRead = useCallback(async (messageId: string) => {
    // This could be implemented as an API call to mark messages as read
    console.log('Marking message as read:', messageId);
  }, []);

  return {
    currentUserId,
    chats,
    selectedChat,
    messages,
    isLoading,
    error,
    selectChat,
    sendTextMessage,
    markMessageAsRead,
    formatMessageTime,
    getUnreadCountForChat,
    createChat,
    loadConversation
  };
};
