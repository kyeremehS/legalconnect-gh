import React from 'react'
import ItemList from '@/components/shared/item-list/itemList'

type Props = {}

const ConversationPage = (props: Props) => {
  return (
    <div className="h-full w-full lg:ml-20 mb-20 lg:mb-0">
      <div className="h-full bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 w-full">
          <h1 className="text-xl font-semibold text-gray-800">Conversations</h1>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 w-full">
          <ItemList title='Conversations' />
        </div>
      </div>
    </div>
  )
}

export default ConversationPage