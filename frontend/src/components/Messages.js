import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../features/messages/messageSlice";
import { ADMIN_ID } from "../utils/config";
import { toast } from "react-toastify";
import { userSocketContext } from "../context/SocketContext";
import useListenMessages from "../zustand/useListenMessages";
import useMessages from "../zustand/useMessages";
import { getProfileSlice } from "../features/user/userSlice";

const Messages = () => {
  const lastMessageRef = useRef();
  const customer = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileSlice());
  }, []);

  const profileState = useSelector((state) => state?.auth?.profile?.data);
  const { messages, loading, error } = useSelector((state) => state.message);
  const { message1, setMessage1 } = useMessages();
  useListenMessages();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [message1]);
  useEffect(() => {
    if (customer.user.id) {
      dispatch(getMessages(ADMIN_ID))
        .unwrap()
        .then((data) => {
          setMessage1(data);
        })
        .catch((error) => toast.error(`Lỗi: ${error}`));
    }
  }, []);

  return (
    <div className="tailwind">
      <div className="tw-px-4 tw-flex-1 tw-overflow-auto">
        {message1?.length > 0 &&
          message1.map((message) => {
            return (
              <div ref={lastMessageRef}>
                <Message
                  key={message._id}
                  ref={lastMessageRef}
                  message={message}
                  avatar={profileState.avatar}
                />
              </div>
            );
          })}
        {message1?.length === 0 && (
          <p className="tw-text-center">
            Gửi 1 tin nhắn để bắt đầu một cuộc hội thoại
          </p>
        )}
      </div>
    </div>
  );
};

export default Messages;
