import React from 'react'
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === "6749f2c34151afc711fc4a8c";
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "tw-chat-end" : "tw-chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  return (
    <>
      <div className={`tw-chat ${chatClassName}`}>
        <div className='tw-chat-image avatar'>
          <div className='tw-w-10 tw-rounded-full'>
            <img alt='Tailwind CSS chat bubble component' src={selectedConversation.avatar ? selectedConversation.avatar : "https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg"} />
          </div>
        </div>
        <div className={`tw-chat-bubble tw-text-white tw-bg-blue-500   ${bubbleBgColor} tw-pb-2`}>{message.message}</div>
        <div className='tw-chat-footer tw-opacity-50 tw-text-xs tw-flex tw-gap-1 tw-items-center'>{formattedTime}</div>
      </div>
    </>
  );
};
export default Message