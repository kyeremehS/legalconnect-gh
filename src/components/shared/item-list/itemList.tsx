import React from 'react'
import { Card } from "@/components/ui/card";
type Props = React.PropsWithChildren<{
     title: string
     action?: React.ReactNode
}>

const itemList = ({children, title, action: Action}: Props) => {
  return (
    <Card className='h-full min-h-[95vh] w-80
    lg:flex-none p-2'>
        <div className='mb-4 flex text-center items-center justify-center'>
            <h1 className='text-2xl text-center font-semibold tracking-tight'>
                {title}
            </h1>
            {Action ? Action: null}
        </div>
        <div className='w-full h-full flex flex-col items-center justify-start
        gap-2'>{children}</div>
    </Card>

  )
}

export default itemList