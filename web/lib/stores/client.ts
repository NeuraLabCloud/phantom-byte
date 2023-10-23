import { create } from "zustand";
import { Client } from "../types";

type ClientStore = {
  client: Client | null;
  setClient: (client: Client) => void;
  unsetClient: () => void;
  getClient: () => Client | null;
};

type AuthStatus = "authenticated" | "unauthenticated" | "loading";
type ClientAuthStore = {
  status: AuthStatus;
  setAuthenticated: (status: AuthStatus) => void;
  isAuthenticated: () => boolean;
};

/**
 * Global state for the Client store
 *
 * When the Client logs in, we set the Client in the store
 * When the Client logs out, we unset the Client in the store
 *
 * Docs at https://github.com/pmndrs/zustand
 */
export const useClientStore = create<ClientStore>((set, get) => ({
  client: null,
  setClient: (client) => set({ client }),
  unsetClient: () => set({ client: null }),
  getClient: () => get().client,
  isAuthenticated: () => get().client !== null,
}));

/**
 * Global state for the Client auth store
 *
 * When the Client logs in, we set the status to 'authenticated'
 * When the Client logs out, we set the status to 'unauthenticated'
 *
 * The main reason for using this is to have a single source of truth
 * for the Client's authentication status. This is also useful because
 * we have many methods for fetching client data from different components
 * and it helps to know or tell other parts of the app if the Client is
 * authenticated or not. (Avoids fetching data if the Client is not authenticated)
 *
 * Status can be `authenticated`, `unauthenticated`, or `loading`
 */
export const useClientAuthStore = create<ClientAuthStore>((set, get) => ({
  status: "unauthenticated",
  setAuthenticated: (status) => {
    localStorageAuthCache.set(status);
    set({ status });
  },
  isAuthenticated: () => get().status === "authenticated",
}));

/** A workaround to use our client side auth cache outside of hooks. */
export const localStorageAuthCache = {
  set: (status: AuthStatus) => localStorage.setItem("authStatus", status),
  get: (): AuthStatus => localStorage.getItem("authStatus") as AuthStatus,
  clear: () => localStorage.removeItem("authStatus"),
  isAuthenticated: (): boolean =>
    localStorage.getItem("authStatus") === "authenticated",
};
