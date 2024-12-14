import React from "react";
import useConversation from "../zustand/useConversation";
const Notification = () => {
  const { selectedOrder } = useConversation();
  const notification = Array.isArray(selectedOrder) ? selectedOrder : [selectedOrder];
  const reversedNotification = [...notification].reverse();
  return (
    <div className="notification-container">
      <div className="notification-header">Thông báo ({selectedOrder.length})</div>
      <div className="notification-list">
        {reversedNotification.map((item, index) => (
          <div key={index} className="notification-item">
            <strong>{item.title}</strong>
            <p>{item.message}</p>
            <div className="d-flex justify-content-end">
              <span>{item.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
