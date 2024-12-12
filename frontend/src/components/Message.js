import React from "react";
import { extractTime } from "../utils/extractTime";

const Message = ({ message }) => {
  console.log("message: ", message);
  const customer = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const fromMe = message.senderId === customer.user.id;
  const chatClassName = fromMe ? "tw-chat-end" : "tw-chat-start";
  const bubbleBgColor = fromMe ? "tw-bg-orange-600" : "";
  const formattedTime = extractTime(message.createdAt);

  return (
    <div className="tailwind">
      <div className={`tw-chat ${chatClassName}`}>
        <div className="tw-chat-image tw-avatar">
          <div className="tw-w-10 tw-rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className={`tw-chat-bubble tw-text-white  ${bubbleBgColor} pb-2`}>
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
