import { useEffect } from "react";

import { userSocketContext } from "../context/SocketContext";
import useConversation from "./useConversation";

const useListenOrder = () => {
  const { socket } = userSocketContext();
  const { selectedOrder, setSelectedOrder } = useConversation();

  useEffect(() => {
    socket?.on("new-order-notification", (notification) => {
      setSelectedOrder([...selectedOrder, notification]);
      const updatedOrders = [...selectedOrder, notification];
      localStorage.setItem("notification", JSON.stringify(updatedOrders));
    });
    return () => {
      socket?.off("new-order-notification");
    };
  }, [socket, selectedOrder, setSelectedOrder]);
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("notification"));
    if (storedOrders) {
      setSelectedOrder(storedOrders);
    }
  }, [setSelectedOrder]);
};
export default useListenOrder
