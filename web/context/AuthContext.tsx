"use client";

import React, { createContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabaseClient} from "@/lib/supabase";
import { useUserStore } from "@/lib/stores/user";
import { Client, Payload } from "@/lib/types";
import { useClientAuthStore, useClientStore } from "@/lib/stores/client";
import LoadingSpinner from "@/components/ui/loading/LoadingSpinner";

interface Auth {
  isAuthenticated: boolean;
  user: User | null;
  client: Client | null;
}

export const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const userStore = useUserStore();
  const clientStore = useClientStore();
  const clientAuthStore = useClientAuthStore();

  async function fetchUser() {
    return fetch("/auth/v1/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }).then((res) => res.json()).then((data) => {
        return data as User | null
    })
  }

  async function fetchClientAccount(user_id: string) {
    return fetch("/auth/v1/user/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
    }).then((res) => res.json()).then((data) => {
        return data as Client | null
    })
  }

  useEffect(() => {
    setLoading(true);

    fetchUser().then((user) => {
      if (user) {
        clientAuthStore.setAuthenticated("authenticated");
        userStore.setUser(user);

        fetchClientAccount(user.id).then((client) => {
          if (client) {
            clientStore.setClient(client);
          }
        });
      } else {
        clientAuthStore.setAuthenticated("unauthenticated");
      }
    });

    const realtimeClient = supabaseClient
      .channel("clients")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clients" },
        (payload) => {
          const data = payload as Payload; // Adding type support to payload
          console.log('Realtime event received!', data)
          clientStore.setClient(data.new);
        },
      )
      .subscribe();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      if (user) {
        clientAuthStore.setAuthenticated("authenticated");
        userStore.setUser(user); // Set or unset the user in the global store
      } else {
        clientAuthStore.setAuthenticated("unauthenticated");
      }
    });

    setLoading(false);

    return () => {
      subscription.unsubscribe();
      realtimeClient.unsubscribe();
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const authObject = {
    isAuthenticated: clientAuthStore.isAuthenticated(),
    user: userStore.getUser(),
    client: clientStore.getClient(),
  };

  return (
    <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
  );
};
