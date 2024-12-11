import React from 'react'

const ChatConversation = () => {
  return (
    <>
      <div
        className="tw-flex tw-gap-2 tw-items-center tw-hover:bg-sky-500 tw-rounded tw-p-2 tw-py-1 tw-cursor-pointer"
      >
        <div className="tw-avatar tw-online" >
          <div className='tw-w-12 tw-rounded-full'>
            <img src="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" alt='user avatar' />
          </div>
        </div>

        <div className='tw-flex tw-flex-col tw-flex-1'>
          <div className='tw-flex tw-gap-3 tw-justify-between'>
            <p className='tw-font-bold tw-text-black'>abc</p>
          </div>
        </div>
      </div>

      <div className='tw-divider tw-my-0 tw-py-0 tw-h-1' />
    </>
  )
}

export default ChatConversation