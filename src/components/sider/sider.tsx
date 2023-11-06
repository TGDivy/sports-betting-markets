import { Layout, Menu, MenuProps } from "antd";
import { getEvents } from "api/smarkets-events/smarkets-events";
import React, { useState } from "react";
import { eventTypeDomain } from "types/smarket-events";
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
    >
      <CategoriesMenu />
    </Sider>
  );
};

type MenuItem = Required<MenuProps>["items"][number];

const getPopularCategories = async (type_domain: eventTypeDomain) => {
  const { events } = await getEvents({
    type_domain: [type_domain],
    type_scope: ["category"],
    include_hidden: false,
    state: ["new", "upcoming", "live"],
    limit: 15,
    sort: "display_order,start_datetime,name",
  });

  return events;
};

const CategoriesMenu = () => {
  // const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [activeKey, setActiveKey] = useState<eventTypeDomain>();
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
  });

  // const data = null;
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
      openKeys={[activeKey || ""]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
      onSelect={({ key }) => setActiveKey(key as eventTypeDomain)}
    />
  );
};