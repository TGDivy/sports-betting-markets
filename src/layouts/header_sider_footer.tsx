import { Breadcrumb, Layout, Spin } from "antd";
import { MainHeader } from "components/header/header";
import { MainSider } from "components/sider/sider";
import { Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Content } = Layout;

const itemRender = (route: any, params: any, routes: any, paths: any) => {
  const last = routes.indexOf(route) === routes.length - 1;
  const formattedRoute = route.title.replace(/_/g, " ");
  return last ? (
    <span
      style={{
        textTransform: "capitalize",
      }}
    >
      {formattedRoute}
    </span>
  ) : (
    <Link
      to={paths.join("/")}
      style={{
        textTransform: "capitalize",
      }}
    >
      {formattedRoute}
    </Link>
  );
};

export const HeaderSiderFooterLayout = () => {
  const location = useLocation();

  const breadCrumbItems = [
    { title: "Home", path: "" },
    ...location.pathname
      .split("/")
      .filter((item) => item)
      .map((item) => ({ title: item, href: item })),
  ];

  return (
    <Suspense fallback={<Spin fullscreen />}>
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
