# Firebase Setup Guide for LegalConnect-GH Messaging System

This guide will help you set up Firebase for the real-time messaging, voice calls, and video calls functionality.

## Prerequisites

1. A Firebase project
2. Node.js and npm installed
3. Basic knowledge of Firebase services

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name (e.g., "legalconnect-gh")
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Click "Create project"

## Step 2: Enable Required Services

### Firestore Database
1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (you can add security rules later)
4. Select a location close to your users
5. Click "Done"

### Authentication
1. Go to "Authentication" in your Firebase project
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Optionally enable other providers (Google, Facebook, etc.)

### Storage (Optional - for file sharing)
1. Go to "Storage" in your Firebase project
2. Click "Get started"
3. Choose "Start in test mode"
4. Select a location
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "LegalConnect Web")
6. Copy the configuration object

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Clerk Configuration (if using Clerk for auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

Replace the values with your actual Firebase configuration.

## Step 5: Set Up Firestore Security Rules

In your Firebase project, go to Firestore Database > Rules and update the rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own chats
    match /chats/{chatId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.participants;
    }
    
    // Allow users to read/write messages in their chats
    match /messages/{messageId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in get(/databases/$(database)/documents/chats/$(resource.data.chatId)).data.participants;
    }
    
    // Allow users to read/write calls they're involved in
    match /calls/{callId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.callerId || request.auth.uid == resource.data.receiverId);
    }
    
    // Allow users to read/write signaling data for their calls
    match /signaling/{signalingId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.from || request.auth.uid == resource.data.to);
    }
  }
}
```

## Step 6: Install Dependencies

The required dependencies are already installed:

```bash
npm install firebase @firebase/firestore @firebase/auth @firebase/storage
```

## Step 7: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the messaging pages:
   - User messaging: `/User-landing/user-message-call`
   - Lawyer messaging: `/Lawyer/messages-calls`

3. Test the functionality:
   - Send messages
   - Start voice/video calls
   - Check real-time updates

## Features Implemented

### Real-Time Text Chat
- ✅ `sendMessage(chatId, message)` - Send text messages
- ✅ `listenForMessages(chatId)` - Real-time message listening
- ✅ `markAsRead(messageId)` - Mark messages as read
- ✅ Unread message counts
- ✅ Message timestamps

### Voice and Video Calls
- ✅ WebRTC peer-to-peer calls
- ✅ Firebase signaling for call setup
- ✅ Call controls (mute, video toggle, end call)
- ✅ Camera switching for video calls
- ✅ Call status management

### Additional Features
- ✅ Real-time chat list updates
- ✅ Message search functionality
- ✅ File message support (structure ready)
- ✅ Call history tracking
- ✅ Responsive UI for mobile and desktop

## Firestore Collections Structure

```
chats/
  {chatId}/
    - participants: [userId1, userId2]
    - participantNames: {userId1: "Name1", userId2: "Name2"}
    - lastMessage: Message
    - lastMessageTime: Timestamp
    - unreadCount: {userId1: 0, userId2: 2}
    - createdAt: Timestamp
    - updatedAt: Timestamp

messages/
  {messageId}/
    - chatId: string
    - senderId: string
    - senderName: string
    - content: string
    - timestamp: Timestamp
    - read: boolean
    - messageType: "text" | "image" | "file" | "voice" | "video"
    - fileUrl?: string
    - fileSize?: number
    - fileName?: string

calls/
  {callId}/
    - chatId: string
    - callerId: string
    - callerName: string
    - receiverId: string
    - receiverName: string
    - callType: "voice" | "video"
    - status: "incoming" | "ongoing" | "ended" | "missed" | "declined"
    - startTime?: Timestamp
    - endTime?: Timestamp
    - duration?: number
    - createdAt: Timestamp

signaling/
  {signalingId}/
    - type: "offer" | "answer" | "ice-candidate" | "call-request" | "call-accept" | "call-decline" | "call-end"
    - from: string
    - to: string
    - data: any
    - timestamp: Timestamp
    - deleted?: boolean
```

## Troubleshooting

### Common Issues

1. **Firebase not initialized**: Check your environment variables
2. **Permission denied**: Verify Firestore security rules
3. **Calls not working**: Ensure WebRTC is supported in your browser
4. **Real-time updates not working**: Check Firestore listener setup

### Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Limited WebRTC support

## Next Steps

1. Add file upload functionality using Firebase Storage
2. Implement push notifications
3. Add call recording features
4. Implement message encryption
5. Add group chat functionality
6. Create admin dashboard for call analytics

## Support

If you encounter any issues, check the Firebase documentation or create an issue in the project repository. 