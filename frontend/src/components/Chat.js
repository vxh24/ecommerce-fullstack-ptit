import React, { useState } from 'react';
import { TbLayoutBottombarCollapse } from "react-icons/tb";
import { IoMdChatbubbles } from "react-icons/io";
const Chat = () => {
  const [isMinimized, setIsMinimized] = useState(true);

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
    console.log("Chat minimized:", !isMinimized); // Kiểm tra trạng thái
  };

  return (
    <div className={`chat-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="chat-header ">
        {!isMinimized && <div className="chat-title">Chat</div>}
        <div className="chat-close" onClick={toggleMinimized}>
          {isMinimized ?
            <div className='d-flex align-items-center gap-10 price'>
              <IoMdChatbubbles className='chat-icon' />
              <p className='mb-0'>Chat</p>
            </div>
            :
            <div className='hover-container text-end'>
              <TbLayoutBottombarCollapse className="fs-3" />
              <span className='hover-detail'>Thu gọn</span>
            </div>
          }
        </div>
      </div>
      {!isMinimized && (
        <div className="chat-body">
          <div className="chat-message">
            <div className="message-content">Lời nhắn từ người dùng</div>
          </div>
          {/* Thêm các tin nhắn khác ở đây */}
        </div>
      )}
      {!isMinimized && (
        <div className="chat-footer">
          <input type="text" placeholder="Nhập nội dung..." />
          <button>Gửi</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
