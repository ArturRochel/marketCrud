import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      setUser: (data) => set({ token: data.token, user: data.user }),
      logOut: () => set({ token: null, user: null }),
    }),
    {
      name: "user-info",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
