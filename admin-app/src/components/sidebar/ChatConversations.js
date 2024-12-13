import React from 'react'
import { useEffect } from 'react'
import ChatConversation from './ChatConversation'
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from '../../features/customers/customerSlice';
const ChatConversations = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [])
  const customerState = useSelector((state) => state.customer.customers?.data);
  return (
    <div className='tw-max-w-md tw-py-2 tw-flex tw-flex-col tw-overflow-auto'>
      {
        customerState && customerState.filter(customer => customer._id !== "6749f2c34151afc711fc4a8c").map((customer, index) => (
          <ChatConversation
            key={customer._id}
            customer={customer}
            lastIx={index === customer.length - 1}
          />

        ))
      }

    </div>
  )
}

export default ChatConversations