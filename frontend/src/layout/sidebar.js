import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

import {
  ProSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  Menu,
  MenuItem,
  SubMenu,
} from 'react-pro-sidebar';

import { useLoadable } from 'mongoose-admin-panel-frontend/lib/hooks/loadable';

import 'react-pro-sidebar/dist/css/styles.css';
import './sidebar.css';

import logo from '../assets/images/logo.png';

function toIcon(iconName) {
  const Icon = require('react-feather')[iconName] || require('react-feather').Database;
  return <Icon size="16px" />;
}

function MySubMenu({ location, menu }) {
  const { path, description, children, icon } = menu;

  const matchedPath = matchPath(location.pathname, path);

  return children && children.length > 0 ? (
    <SubMenu title={description} icon={toIcon(icon)} defaultOpen={true}>
      {children.map((m, i) => (
        <MySubMenu location={location} menu={m} key={i} />
      ))}
    </SubMenu>
  ) : (
    <MenuItem icon={toIcon(icon)} active={matchedPath && matchedPath.isExact}>
      <Link to={path}> {description}</Link>
    </MenuItem>
  );
}

export default function Sidebar({ toggled, handleToggled }) {
  const location = useLocation();
  const { data } = useLoadable({ url: '/menu/all', method: 'get', cacheEnabled: true });

  return (
    <ProSidebar breakPoint="md" toggled={toggled} onToggle={handleToggled}>
      <SidebarHeader>
        <img src={logo} />
      </SidebarHeader>
      <SidebarContent>
        <Menu>
          <MenuItem>
            <Link to="/">Dashboard</Link>
          </MenuItem>

          {data && data.menus && data.menus.length > 0 ? (
            data.menus.map((menu, index) => (
              <MySubMenu location={location} menu={menu} key={index} />
            ))
          ) : (
            <></>
          )}
        </Menu>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </ProSidebar>
  );
}
