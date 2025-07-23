import React from 'react'
import DesktopNav from './nav/DesktopNav';
import MobileNav from './nav/MobileNav';

type Props = React.PropsWithChildren<{}>;

const SidebarWrapper = ({children}: Props) => {
  return (
    <div className='h-screen w-full'>
        <MobileNav/>
        <DesktopNav/>
        <main className='h-full w-full overflow-auto'>{children}</main>
    </div>
  )
}

export default SidebarWrapper