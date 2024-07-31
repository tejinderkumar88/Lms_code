'use client'
import dynamic from 'next/dynamic'
const StudentChatComponent = dynamic(() => import('@/components/chatcomponent/studentchatcomponent'),{
  ssr : false
})
import React from 'react'

const page = () => {
  return (
    <div>
      <StudentChatComponent />
    </div>
  )
}

export default page
