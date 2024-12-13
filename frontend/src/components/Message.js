import React, { useEffect } from "react";
import { getProfileSlice } from "../features/user/userSlice";
import { extractTime } from "../utils/extractTime";
import { useDispatch, useSelector } from "react-redux";
const Message = ({ message, avatar }) => {
  const customer = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;
  const fromMe = message.senderId === customer.user.id;
  const chatClassName = fromMe ? "tw-chat-end" : "tw-chat-start";
  const bubbleBgColor = fromMe ? "tw-bg-orange-600" : "tw-bg-sky-500";
  const formattedTime = extractTime(message.createdAt);
  return (
    <div className="tailwind">
      <div className={`tw-chat ${chatClassName}`}>
        <div className="tw-chat-image tw-avatar">
          <div className="tw-w-10 tw-rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={fromMe ? avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR186lfYlIBxolZxvwsOoYTyVp_eAIOgR7gbatvSYKKLZ69Uu0sQKRYYRdw1iH8FtlRDos&usqp=CAU"}
            />
          </div>
        </div>
        <div className={`tw-chat-bubble tw-text-white  ${bubbleBgColor} tw-pb-2`}>
          {message.message}
        </div>
        <div className="tw-chat-footer tw-opacity-50 tw-text-xs tw-flex tw-gap-1 tw-items-center">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
