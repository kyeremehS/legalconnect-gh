import { Card } from '@/components/ui/card'
import React from 'react'

type Props = {}

const ConversationFallback = () => {
  return (
    <div className='h-full w-full bg-gray-100 flex items-center justify-center'>
      <div className='text-center text-gray-500'>
        <p className='text-sm'>Select/start a conversation to get started!</p>
      </div>
    </div>
  )
}

export default ConversationFallback