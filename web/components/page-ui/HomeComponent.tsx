"use client";

import React, { FC } from "react";
import { Center, Title, Button, Text } from "@mantine/core";
import ColoredLetters from "@/components/ui/ColoredLetters";
import Particles from "@/components/ui/particles/Particles";
import Link from "next/link";

interface ComponentProps {
  clientReady: boolean;
  isAuthed: boolean;
}

const Component: FC<ComponentProps> = async ({ clientReady, isAuthed }) => {
  return (
    <>
      <div className="relative w-screen h-screen">
        <div className="flex flex-col justify-center h-screen">
          <Center>
            <Title>
              <ColoredLetters
                className="text-center text-6xl md:text-9xl mb-4 text-zinc-100 drop-shadow-xl"
                letters={[
                  "P",
                  "h",
                  "a",
                  "n",
                  "t",
                  "o",
                  "m",
                  " ",
                  "B",
                  "y",
                  "t",
                  "e",
                ]}
                tailwindClasses={[
                  "text-red-500",
                  "text-blue-500",
                  "text-green-500",
                  "text-purple-500",
                  "text-orange-500",
                  "text-yellow-500",
                  "text-rose-500",
                  "text-zinc-100",
                  "text-cyan-500",
                  "text-amber-700",
                  "text-teal-500",
                  "text-fuchsia-500",
                ]}
                style={{ fontFamily: "Nosifer" }}
              />
            </Title>
          </Center>
          <Center>
            <Text size="lg" className="text-white mt-10">
              A Reliable Cloud Logging Solution
            </Text>
          </Center>
          <Center>
            <Button
              component={Link}
              href={"/dashboard"}
              variant="outline"
              className="mt-5 animate-pulse"
              disabled={!clientReady}
            >
              <Text className="text-white">
                {isAuthed ? "View Dashboard" : "Login"}
              </Text>
            </Button>
          </Center>
        </div>
      </div>
      {/* Particle Animation embedded into the site. */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          mixBlendMode: "screen",
        }}
      >
        <Particles />
      </div>
    </>
  );
};

export default Component;
