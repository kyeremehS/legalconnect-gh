import {
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp,
  Timestamp,
  getDocs,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Timestamp;
  read: boolean;
  messageType: 'text' | 'image' | 'file' | 'voice' | 'video';
  fileUrl?: string;
  fileSize?: number;
  fileName?: string;
}

export interface Chat {
  id: string;
  participants: string[];
  participantNames: { [userId: string]: string };
  lastMessage?: Message;
  lastMessageTime?: Timestamp;
  unreadCount: { [userId: string]: number };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Call {
  id: string;
  chatId: string;
  callerId: string;
  callerName: string;
  receiverId: string;
  receiverName: string;
  callType: 'voice' | 'video';
  status: 'incoming' | 'ongoing' | 'ended' | 'missed' | 'declined';
  startTime?: Timestamp;
  endTime?: Timestamp;
  duration?: number; // in seconds
  createdAt: Timestamp;
}

export interface SignalingData {
  type: 'offer' | 'answer' | 'ice-candidate' | 'call-request' | 'call-accept' | 'call-decline' | 'call-end';
  from: string;
  to: string;
  data: any;
  timestamp: Timestamp;
}

// Chat Functions
export const createChat = async (participants: string[], participantNames: { [userId: string]: string }): Promise<string> => {
  try {
    const chatData: Omit<Chat, 'id'> = {
      participants,
      participantNames,
      unreadCount: {},
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };

    // Initialize unread count for all participants
    participants.forEach(participantId => {
      chatData.unreadCount[participantId] = 0;
    });

    const docRef = await addDoc(collection(db, 'chats'), chatData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
};

export const sendMessage = async (
  chatId: string,
  senderId: string,
  senderName: string,
  content: string,
  messageType: Message['messageType'] = 'text',
  fileUrl?: string,
  fileSize?: number,
  fileName?: string
): Promise<string> => {
  try {
    const messageData: Omit<Message, 'id'> = {
      chatId,
      senderId,
      senderName,
      content,
      timestamp: serverTimestamp() as Timestamp,
      read: false,
      messageType,
      fileUrl,
      fileSize,
      fileName,
    };

    const docRef = await addDoc(collection(db, 'messages'), messageData);

    // Update chat's last message and unread count
    const chatRef = doc(db, 'chats', chatId);
    const chatDoc = await getDoc(chatRef);
    
    if (chatDoc.exists()) {
      const chatData = chatDoc.data() as Chat;
      const updatedUnreadCount = { ...chatData.unreadCount };
      
      // Increment unread count for all participants except sender
      chatData.participants.forEach(participantId => {
        if (participantId !== senderId) {
          updatedUnreadCount[participantId] = (updatedUnreadCount[participantId] || 0) + 1;
        }
      });

      await updateDoc(chatRef, {
        lastMessage: messageData,
        lastMessageTime: messageData.timestamp,
        unreadCount: updatedUnreadCount,
        updatedAt: serverTimestamp(),
      });
    }

    return docRef.id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const listenForMessages = (
  chatId: string,
  callback: (messages: Message[]) => void,
  limitCount: number = 50
) => {
  const q = query(
    collection(db, 'messages'),
    where('chatId', '==', chatId),
    orderBy('timestamp', 'desc'),
    limit(limitCount)
  );

  return onSnapshot(q, (snapshot) => {
    const messages: Message[] = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as Message);
    });
    // Reverse to get chronological order
    callback(messages.reverse());
  });
};

export const markAsRead = async (messageId: string, userId: string): Promise<void> => {
  try {
    const messageRef = doc(db, 'messages', messageId);
    const messageDoc = await getDoc(messageRef);
    
    if (messageDoc.exists()) {
      const messageData = messageDoc.data() as Message;
      
      // Only mark as read if the user is not the sender
      if (messageData.senderId !== userId) {
        await updateDoc(messageRef, { read: true });
        
        // Update chat's unread count
        const chatRef = doc(db, 'chats', messageData.chatId);
        const chatDoc = await getDoc(chatRef);
        
        if (chatDoc.exists()) {
          const chatData = chatDoc.data() as Chat;
          const updatedUnreadCount = { ...chatData.unreadCount };
          
          if (updatedUnreadCount[userId] > 0) {
            updatedUnreadCount[userId] -= 1;
            await updateDoc(chatRef, { unreadCount: updatedUnreadCount });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

export const markChatAsRead = async (chatId: string, userId: string): Promise<void> => {
  try {
    const chatRef = doc(db, 'chats', chatId);
    const chatDoc = await getDoc(chatRef);
    
    if (chatDoc.exists()) {
      const chatData = chatDoc.data() as Chat;
      const updatedUnreadCount = { ...chatData.unreadCount };
      updatedUnreadCount[userId] = 0;
      
      await updateDoc(chatRef, { unreadCount: updatedUnreadCount });
    }
  } catch (error) {
    console.error('Error marking chat as read:', error);
    throw error;
  }
};

// Chat Management
export const getUserChats = (userId: string, callback: (chats: Chat[]) => void) => {
  const q = query(
    collection(db, 'chats'),
    where('participants', 'array-contains', userId),
    orderBy('updatedAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const chats: Chat[] = [];
    snapshot.forEach((doc) => {
      chats.push({ id: doc.id, ...doc.data() } as Chat);
    });
    callback(chats);
  });
};

// Call Functions
export const initiateCall = async (
  chatId: string,
  callerId: string,
  callerName: string,
  receiverId: string,
  receiverName: string,
  callType: 'voice' | 'video'
): Promise<string> => {
  try {
    const callData: Omit<Call, 'id'> = {
      chatId,
      callerId,
      callerName,
      receiverId,
      receiverName,
      callType,
      status: 'incoming',
      createdAt: serverTimestamp() as Timestamp,
    };

    const docRef = await addDoc(collection(db, 'calls'), callData);
    return docRef.id;
  } catch (error) {
    console.error('Error initiating call:', error);
    throw error;
  }
};

export const updateCallStatus = async (callId: string, status: Call['status'], duration?: number): Promise<void> => {
  try {
    const callRef = doc(db, 'calls', callId);
    const updateData: any = { status };
    
    if (status === 'ongoing') {
      updateData.startTime = serverTimestamp();
    } else if (status === 'ended') {
      updateData.endTime = serverTimestamp();
      if (duration) updateData.duration = duration;
    }
    
    await updateDoc(callRef, updateData);
  } catch (error) {
    console.error('Error updating call status:', error);
    throw error;
  }
};

export const listenForCalls = (userId: string, callback: (calls: Call[]) => void) => {
  const q = query(
    collection(db, 'calls'),
    where('receiverId', '==', userId),
    where('status', '==', 'incoming'),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const calls: Call[] = [];
    snapshot.forEach((doc) => {
      calls.push({ id: doc.id, ...doc.data() } as Call);
    });
    callback(calls);
  });
};

// Signaling for WebRTC
export const sendSignalingData = async (
  from: string,
  to: string,
  type: SignalingData['type'],
  data: any
): Promise<string> => {
  try {
    const signalingData: Omit<SignalingData, 'id'> = {
      type,
      from,
      to,
      data,
      timestamp: serverTimestamp() as Timestamp,
    };

    const docRef = await addDoc(collection(db, 'signaling'), signalingData);
    
    // Auto-delete signaling data after 30 seconds
    setTimeout(async () => {
      try {
        await updateDoc(docRef, { deleted: true });
      } catch (error) {
        console.error('Error deleting signaling data:', error);
      }
    }, 30000);

    return docRef.id;
  } catch (error) {
    console.error('Error sending signaling data:', error);
    throw error;
  }
};

export const listenForSignalingData = (
  userId: string,
  callback: (signalingData: SignalingData) => void
) => {
  const q = query(
    collection(db, 'signaling'),
    where('to', '==', userId),
    where('deleted', '!=', true),
    orderBy('timestamp', 'desc'),
    limit(1)
  );

  return onSnapshot(q, (snapshot) => {
    snapshot.forEach((doc) => {
      const data = { id: doc.id, ...(doc.data() as Omit<SignalingData, 'id'>) } as SignalingData;
      callback(data);
    });
  });
};

// Utility Functions
export const formatTimestamp = (timestamp: Timestamp): string => {
  const now = new Date();
  const messageTime = timestamp.toDate();
  const diffInHours = (now.getTime() - messageTime.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return messageTime.toLocaleDateString();
  }
};

export const getUnreadCount = (chat: Chat, userId: string): number => {
  return chat.unreadCount[userId] || 0;
}; 