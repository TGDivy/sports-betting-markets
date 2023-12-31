import { Layout, Menu, MenuProps } from "antd";
import { getEvents } from "api/smarkets_events/smarkets_events";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSessionStorageAPI } from "utils/hook";

type Props = {};

const { Sider } = Layout;

export const MainSider = (props: Props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      style={{
        backgroundColor: "transparent",
      }}
    >
      <CategoriesMenu />
    </Sider>
  );
};

type MenuItem = Required<MenuProps>["items"][number];

const CategoriesMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSessionStorageAPI({
    key: "rootCategories",
    fetchFn: async () => {
      return getEvents({
        type_scope: ["root"],
        include_hidden: false,
        state: ["new", "upcoming", "live"],
        limit: 40,
        sort: "display_order,start_datetime,name",
      });
    },
    expiry: 60 * 60 * 24,
    errorMessageDefault: "Error loading categories",
  });
  const activeKey = location.pathname.split("/")[1];

  if (!data) {
    return null;
  }

  const items: MenuItem[] = data.events.map((event) => {
    const { name, type } = event;
    return {
      key: type.domain,
      label: name,
    };
  });

  return (
    <Menu
      mode="inline"
      activeKey={activeKey}
      selectedKeys={[activeKey]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
      onSelect={({ key }) => {
        navigate(`/${key}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    />
  );
};
