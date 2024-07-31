'use client'
import dynamic from 'next/dynamic'
const InstructorChatComponent = dynamic(() => import('@/components/chatcomponent/instructorchatcomponent'),{ssr : false}) 
import React from 'react'

const page = () => {
  return (
    <div>
      <InstructorChatComponent />
    </div>
  )
}

export default page
