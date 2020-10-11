const ConstrainedForm = require('mongoose-admin-panel-backend/core/forms/ConstrainedForm');

// Customize ConstrainedForm
class ManufacturerForm extends ConstrainedForm {
  constructor({ auth, initialization, parameters }) {
    super({
      auth,
      initialization,
      parameters,
      title: 'Manufacturers with products',
      mainEntityName: 'Manufacturer',
      secondaryEntities: [
        {
          entityName: 'Product',
          foreignKey: 'manufacturer',
        },
      ],
    });
  }
}

module.exports = ManufacturerForm;
