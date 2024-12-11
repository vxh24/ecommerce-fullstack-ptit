import React from 'react'
import MessgeContainer from '../components/message/MessgeContainer'
import ChatSidebar from '../components/sidebar/ChatSidebar'

const ChatMain = () => {
  return (
    <div className=' tw-flex tw-max-h-full tw-max-w-full tw-rounded-lg tw-overflow-hidden tw-bg-gray-400 tw-bg-clip-padding tw-backdrop-filter tw-backdrop-blur-lg tw-bg-opacity-0'>
      <ChatSidebar />
      <MessgeContainer />

    </div>
  )
}

export default ChatMain