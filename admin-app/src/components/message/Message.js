import React from 'react'
// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";
const Message = () => {
  // const { authUser } = useAuthContext();
  // const { selectedConversation } = useConversation();
  // const fromMe = message.senderId === authUser._id;
  // const formattedTime = extractTime(message.createdAt);
  // const chatClassName = fromMe ? "chat-end" : "chat-start";
  // const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  // const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <>
      <div className={`tw-chat tw-chat-end`}>
        <div className='tw-chat-image avatar'>
          <div className='tw-w-10 tw-rounded-full'>
            <img alt='Tailwind CSS chat bubble component' src="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" />
          </div>
        </div>
        <div className={`tw-chat-bubble tw-text-white tw-pb-2`}>abc1111111111111111</div>
        <div className='tw-chat-footer tw-opacity-50 tw-text-xs tw-flex tw-gap-1 tw-items-center'>18:00</div>
      </div>
      <div className={`tw-chat tw-chat-start`}>
        <div className='tw-chat-image avatar'>
          <div className='tw-w-10 tw-rounded-full'>
            <img alt='Tailwind CSS chat bubble component' src="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" />
          </div>
        </div>
        <div className={`tw-chat-bubble tw-text-white tw-pb-2`}>abc1111111111111111</div>
        <div className='tw-chat-footer tw-opacity-50 tw-text-xs tw-flex tw-gap-1 tw-items-center'>18:00</div>
      </div>
    </>
  );
};
export default Message