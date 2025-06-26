// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useUser } from '@clerk/nextjs';
// import {
//   Message,
//   Chat,
//   Call,
//   createChat,
//   sendMessage,
//   listenForMessages,
//   markAsRead,
//   markChatAsRead,
//   getUserChats,
//   initiateCall,
//   updateCallStatus,
//   listenForCalls,
//   formatTimestamp,
//   getUnreadCount,
// } from '../lib/messaging';
// import { webRTCService } from '../lib/webrtc';

// export interface UseMessagingReturn {
//   // Chat state
//   chats: Chat[];
//   selectedChat: Chat | null;
//   messages: Message[];
//   isLoading: boolean;
//   error: string | null;
  
//   // Call state
//   incomingCalls: Call[];
//   activeCall: Call | null;
//   isInCall: boolean;
  
//   // Chat actions
//   selectChat: (chat: Chat) => void;
//   sendTextMessage: (content: string) => Promise<void>;
//   sendFileMessage: (file: File) => Promise<void>;
//   markMessageAsRead: (messageId: string) => Promise<void>;
//   createNewChat: (participants: string[], participantNames: { [userId: string]: string }) => Promise<string>;
  
//   // Call actions
//   startVoiceCall: (chatId: string, receiverId: string, receiverName: string) => Promise<void>;
//   startVideoCall: (chatId: string, receiverId: string, receiverName: string) => Promise<void>;
//   answerCall: (call: Call) => Promise<void>;
//   declineCall: (call: Call) => Promise<void>;
//   endCall: () => Promise<void>;
  
//   // WebRTC actions
//   toggleMute: () => Promise<boolean>;
//   toggleVideo: () => Promise<boolean>;
//   switchCamera: () => Promise<void>;
  
//   // Utility
//   formatMessageTime: (timestamp: any) => string;
//   getUnreadCountForChat: (chat: Chat) => number;
// }

// export const useMessaging = (): UseMessagingReturn => {
//   const { user } = useUser();
//   const userId = user?.id || '';
//   const userName = user?.fullName || user?.firstName || 'Unknown User';

//   // State
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [incomingCalls, setIncomingCalls] = useState<Call[]>([]);
//   const [activeCall, setActiveCall] = useState<Call | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Refs for cleanup
//   const chatUnsubscriber = useRef<(() => void) | null>(null);
//   const messageUnsubscriber = useRef<(() => void) | null>(null);
//   const callUnsubscriber = useRef<(() => void) | null>(null);

//   // Initialize listeners
//   useEffect(() => {
//     if (!userId) return;

//     // Listen for user chats
//     chatUnsubscriber.current = getUserChats(userId, (chats) => {
//       setChats(chats);
//     });

//     // Listen for incoming calls
//     callUnsubscriber.current = listenForCalls(userId, (calls) => {
//       setIncomingCalls(calls);
//     });

//     return () => {
//       if (chatUnsubscriber.current) chatUnsubscriber.current();
//       if (callUnsubscriber.current) callUnsubscriber.current();
//     };
//   }, [userId]);

//   // Listen for messages when chat is selected
//   useEffect(() => {
//     if (!selectedChat || !userId) return;

//     // Mark chat as read when selected
//     markChatAsRead(selectedChat.id, userId);

//     // Listen for messages
//     messageUnsubscriber.current = listenForMessages(selectedChat.id, (messages) => {
//       setMessages(messages);
//     });

//     return () => {
//       if (messageUnsubscriber.current) messageUnsubscriber.current();
//     };
//   }, [selectedChat, userId]);

//   // Chat actions
//   const selectChat = useCallback((chat: Chat) => {
//     setSelectedChat(chat);
//   }, []);

//   const sendTextMessage = useCallback(async (content: string) => {
//     if (!selectedChat || !userId || !content.trim()) return;

//     try {
//       setIsLoading(true);
//       setError(null);
//       await sendMessage(selectedChat.id, userId, userName, content.trim());
//     } catch (err) {
//       setError('Failed to send message');
//       console.error('Error sending message:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [selectedChat, userId, userName]);

//   const sendFileMessage = useCallback(async (file: File) => {
//     if (!selectedChat || !userId) return;

//     try {
//       setIsLoading(true);
//       setError(null);
      
//       // TODO: Implement file upload to Firebase Storage
//       // For now, just send a text message with file info
//       const content = `File: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
//       await sendMessage(selectedChat.id, userId, userName, content, 'file', undefined, file.size, file.name);
//     } catch (err) {
//       setError('Failed to send file');
//       console.error('Error sending file:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [selectedChat, userId, userName]);

//   const markMessageAsRead = useCallback(async (messageId: string) => {
//     if (!userId) return;

//     try {
//       await markAsRead(messageId, userId);
//     } catch (err) {
//       console.error('Error marking message as read:', err);
//     }
//   }, [userId]);

//   const createNewChat = useCallback(async (participants: string[], participantNames: { [userId: string]: string }) => {
//     try {
//       const chatId = await createChat(participants, participantNames);
//       return chatId;
//     } catch (err) {
//       setError('Failed to create chat');
//       console.error('Error creating chat:', err);
//       throw err;
//     }
//   }, []);

