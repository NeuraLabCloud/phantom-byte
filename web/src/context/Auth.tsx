import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { getClientAccount, supabase } from "../lib/supabase";
import { useUserStore } from "../lib/stores/user";
import { Database } from "../lib/schema";
import { Client } from "../lib/types";

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
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        const user = session?.user ?? null;
        userStore.setUser(user); // Set the user in the global store
        if (user) {
          setIsAuthenticated(true);
        }
        setLoading(false);
      })
      .catch(() => {
        userStore.unsetUser(); // Unset the user in the global store
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

    fetchClient();
  }, [isAuthenticatedContext]);

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
