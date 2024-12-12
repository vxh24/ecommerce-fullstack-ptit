import React from "react";

const Message = () => {
  return (
    <div className="tailwind">
      <div className="tw-chat tw-chat-end">
        <div className="tw-chat-image tw-avatar">
          <div className="tw-w-10 tw-rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className={`tw-chat-bubble tw-text-white tw-bg-blue-500`}>
          Hi! What is upp?
        </div>
        <div className="tw-chat-footer tw-opacity-50 tw-text-xs tw-flex tw-gap-1 tw-items-center">
          12:42
        </div>
      </div>
    </div>
  );
};

export default Message;
