import React from 'react';
import ItemList from '@/components/shared/item-list/itemList'
import ConversationContainer from '@/components/shared/conversation/ConversationContainer'

type Props = {
  params: {
    conversationId: string
  }
};

const ConversationPage = ({ params }: Props) => {
  return (
    <div className="h-full w-full lg:ml-20 mb-20 lg:mb-0">
      <div className="h-full flex bg-gray-50">
        {/* Conversations List - Left side */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <ItemList title='Conversations'>
            {/* Add conversation items here */}
          </ItemList>
        </div>
        
        {/* Conversation Container - Right side */}
        <div className="flex-1 hidden lg:block">
          <ConversationContainer />
        </div>
      </div>
    </div>
  )
}

export default ConversationPage;