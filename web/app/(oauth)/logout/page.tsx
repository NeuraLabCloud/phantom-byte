"use client"

import React, { FC, useEffect, useState } from "react";
import { Button, Text } from "@mantine/core";
import Link from "next/link";
import { useClientAuthStore } from "@/lib/stores/client";
import { notifications } from "@mantine/notifications";
import ScreenCenter from "@/components/ui/ScreenCenter";

interface ComponentProps {}

const Component: FC<ComponentProps> = ({}) => {
    const [logoutTriggered, setLogoutTriggered] = useState(false);
    const clientAuthStore = useClientAuthStore();

    const handleLogout = () => {
        setLogoutTriggered(true);
        notifications.show({
            message: "You have been logged out.",
            color: "violet",
            autoClose: 3000,
        });
    };

    useEffect(() => {
        if (logoutTriggered) {
            clientAuthStore.setAuthenticated("unauthenticated");
        }
    }, [logoutTriggered]);

    return (
        <>
            <ScreenCenter>
                <Button
                    variant="default"
                    className="mr-2 animate-pulse"
                    component={Link}
                    href={"/"}
                >
                    <Text className="text-white">Home</Text>
                </Button>
                <form action="/auth/signout" method="post" onSubmit={handleLogout}>
                    <Button variant="outline" type="submit">
                        <Text className="text-white">Sign out</Text>
                    </Button>
                </form>
            </ScreenCenter>
        </>
    );
};

export default Component;
