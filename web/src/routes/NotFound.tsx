import { Button, Center, Container, Title } from "@mantine/core";
import React, { FC } from "react";
import ScreenCenter from "../components/ui/ScreenCenter";

interface NotFoundPageProps {}

const NotFoundPage: FC<NotFoundPageProps> = ({}) => {
  const goBack = () => window.history.go(-1);

  return (
    <ScreenCenter>
      <Container>
        <Center>
          <Title>404 - Page Not Found :(</Title>
        </Center>
        <Button className="mt-4 w-full" onClick={goBack} variant="outline">
          Click Back
        </Button>
      </Container>
    </ScreenCenter>
  );
};

export default NotFoundPage;
