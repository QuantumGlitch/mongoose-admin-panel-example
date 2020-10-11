import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router';

import FormRenderer from 'mongoose-admin-panel-frontend/lib/core/FormRenderer';

const Wrapper = ({ data, children }) => (
  <>
    <nav className="page-breadcrumb">
      <ol className="breadcrumb" style={{ borderRadius: '0' }}>
        <li className="breadcrumb-item">
          <a href="#">Form</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {(data.configuration && data.configuration.title) || 'Default'}
        </li>
      </ol>
    </nav>
    <div className="m-4">{children}</div>
  </>
);

function Form({ url }) {
  return <FormRenderer url={url} Wrapper={Wrapper} />;
}

export default function FormPage() {
  const location = useLocation();
  const [url, setUrl] = useState(location.pathname + location.search);

  useEffect(() => {
    setUrl(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return <Form url={url} />;
}
