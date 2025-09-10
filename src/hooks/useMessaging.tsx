import { useState, useEffect, useCallback } from 'react';
import { apiClient, MessageData, SendMessageRequest } from '../lib/api';

export interface Chat {
  id: string;
  participants: string[];
  participantNames: { [key: string]: string };
  lastMessage?: MessageData;
  unreadCount: number;
}

export const useMessaging = (currentUserId?: string, userRole: string = "LAWYER") => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Early return if no user is authenticated
  useEffect(() => {
    if (!currentUserId) {
      setError("Please log in to access messaging");
      return;
    }
    setError(null);
  }, [currentUserId]);

  // Send a text message
  const sendTextMessage = useCallback(async (content: string) => {
    if (!selectedChat || !currentUserId || !content.trim()) {
      setError("Unable to send message. Please ensure you're logged in and have selected a chat.");
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
        senderId: currentUserId,
        receiverId: receiverId,
        senderRole: userRole,
        content: content.trim()
      };

      console.log('Sending message with data:', messageData);
      const response = await apiClient.sendMessage(messageData);
      console.log('Send message response:', response);
      
      // Check if response has success field OR if it looks like a message object directly
      if (response.success && response.data) {
        // Standard wrapped response format
        const messageObject = response.data;
        
        // Add the new message to the current conversation
        setMessages(prev => [...prev, messageObject]);
        
        // Update the chat's last message
        setSelectedChat(prev => prev ? {
          ...prev,
          lastMessage: messageObject
        } : null);
        
        console.log('✅ Message sent successfully');
      } else if ((response as any).id && (response as any).content) {
        // Direct message object response (fallback)
        const messageObject = response as any as MessageData;
        
        // Add the new message to the current conversation
        setMessages(prev => [...prev, messageObject]);
        
        // Update the chat's last message
        setSelectedChat(prev => prev ? {
          ...prev,
          lastMessage: messageObject
        } : null);
        
        console.log('✅ Message sent successfully (direct format)');
      } else {
        console.error('API returned unsuccessful response:', response);
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      console.error('Error sending message:', err);
      console.error('Current user ID:', currentUserId);
      console.error('Selected chat:', selectedChat);
    } finally {
      setIsLoading(false);
    }
  }, [selectedChat, currentUserId, userRole]);

  // Load conversation between two users
  const loadConversation = useCallback(async (senderId: string, receiverId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate that we have valid user IDs
      if (!senderId || !receiverId) {
        console.warn('Invalid user IDs for conversation:', { senderId, receiverId });
        setMessages([]);
        return;
      }

      console.log('Loading conversation between:', senderId, 'and', receiverId);
      const response = await apiClient.getConversation(senderId, receiverId);
      
      if (response.success && response.data) {
        setMessages(response.data);
        console.log('Loaded messages:', response.data.length);
      } else {
        console.warn('No conversation found or API error:', response.message);
        // Don't throw error for empty conversations, just set empty messages
        setMessages([]);
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
    
    if (!currentUserId) {
      console.warn('No current user ID available');
      setError('User not authenticated');
      return;
    }
    
    const otherParticipant = chat.participants.find(p => p !== currentUserId);
    if (otherParticipant) {
      console.log('Selecting chat with:', otherParticipant);
      await loadConversation(currentUserId, otherParticipant);
    } else {
      console.warn('No other participant found in chat');
    }
  }, [currentUserId, loadConversation]);

  // Create a new chat with a user
  const createChat = useCallback((userId: string, userName: string): Chat | null => {
    if (!currentUserId) {
      console.warn('Cannot create chat: Current user ID is required');
      return null;
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
