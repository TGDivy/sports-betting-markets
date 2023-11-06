import { Breadcrumb, ConfigProvider, Layout, theme, Typography } from "antd";
import "antd/dist/reset.css";
import { MainHeader } from "components/header/header";
import { MainSider } from "components/sider/sider";
import "config/global.css";
import { Suspense } from "react";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";

const { Content } = Layout;
const { Text } = Typography;

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

  // const breadCrumbItems = location.pathname
  //   .split("/")
  //   .filter((item) => item)
  //   .map((item) => ({ title: item, href: item }));
  const breadCrumbItems = [
    { title: "Home", path: "" },
    ...location.pathname
      .split("/")
      .filter((item) => item)
      .map((item) => ({ title: item, href: item })),
  ];

  console.log(breadCrumbItems);
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
            <Route
              path="*"
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
