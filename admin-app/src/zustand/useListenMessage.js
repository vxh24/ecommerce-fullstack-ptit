import { useEffect } from "react";


// import notificationSound from "../assets/sounds/notification.mp3";
import { userSocketContext } from "../context/SocketContext";
import useConversation from "./useConversation";

const useListenMessages = () => {
  const { socket } = userSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // newMessage.shouldShake = true;
      // const sound = new Audio(notificationSound);
      // sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
