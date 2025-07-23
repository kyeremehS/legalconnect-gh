"use client"

import React from 'react'
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useConversation } from "../../../../hooks/useConversation"

type Props = React.PropsWithChildren<{
     title: string
     action?: React.ReactNode
}>

const itemList = ({children, title, action: Action}: Props) => {
  const {isActive} = useConversation();
  return (
    <Card className={cn('h-full w-full bg-white border-r border-gray-200 rounded-none',
      {"block": !isActive,
        "lg:block": isActive,
      }
    )}>
        <div className='p-4 border-b border-gray-200'>
            <h1 className='text-xl font-semibold text-gray-800'>
                {title}
            </h1>
            {Action ? Action: null}
        </div>
        <div className='w-full h-full flex flex-col items-start justify-start p-4 overflow-auto'>
            {children}
        </div>
    </Card>
  )
}

export default itemList