//   // Call actions
//   const startVoiceCall = useCallback(async (chatId: string, receiverId: string, receiverName: string) => {
//     if (!userId) return;

//     try {
//       const callId = await initiateCall(chatId, userId, userName, receiverId, receiverName, 'voice');
      
//       // Start WebRTC call
//       const localStream = await webRTCService.startCall(
//         callId,
//         userId,
//         receiverId,
//         'voice',
//         true,
//         (remoteStream) => {
//           // Handle remote stream
//           console.log('Remote stream received');
//         },
//         () => {
//           // Handle call ended
//           setActiveCall(null);
//         }
//       );

//       setActiveCall({
//         id: callId,
//         chatId,
//         callerId: userId,
//         callerName: userName,
//         receiverId,
//         receiverName,
//         callType: 'voice',
//         status: 'ongoing',
//         createdAt: new Date() as any,
//       });
//     } catch (err) {
//       setError('Failed to start voice call');
//       console.error('Error starting voice call:', err);
//     }
//   }, [userId, userName]);

//   const startVideoCall = useCallback(async (chatId: string, receiverId: string, receiverName: string) => {
//     if (!userId) return;

//     try {
//       const callId = await initiateCall(chatId, userId, userName, receiverId, receiverName, 'video');
      
//       // Start WebRTC call
//       const localStream = await webRTCService.startCall(
//         callId,
//         userId,
//         receiverId,
//         'video',
//         true,
//         (remoteStream) => {
//           // Handle remote stream
//           console.log('Remote stream received');
//         },
//         () => {
//           // Handle call ended
//           setActiveCall(null);
//         }
//       );

//       setActiveCall({
//         id: callId,
//         chatId,
//         callerId: userId,
//         callerName: userName,
//         receiverId,
//         receiverName,
//         callType: 'video',
//         status: 'ongoing',
//         createdAt: new Date() as any,
//       });
//     } catch (err) {
//       setError('Failed to start video call');
//       console.error('Error starting video call:', err);
//     }
//   }, [userId, userName]);

//   const answerCall = useCallback(async (call: Call) => {
//     if (!userId) return;

//     try {
//       await updateCallStatus(call.id, 'ongoing');
      
//       // Answer WebRTC call
//       const localStream = await webRTCService.answerCall(call.id, userId, call.callerId);
      
//       setActiveCall(call);
//       setIncomingCalls(prev => prev.filter(c => c.id !== call.id));
//     } catch (err) {
//       setError('Failed to answer call');
//       console.error('Error answering call:', err);
//     }
//   }, [userId]);

//   const declineCall = useCallback(async (call: Call) => {
//     try {
//       await updateCallStatus(call.id, 'declined');
//       setIncomingCalls(prev => prev.filter(c => c.id !== call.id));
//     } catch (err) {
//       console.error('Error declining call:', err);
//     }
//   }, []);

//   const endCall = useCallback(async () => {
//     if (!activeCall) return;

//     try {
//       await webRTCService.endCall(activeCall.id);
//       await updateCallStatus(activeCall.id, 'ended');
//       setActiveCall(null);
//     } catch (err) {
//       console.error('Error ending call:', err);
//     }
//   }, [activeCall]);

//   // WebRTC actions
//   const toggleMute = useCallback(async () => {
//     if (!activeCall) return false;
    
//     try {
//       return await webRTCService.toggleMute(activeCall.id);
//     } catch (err) {
//       console.error('Error toggling mute:', err);
//       return false;
//     }
//   }, [activeCall]);

//   const toggleVideo = useCallback(async () => {
//     if (!activeCall) return false;
    
//     try {
//       return await webRTCService.toggleVideo(activeCall.id);
//     } catch (err) {
//       console.error('Error toggling video:', err);
//       return false;
//     }
//   }, [activeCall]);

//   const switchCamera = useCallback(async () => {
//     if (!activeCall) return;
    
//     try {
//       await webRTCService.switchCamera(activeCall.id);
//     } catch (err) {
//       console.error('Error switching camera:', err);
//     }
//   }, [activeCall]);

//   // Utility functions
//   const formatMessageTime = useCallback((timestamp: any) => {
//     return formatTimestamp(timestamp);
//   }, []);

//   const getUnreadCountForChat = useCallback((chat: Chat) => {
//     return getUnreadCount(chat, userId);
//   }, [userId]);

//   return {
//     // Chat state
//     chats,
//     selectedChat,
//     messages,
//     isLoading,
//     error,
    
//     // Call state
//     incomingCalls,
//     activeCall,
//     isInCall: !!activeCall,
    
//     // Chat actions
//     selectChat,
//     sendTextMessage,
//     sendFileMessage,
//     markMessageAsRead,
//     createNewChat,
    
//     // Call actions
//     startVoiceCall,
//     startVideoCall,
//     answerCall,
//     declineCall,
//     endCall,
    
//     // WebRTC actions
//     toggleMute,
//     toggleVideo,
//     switchCamera,
    
//     // Utility
//     formatMessageTime,
//     getUnreadCountForChat,
//   };
// }; 