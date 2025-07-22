import React from 'react'

export default function FriendsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* You can add navbars/sidebars specific to this section here */}
      {children}
    </div>
  )
}
