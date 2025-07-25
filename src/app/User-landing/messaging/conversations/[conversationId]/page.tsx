import React from 'react';
import ConversationContainer from '@/components/shared/conversation/ConversationContainer'

type Props = {
  params: {
    conversationId: string
  }
};

const ConversationPage = ({ params }: Props) => {
  return <ConversationContainer/>
}

export default ConversationPage;