import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <div className="tailwind">
      <div className="tw-px-4 tw-flex-1 tw-overflow-auto">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </div>
  );
};

export default Messages;
