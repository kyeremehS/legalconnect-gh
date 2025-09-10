import { useState, useEffect, useCallback } from 'react';
import { apiClient, MessageData, SendMessageRequest } from '../src/lib/api';
import { useAuth } from '../src/contexts/AuthContext';

export interface Chat {
  id: string;
  participants: string[];
  participantNames: { [key: string]: string };
  lastMessage?: MessageData;
  unreadCount: number;
  // Additional fields for lawyer message calls
  hasActiveCallRequest?: boolean;
  callRequestCount?: number;
  messageCount?: number;
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
  loadUserConversations: () => Promise<void>;
}

export const useMessaging = (userRole: string = "LAWYER"): UseMessagingReturn => {
  const { user } = useAuth();
  const currentUserId = user?.id;
  
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all conversations for the current user
  const loadUserConversations = useCallback(async () => {
    console.log('🔍 loadUserConversations called - currentUserId:', currentUserId, 'userRole:', userRole);
    if (!currentUserId) {
      console.log('❌ No currentUserId, skipping conversation load');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      let response;
      
      // Use different API endpoints based on user role
      if (userRole === "LAWYER") {
        console.log('📡 Making API call to getLawyerMessageCalls for lawyer...');
        response = await apiClient.getLawyerMessageCalls();
        
        if (response.success && response.data) {
          console.log('Loaded lawyer message calls:', response.data);
          // Transform API response for lawyer message calls
          const transformedChats: Chat[] = response.data.map((item: any) => ({
            id: `${currentUserId}-${item.clientId}`,
            participants: [currentUserId, item.clientId],
            participantNames: {
              [currentUserId]: 'You',
              [item.clientId]: `${item.client.firstName} ${item.client.lastName}`
            },
            lastMessage: item.latestMessage,
            unreadCount: 0, // Could be calculated based on message status
            hasActiveCallRequest: item.hasActiveCallRequest || false,
            callRequestCount: item.callRequestCount || 0,
            messageCount: item.messageCount || 0
          }));

          setChats(transformedChats);
          console.log('Transformed lawyer chats:', transformedChats);
        } else {
          console.log('No message calls found or API error:', response.message);
        }
      } else {
        console.log('📡 Making API call to getUserConversations for regular user...');
        response = await apiClient.getUserConversations();
        
        if (response.success && response.data) {
          console.log('Loaded conversations:', response.data);
          // Transform API response to Chat format
          const transformedChats: Chat[] = response.data.map((conversation: any) => ({
            id: `${currentUserId}-${conversation.participantId}`,
            participants: [currentUserId, conversation.participantId],
            participantNames: {
              [currentUserId]: 'You',
              [conversation.participantId]: `${conversation.participant.firstName} ${conversation.participant.lastName}`
            },
            lastMessage: conversation.lastMessage,
            unreadCount: 0 // Could be calculated from messages
          }));

          setChats(transformedChats);
          console.log('Transformed chats:', transformedChats);
        } else {
          console.log('No conversations found or API error:', response.message);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load conversations';
      setError(errorMessage);
      console.error('Error loading conversations:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentUserId, userRole]);

  // Load user conversations when component mounts
  useEffect(() => {
    console.log('🔄 useMessaging: useEffect triggered:', { currentUserId, userRole, user });
    if (currentUserId) {
      console.log('✅ useMessaging: CurrentUserId found, loading conversations for user:', currentUserId);
      loadUserConversations();
    } else {
      console.log('❌ useMessaging: No currentUserId, skipping conversation load');
    }
  }, [currentUserId, loadUserConversations]);

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

      console.log('Sending message:', { receiverId, content, userRole });

      const messageData: SendMessageRequest = {
        receiverId: receiverId,
        content: content.trim()
      };

      const response = await apiClient.sendMessage(messageData);
      
      if (response.success && response.data) {
        // Add the new message to the current conversation
        setMessages(prev => [...prev, response.data!]);
        
        // Update the chat's last message
        setSelectedChat(prev => prev ? {
          ...prev,
          lastMessage: response.data!
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
  }, [selectedChat, currentUserId]);

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
    
    if (currentUserId) {
      const otherParticipant = chat.participants.find(p => p !== currentUserId);
      if (otherParticipant) {
        await loadConversation(currentUserId, otherParticipant);
      }
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
    loadConversation,
    loadUserConversations
  };
};
