import { create } from "zustand";

// global state management for the user
export const useUserStore = create((set) => ({
  users: [],
  setUsers: (users) => set({ users }),

  createUser: async (newUser) => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      return { sucess: false, massege: "Please enter all the fields. " };
    }
    // fetch the data from the backend
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server Error:", errorText);
        return { success: false, message: "Server error: " + errorText };
      }

      const data = await res.json();
      set((state) => ({ users: [...state.users, data.data] }));
      return { success: true, message: "User created successfully!" };
    } catch (error) {
      console.error("Network Error:", error);
      return { success: false, message: "Network error occurred." };
    }
  },
  loginUser: async (user) => {
    if (!user.email || !user.password) {
        return { success: false, message: "Please enter all the fields." };
    }

    try {
        const res = await fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Server Error:", errorText);
            return { success: false, message: "Server error: " + errorText };
        }

        const data = await res.json();
        console.log("Backend Response:", data);

        if (data.success && data.token) {
            localStorage.setItem("token", data.token); // Store JWT Token
            return { success: true, message: "Login Successful!" };
        }

        return { success: false, message: "Invalid Credentials." };
    } catch (error) {
        console.error("Network Error:", error);
        return { success: false, message: "Network error occurred." };
    }
  }
}));
