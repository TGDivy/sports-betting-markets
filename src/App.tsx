import "antd/dist/reset.css";
import "config/global.css";
import React, { useEffect } from "react";
import { getEvents } from "./api/smarkets-events/smarkets-events";
import {
  Breadcrumb,
  ConfigProvider,
  Layout,
  Menu,
  theme,
  Typography,
} from "antd";
import { Outlet, Route, Routes } from "react-router-dom";
import { MainHeader } from "components/header/header";
import { MainSider } from "components/sider/sider";

const { Content } = Layout;
const { Text } = Typography;

const Outline = () => {
  return (
    <>
      <MainHeader />
      <Layout>
        <MainSider />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

const App = () => {
  // useEffect(() => {
  //   getEvents({
  //     type_scope: ["root"],
  //     include_hidden: false,
  //     state: ["new", "upcoming", "live"],
  //     limit: 40,
  //     sort: "id",
  //   }).then((events) => {
  //     console.log(events);
  //   });
  // }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          wireframe: true,
          colorPrimary: "#04B073",
        },
        algorithm: theme.darkAlgorithm,
        components: {
          Typography: {
            titleMarginBottom: 0,
            fontWeightStrong: 400,
          },
        },
      }}
    >
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="" element={<Outline />}>
            <Route
              path=""
              element={
                <>
                  {" "}
                  <Text> Hello World</Text>{" "}
                </>
              }
            />
            <Route path="login" element={<> Login </>} />
          </Route>
        </Routes>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
