import React from 'react'
import ChatConversations from './ChatConversations'
import SearchInput from './SearchInput'

const ChatSidebar = () => {
  return (

    <div className='tw-w-[33%] tw-border-r tw-border-slate-500 tw-p-4 tw-flex tw-flex-col'>
      <SearchInput />
      <div className='divide tw-px-3'></div>
      <ChatConversations />
    </div>
  )
}

export default ChatSidebar