import React from 'react'
import { useState } from 'react';
import { userSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation'

const ChatConversation = ({ customer, lastIx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === customer._id;
  const { onlineUsers } = userSocketContext();
  const isOnline = onlineUsers.includes(customer._id);
  return (
    <>
      <div
        className={`tw-flex tw-gap-2 tw-items-center tw-hover:bg-sky-500 tw-rounded tw-p-2 tw-py-1 tw-cursor-pointer ${isSelected ? "tw-bg-sky-500" : ""}`}
        onClick={() => { setSelectedConversation(customer) }}
      >
        <div className={`tw-avatar ${isOnline ? "tw-online" : ""}`} >
          <div className='tw-w-12 tw-rounded-full'>
            <img src={customer.avatar ? customer.avatar : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt='user avatar' />
          </div>
        </div>

        <div className='tw-flex tw-flex-col tw-flex-1'>
          <div className='tw-flex tw-gap-3 tw-justify-between'>
            <p className='tw-font-bold tw-text-black'>{customer.name}</p>
          </div>
        </div>
      </div>

      {!lastIx && <div className='tw-divider tw-my-0 tw-py-0 tw-h-1' />}
    </>
  )
}

export default ChatConversation