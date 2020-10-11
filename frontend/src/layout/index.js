import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './navbar';
import Footer from './footer';
import Sidebar from './sidebar';

import DashboardPage from '../pages/dashboard';
import FormPage from '../pages/form';

import config from '../config.json';

import './index.css';

const basePath = config.baseUrl.replace(/^[^:]*:\/\/[^\/]*/, '');

export default function Layout() {
  const [toggledSidebar, setToggledSidebar] = useState(false);

  return (
    <div id="layout">
      <Router basename={basePath}>
        <Sidebar toggled={toggledSidebar} handleToggled={setToggledSidebar} />
        <main>
          <Navbar setToggledSidebar={setToggledSidebar} />
          <div>
            <Switch>
              <Route path="/" exact>
                <DashboardPage />
              </Route>
              <Route path="/form/">
                <FormPage />
              </Route>
            </Switch>
          </div>
          <Footer />
        </main>
      </Router>
    </div>
  );
}
