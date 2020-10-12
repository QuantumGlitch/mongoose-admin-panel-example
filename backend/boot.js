const Menu = require('mongoose-admin-panel-backend/models/menu');

module.exports = async function () {
  // First of all configurate the backend, with essentials information
  require('./configurate');

  // Async: Initialize database (default models and default data)
  await require('mongoose-admin-panel-backend')();

  //#region Menu Setup
  await Menu.updateOne(
    { _id: 1 },
    {
      description: 'Products',
      permissions: [],
      children: [
        {
          description: 'Default',
          permissions: [],
          children: [
            {
              path: `/form/default-form/manufacturer`,
              permissions: ['Manufacturer'],
              description: 'Manufacturers',
              icon: 'Tool',
            },
            {
              path: '/form/default-form/product',
              permissions: ['Product'],
              description: 'Products',
              icon: 'Package',
            },
          ],
        },
        {
          description: 'Custom',
          permissions: [],
          children: [
            {
              path: `/form/manufacturer`,
              permissions: ['Manufacturer'],
              description: 'Manufacturers',
              icon: 'Tool',
            },
          ],
        },
      ],
    },
    { upsert: true }
  );
  ////#endregion
};
