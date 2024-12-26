import React, { useState } from "react";
import { TbLayoutBottombarCollapse } from "react-icons/tb";
import { BsSend } from "react-icons/bs";
import { IoMdChatbubbles } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendMessage } from "../features/messages/messageSlice";
import { ADMIN_ID } from "../utils/config";
import useMessages from "../zustand/useMessages";

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.message);
  const [isMinimized, setIsMinimized] = useState(true);
  const [message, setMessage] = useState("");
  const { message1, setMessage1 } = useMessages();
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const customer = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Tin nhắn không được để trống!");
      return;
    }

    if (!customer || !customer.user.id) {
      toast.error("Không thể gửi tin nhắn. Vui lòng đăng nhập lại.");
      return;
    }

    dispatch(
      sendMessage({
        receiverId: ADMIN_ID,
        message: { message },
      })
    )
      .unwrap()
      .then((data) => {
        setMessage1([...message1, data]);
        setMessage("");
      })
      .catch((error) => toast.error(error));
  };

  const renderHeader = () => (
    <div className="chat-header">
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
  );

  const renderBody = () => {
    if (!customer) {
      return (
        <div className="chat-body">
          <div
            className="message-content center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <button className="login-btn" onClick={() => navigate("/login")}>
              Đăng nhập để tiếp tục
            </button>
          </div>
        </div>
      );
    }

    return (
      !isMinimized && (
        <>
          <div className="chat-body">
            <div className="chat-message">
              <MessageContainer />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="chat-footer">
              <input
                type="text"
                placeholder="Nhập nội dung..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">
                {loading ? (
                  <div className="tw-loading tw-loading-spinner"></div>
                ) : (
                  <BsSend />
                )}
              </button>
            </div>
          </form>
        </>
      )
    );
  };

  return (
    <div className={`chat-container ${isMinimized ? "minimized" : ""}`}>
      {renderHeader()}
      {renderBody()}
    </div>
  );
};

export default Chat;
