import React from 'react'
import ItemList from '@/components/shared/item-list/itemList'
import ConversationFallback from '@/components/shared/conversation/ConversationFallback'

type Props = {}

const FriendsPage = (props: Props) => {
  return (
    <div className="h-full w-full lg:ml-20 mb-20 lg:mb-0">
      <div className="h-full flex bg-gray-50">
        {/* Friends List - Left side */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <ItemList title='Friends'>
            {/* Add friend items here */}
          </ItemList>
        </div>
        
        {/* Conversation Area - Right side (only on desktop) */}
        <div className="flex-1 hidden lg:block">
          <ConversationFallback />
        </div>
      </div>
    </div>
  )
}

export default FriendsPage;