import React from 'react'
import Messages from './Messages';
import MessageInput from './MessageInput';
import useConversation from '../../zustand/useConversation';
import { useEffect } from 'react';
import { TiMessages } from "react-icons/ti";
const MessgeContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);

  }, [setSelectedConversation])
  return (
    <div className='tw-w-[100%] tw-max-w-full tw-flex tw-flex-col'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='tw-bg-slate-500 tw-px-4 tw-py-2 tw-mb-2 tw-max-w-full'>
            <span className='tw-label-text tw-max-w-full tw-text-white'>To:</span> <span className='tw-text-white tw-font-bold tw-max-w-full'>{selectedConversation?.name}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
const NoChatSelected = () => {
  return (
    <div className='tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full'>
      <div className='tw-px-4 tw-text-center tw-sm:text-lg tw-md:text-xl tw-text-gray-200 tw-font-semibold tw-flex flex-col tw-items-center tw-gap-2'>
        <p className='tw-text-black'>Welcome</p>
        <TiMessages className='tw-text-3xl tw-md:text-6xl tw-text-center tw-text-black' />
      </div>
    </div>
  );
};
export default MessgeContainer