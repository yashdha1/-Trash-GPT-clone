import { create } from "zustand";
import axios from "axios"; 

const API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-alpha"; 
const API_KEY = import.meta.env.VITE_HF_API;


export const useChatStore = create((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),

  sendMessage: async (input) => {
    set((state) => ({ messages: [...state.messages, { text: input, sender: "user" }] }));

    try {
      const { data } = await axios.post(
        API_URL,
        { inputs: input },
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );

      const reply = data[0]?.generated_text || "AI inactive";

      set((state) => ({ messages: [...state.messages, { text: reply, sender: "bot" }] }));
    } catch (error) {
      set((state) => ({ messages: [...state.messages, { text: "API Error! Try again later.", sender: "bot" }] }));
    }
  },
}));