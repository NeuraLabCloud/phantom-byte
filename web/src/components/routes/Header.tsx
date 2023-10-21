import React, { FC } from "react";
import headerStyles from "../../styles/header.module.css";
import { Menu, Button, Center, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const headerLinks = [
  { link: "/about", label: "Features" },
  {
    link: "#1",
    label: "Learn",
    links: [
      { link: "/docs", label: "Documentation" },
      { link: "/resources", label: "Resources" },
      { link: "/community", label: "Community" },
      { link: "/blog", label: "Blog" },
    ],
  },
  { link: "/about", label: "About" },
  { link: "/pricing", label: "Pricing" },
  {
    link: "#2",
    label: "Support",
    links: [
      { link: "/faq", label: "FAQ" },
      { link: "/demo", label: "Book a demo" },
      { link: "/forums", label: "Forums" },
    ],
  },
];

interface HeaderProps {
  navOpened: boolean;
  toggleNavOpen: () => void;
}

const Header: FC<HeaderProps> = ({ navOpened, toggleNavOpen }) => {
  const items = headerLinks.map((mappedLinks) => {
    const menuItems = mappedLinks.links?.map((item) => (
      <Menu.Item key={item.link}>
        <Link to={item.link}>{item.label}</Link>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={mappedLinks.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Button
              variant="default"
              component={Link}
              to={mappedLinks.link}
              className={headerStyles.link}
            >
              <Center>
                <span className={headerStyles.linkLabel}>
                  {mappedLinks.label}
                </span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </Button>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={mappedLinks.label}
        to={mappedLinks.link}
        className={headerStyles.link}
      >
        {mappedLinks.label}
      </Link>
    );
  });

  return (
    <>
      <Burger
        opened={navOpened}
        onClick={toggleNavOpen}
        hiddenFrom="sm"
        size="sm"
      />
      <Container size="md">
        <Center>
          <div className={headerStyles.inner}>
            <Group gap={5} visibleFrom="sm">
              {items}
            </Group>
          </div>
        </Center>
      </Container>
    </>
  );
};

export default Header;
