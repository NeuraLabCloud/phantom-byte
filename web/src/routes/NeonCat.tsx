import React, { FC } from "react";
import NeonCatAnimation from "../components/ui/animations/neon-cat/NeonCatAnimation";
import ScreenCenter from "../components/ui/ScreenCenter";
import { Button, Title } from "@mantine/core";
import { Link } from "react-router-dom";

interface NeonCatProps {}

const NeonCat: FC<NeonCatProps> = ({}) => {
  return (
    <ScreenCenter>
      <NeonCatAnimation />
      <Button variant="outline" component={Link} to={"/"}>
        <Title className={`text-red-300`}>Home</Title>
      </Button>
    </ScreenCenter>
  );
};

export default NeonCat;
