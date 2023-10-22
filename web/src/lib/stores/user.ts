import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  unsetUser: () => void;
  getUser: () => User | null;
  isAuthenticated: () => boolean;
};

/**
 * Global state for the user store
 *
 * When the user logs in, we set the user in the store
 * When the user logs out, we unset the user in the store
 *
 * Docs at https://github.com/pmndrs/zustand
 */
export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  unsetUser: () => set({ user: null }),
  getUser: () => get().user,
  isAuthenticated: () => get().user !== null,
}));
