import React from 'react';
import Grid from 'mongoose-admin-panel-frontend/lib/core/components/Grid';

// Incapsulate the old grid, just add a margin on the top
export default function MyGrid(props) {
  return (
    <div className="mt-4">
      <Grid {...props} />
    </div>
  );
}
