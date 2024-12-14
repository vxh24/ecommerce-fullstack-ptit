import React from 'react'
import { useState } from 'react';
import { BsSend } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { sendMessage } from '../../features/message/messageSlice';
import useConversation from '../../zustand/useConversation';
const MessageInput = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      return
    }
    setLoading(true);
    try {
      const res = await dispatch(sendMessage({
        receiverId: selectedConversation._id,
        message: { message },
      }));
      const data = res.payload;
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setLoading(false);
      setMessage("");
    }
  }
  return (
    <form className='tw-px-4 tw-my-3' onSubmit={handleSubmit}>
      <div className='tw-w-full tw-relative'>
        <input
          type='text'
          className='tw-border tw-text-sm tw-rounded-lg tw-block tw-w-full tw-p-2.5  tw-bg-gray-700 tw-border-gray-600 tw-text-white'
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='tw-absolute tw-inset-y-0 tw-end-0 tw-flex tw-items-center tw-pe-3'>
          {loading ? <div className='tw-loading tw-loading-spinner'></div> : <BsSend className='tw-text-white' />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput