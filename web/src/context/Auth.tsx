import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { getClientAccount, getUser, supabase } from "../lib/supabase";
import { useUserStore } from "../lib/stores/user";
import { Client, Payload } from "../lib/types";

interface Auth {
  isAuthenticated: boolean;
  user: User | null;
  client: Client | null;
}

export const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticatedContext, setIsAuthenticated] = useState(false);

  const userStore = useUserStore(); // Access the global user store

  useEffect(() => {
    setLoading(true);
    getUser().then((user) => {
      if (user) {
        setIsAuthenticated(true);
      }

      userStore.setUser(user); // Set or unset the user in the global store
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const user = session?.user ?? null;
      if (user) {
        setIsAuthenticated(true);
      }
      userStore.setUser(user); // Set or unset the user in the global store
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function fetchClient() {
      if (!isAuthenticatedContext) {
        return;
      }

      const data = await getClientAccount({ user_id: userStore.getUser()?.id });
      setClient(data);
    }

    // If the client does not exist in state, fetch it
    // This is to prevent the client being null if no subscription is received yet
    if (!client) {
      fetchClient();
    }

    const realtimeClient = supabase
      .channel("clients")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clients" },
        (payload) => {
          console.log("Change received!", payload);
          const data = payload as Payload; // Adding type support to payload
          setClient(data.new);
        },
      )
      .subscribe();

    return () => {
      realtimeClient.unsubscribe();
    };
  }, []);

  if (loading) {
    return null;
  }

  const auth = {
    isAuthenticated: !!session,
    user: userStore.getUser(),
    client,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
