import { create } from "zustand";
const useMessages = create((set) => ({
  message1: [],
  setMessage1: (message1) => set({ message1 }),
}))
export default useMessages;