import { Button, Center, Text, Title } from "@mantine/core";
import Particles from "../components/ui/animations/particles/Particles";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ColoredLetters from "../components/ui/ColoredLetters";

export default () => {
  const auth = useAuth()?.isAuthenticated;

  return (
    <>
      <div className="relative w-screen h-screen">
        <div className="flex flex-col justify-center h-screen">
          <Center>
            <Title>
              <ColoredLetters
                className="text-center text-6xl md:text-9xl mb-4 text-zinc-100 drop-shadow-xl group"
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
              to={"/dashboard"}
              variant="outline"
              className="mt-5 animate-pulse"
            >
              <Text className="text-white">
                {auth ? "Dashboard" : "Get Started"}
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
