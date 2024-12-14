import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const userSocketContext = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newOrder, setNewOrder] = useState(null);

  const getCustomerfromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // console.log(getCustomerfromLocalStorage);

  useEffect(() => {
    if (getCustomerfromLocalStorage) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: "6749f2c34151afc711fc4a8c",
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      // socket.on("new-order-notification", (orderData) => {
      //   console.log("New order received:", orderData);
      //   setNewOrder(orderData);
      // });
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
