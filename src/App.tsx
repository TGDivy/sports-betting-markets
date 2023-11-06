import { Breadcrumb, ConfigProvider, Layout, theme } from "antd";
import "antd/dist/reset.css";
import { MainHeader } from "components/header/header";
import { MainSider } from "components/sider/sider";
import "config/global.css";
import { EventsPage } from "pages/events_page";
import { HomePage } from "pages/home_page";
import { Suspense } from "react";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";

const { Content } = Layout;

const itemRender = (route: any, params: any, routes: any, paths: any) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.title}</span>
  ) : (
    <Link to={paths.join("/")}>{route.title}</Link>
  );
};

const Outline = () => {
  const location = useLocation();

  const breadCrumbItems = [
    { title: "Home", path: "" },
    ...location.pathname
      .split("/")
      .filter((item) => item)
      .map((item) => ({ title: item, href: item })),
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainHeader />
      <Layout>
        <MainSider />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={breadCrumbItems}
            itemRender={itemRender}
          />

          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Suspense>
  );
};

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          wireframe: true,
          colorPrimary: "#04B073",
          borderRadius: 1,
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
            <Route path="" element={<HomePage />} />
            <Route path="/:event_domain" element={<EventsPage />} />
            <Route path="login" element={<> Login </>} />
          </Route>
        </Routes>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
