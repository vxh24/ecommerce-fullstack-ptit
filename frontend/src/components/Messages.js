import React, { useEffect } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../features/messages/messageSlice";
import { ADMIN_ID } from "../utils/config";
import { toast } from "react-toastify";

const Messages = () => {
  const customer = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.message);

  useEffect(() => {
    if (customer.user.id) {
      dispatch(getMessages(ADMIN_ID))
        .unwrap()
        .then()
        .catch((error) => toast.error(`Lỗi: ${error}`));
    }
  }, []);

  return (
    <div className="tailwind">
      <div className="tw-px-4 tw-flex-1 tw-overflow-auto">
        {messages.length > 0 &&
          messages.map((message) => {
            return <Message key={message._id} message={message} />;
          })}
        {messages.length === 0 && (
          <p className="tw-text-center">
            Gửi 1 tin nhắn để bắt đầu một cuộc hội thoại
          </p>
        )}
      </div>
    </div>
  );
};

export default Messages;
