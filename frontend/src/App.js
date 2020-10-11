import React from 'react';

import Loader from 'mongoose-admin-panel-frontend/lib/services/API/Loader';
import Messages from 'mongoose-admin-panel-frontend/lib/services/Messages';
import Auth from 'mongoose-admin-panel-frontend/lib/services/Auth';

import Layout from './layout';

import LoginPage from './pages/login';

function App() {
  return (
    <>
      <Loader />
      <Messages />
      <Auth logged={() => <Layout />} anonymous={() => <LoginPage />} />
    </>
  );
}

export default App;
