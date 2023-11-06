import { Button, Flex, Layout, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const { Header } = Layout;

export const MainHeader = (props: Props) => {
  return (
    <Header
      about="header"
      style={{
        width: "100%",
        height: "48px",
        backgroundColor: "#0D0D0D",
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Link to="/">
          <Button
            type="text"
            size="large"
            icon={
              <img
                src="https://smarkets.com/static/assets/smarkets-logo.33cf24e1279443342527.svg"
                alt="logo"
                style={{
                  height: "22px",
                }}
              />
            }
            style={{
              flexDirection: "row",
              display: "flex",
              placeContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.Title level={4}>Prototype</Typography.Title>
          </Button>
        </Link>
      </Flex>
    </Header>
  );
};
