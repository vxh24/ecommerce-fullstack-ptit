import { useEffect } from "react";


// import notificationSound from "../assets/sounds/notification.mp3";
import { userSocketContext } from "../context/SocketContext";
import useMessages from "./useMessages";

const useListenMessages = () => {
  const { socket } = userSocketContext();
  const { message1, setMessage1 } = useMessages();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // newMessage.shouldShake = true;
      // const sound = new Audio(notificationSound);
      // sound.play();
      setMessage1([...message1, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessage1, message1]);
};
export default useListenMessages;
