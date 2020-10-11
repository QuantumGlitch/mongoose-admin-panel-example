import React from 'react';

import Auth from 'mongoose-admin-panel-frontend/lib/services/Auth';

export default function DashboardPage() {
  return (
    <div className="ml-4 mt-4">
      <h1>Dashboard</h1>

      <p>
        Welcome on Mongoose Admin Panel Example, <strong>{Auth.user.get('username')}</strong>
      </p>

      <h3 className="mb-2">What can I do?</h3>
      <p>
        You can access your personal sections by the <strong>side menu</strong> on the{' '}
        <strong>left</strong>.<br />
        You can <strong>log-out</strong> using the menu in the <strong>up right corner</strong>.
      </p>
    </div>
  );
}
