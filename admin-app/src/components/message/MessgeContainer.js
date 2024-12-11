import React from 'react'
import Messages from './Messages';
import MessageInput from './MessageInput';

const MessgeContainer = () => {
  return (
    <div className='tw-w-[100%] tw-max-w-full tw-flex tw-flex-col'>
      <>
        {/* Header */}
        <div className='tw-bg-slate-500 tw-px-4 tw-py-2 tw-mb-2 tw-max-w-full'>
          <span className='tw-label-text tw-max-w-full'>To:</span> <span className='tw-text-gray-900 tw-font-bold tw-max-w-full'>John doe</span>
        </div>

        <Messages />
        <MessageInput />
      </>
    </div>
  );
};

export default MessgeContainer