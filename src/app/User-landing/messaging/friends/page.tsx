import React from 'react'
import ItemList from '@/components/shared/item-list/itemList'

type Props = {}

const FriendsPage = (props: Props) => {
  return (
    <div className="h-full w-full lg:ml-20 mb-20 lg:mb-0">
      <div className="min-h-[95vh] bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-xl font-semibold text-gray-800">Friends</h1>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4">
          <ItemList title='Friends' />
        </div>
      </div>
    </div>
  )
}

export default FriendsPage