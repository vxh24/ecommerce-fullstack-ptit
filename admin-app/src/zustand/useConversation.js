import { create } from "zustand";
const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  selectedOrder: [],
  setSelectedOrder: (selectedOrder) => set({ selectedOrder }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}))
export default useConversation;