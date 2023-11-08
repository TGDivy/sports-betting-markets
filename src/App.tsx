import { ConfigProvider, FloatButton, Layout, theme } from "antd";
import "antd/dist/reset.css";
import "config/global.css";
import { HeaderSiderFooterLayout } from "layouts/header_sider_footer";
import { EventsPage } from "pages/events_page/events_page";
import { HomePage } from "pages/home_page";
import { Route, Routes } from "react-router-dom";

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
      <Layout className="layout" style={{ minHeight: "100vh", height: "100%" }}>
        <Routes>
          <Route path="" element={<HeaderSiderFooterLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="/:event_domain" element={<EventsPage />} />
            <Route path="login" element={<> Login </>} />
          </Route>
        </Routes>
        <FloatButton.BackTop />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
