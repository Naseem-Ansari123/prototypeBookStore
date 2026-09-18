import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAdminSession = create(
  persist(
    (set) => ({
      admin: null,
      setAdmin: (payload) => set({ admin: payload }),
      adminLogout: () => set({ admin: null }),
    }),
    { name: "bookverse-admin-session" }
  )
);
