import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSession = create(
  persist(
    (set) => ({
      user: null,
      setUser: (payload) => set({ user: payload }),
      logout: () => set({ user: null }),
    }),
    { name: "bookverse-user-session" }
  )
);
