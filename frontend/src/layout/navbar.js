import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import { LogOut, User, Menu } from 'react-feather';

import Auth from 'mongoose-admin-panel-frontend/lib/services/Auth';

import './navbar.css';

function UserProfile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <NavItem id="user-profile">
      <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
        <DropdownToggle caret>
          <User size="24px" fill="white" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>
            <div className="info text-center">
              <p className="font-weight-bold">
                {Auth.user.get('name')} {Auth.user.get('surname')}
              </p>
              <p className="text-muted">{Auth.user.get('username')}</p>
            </div>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => Auth.logout()}>
            <LogOut size="16px" className="mr-2" />
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavItem>
  );
}

export default function Navbar({ setToggledSidebar }) {
  return (
    <nav id="navbar">
      <div id="navbar-content">
        <Nav>
          <div className="left">
            <NavItem className="sidebar-toggler" onClick={() => setToggledSidebar(true)}>
              <Button>
                <Menu />
              </Button>
            </NavItem>
          </div>
          <div className="right">
            <UserProfile />
          </div>
        </Nav>
      </div>
    </nav>
  );
}
