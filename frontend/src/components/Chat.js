import React, { useState } from "react";
import { TbLayoutBottombarCollapse } from "react-icons/tb";
import { IoMdChatbubbles } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MessageContainer from "./MessageContainer";
const Chat = () => {
  const [isMinimized, setIsMinimized] = useState(true);

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
    console.log("Chat minimized:", !isMinimized); // Kiểm tra trạng thái
  };

  const getCustomerfromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const navigate = useNavigate();

  return (
    <div className={`chat-container ${isMinimized ? "minimized" : ""}`}>
      <div className="chat-header ">
        {!isMinimized && <div className="chat-title">Chat</div>}
        <div className="chat-close" onClick={toggleMinimized}>
          {isMinimized ? (
            <div className="d-flex align-items-center gap-10 price">
              <IoMdChatbubbles className="chat-icon" />
              <p className="mb-0">Chat</p>
            </div>
          ) : (
            <div className="hover-container text-end">
              <TbLayoutBottombarCollapse className="fs-3" />
              <span className="hover-detail">Thu gọn</span>
            </div>
          )}
        </div>
      </div>
      {}
      {getCustomerfromLocalStorage ? (
        <>
          {!isMinimized && (
            <div className="chat-body">
              <div className="chat-message">
                <MessageContainer />
              </div>
            </div>
          )}
          {!isMinimized && (
            <div className="chat-footer">
              <input type="text" placeholder="Nhập nội dung..." />
              <button>Gửi</button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="chat-body">
            <div className="chat-message">
              <div
                className="message-content"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "300px",
                }}
              >
                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#EE4D2D",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập để tiếp tục
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
