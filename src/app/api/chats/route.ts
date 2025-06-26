// import { NextRequest, NextResponse } from 'next/server';
// import { createChat, getUserChats } from '../../../lib/messaging';

// export async function POST(request: NextRequest) {
//   try {
//     const { participants, participantNames } = await request.json();

//     if (!participants || !participantNames || participants.length < 2) {
//       return NextResponse.json(
//         { error: 'Invalid participants data' },
//         { status: 400 }
//       );
//     }

//     const chatId = await createChat(participants, participantNames);

//     return NextResponse.json({ chatId });
//   } catch (error) {
//     console.error('Error creating chat:', error);
//     return NextResponse.json(
//       { error: 'Failed to create chat' },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get('userId');

//     if (!userId) {
//       return NextResponse.json(
//         { error: 'User ID is required' },
//         { status: 400 }
//       );
//     }

//     // This would typically return chats, but since we're using real-time listeners,
//     // we'll return an empty array and let the client handle the real-time updates
//     return NextResponse.json({ chats: [] });
//   } catch (error) {
//     console.error('Error fetching chats:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch chats' },
//       { status: 500 }
//     );
//   }
// } 