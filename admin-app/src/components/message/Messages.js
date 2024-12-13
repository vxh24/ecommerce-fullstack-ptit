import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { getMessages } from '../../features/message/messageSlice';
import useConversation from '../../zustand/useConversation';
import useListenMessages from '../../zustand/useListenMessage';
import Message from './Message';

const Messages = () => {
  const dispatch = useDispatch();
  const { messages, setMessages, selectedConversation } = useConversation();
  const lastMessageRef = useRef();
  useListenMessages();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  const [loading, setLoading] = useState();
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getMessages(selectedConversation._id));
        const data = res.payload;
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      fetchMessages(); // Gọi hàm async
    }
  }, [selectedConversation._id, setMessages])
  return (
    <div className='tw-max-w-full tw-h-5/6 tw-px-4 tw-flex-1 tw-overflow-auto'>
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {
        loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)
      }
      {!loading && messages.length === 0 && (
        <p className='tw-containertext-center'>Chưa có phản hồi</p>
      )}
    </div>
  );
};
const MessageSkeleton = () => {
  return (
    <>
      <div className='tw-flex tw-gap-3 tw-items-center'>
        <div className='tw-skeleton tw-w-10 tw-h-10 tw-rounded-full tw-shrink-0'></div>
        <div className='tw-flex tw-flex-col tw-gap-1'>
          <div className='tw-skeleton tw-h-4 w-40'></div>
          <div className='tw-skeleton tw-h-4 tw-w-40'></div>
        </div>
      </div>
      <div className='tw-flex tw-gap-3 tw-items-center tw-justify-end'>
        <div className='tw-flex tw-flex-col tw-gap-1'>
          <div className='tw-skeleton tw-h-4 tw-w-40'></div>
        </div>
        <div className='tw-skeleton tw-w-10 tw-h-10 tw-rounded-full tw-shrink-0'></div>
      </div>
    </>
  );
};
export default Messages