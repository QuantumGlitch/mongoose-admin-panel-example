![Mongoose Admin Panel Logo](./logo.png)

# Mongoose Admin Panel Example

Package for generating an admin panel for Mongoose. In this example project you will find a React frontend and an Express backend. Example for [MAP](https://github.com/QuantumGlitch/mongoose-admin-panel).

# Screenshots

Few examples from ![Screenshot 0](./screenshots/0.png) ![Screenshot 1](./screenshots/1.png) ![Screenshot 2](./screenshots/2.png) ![Screenshot 3](./screenshots/3.png) ![Screenshot 4](./screenshots/4.png) ![Screenshot 5](./screenshots/5.png) ![Screenshot 6](./screenshots/6.png)

# Setup

## Installation

1. Download this project

```shell
git clone https://github.com/QuantumGlitch/mongoose-admin-panel-example.git
```

2. Install
   Open the downloaded directory and execute

```shell
npm run install
```

3. Configure the .env file
   You will find this default config, change it with what you need:

```ini
# BackEnd URL configuration, in this case is http://localhost:3001/api/
BACKEND_PROTOCOL=http
BACKEND_HOST=localhost
BACKEND_PORT=3001
BACKEND_BASE_PATH=/api/

# FrontEnd URL configuration, in this case is http://localhost:3000/admin/
FRONTEND_PROTOCOL=http
FRONTEND_HOST=localhost
FRONTEND_PORT=3000
FRONTEND_BASE_PATH=/admin/

# Database configuration
DB_CONNECTION_STRING=mongodb://root:password@localhost:27017/admin
DB_NAME=mongoose-admin-panel-example
```

4. Load your models (watch after)
5. Define new menus (watch after)

**N.B.** anytime you change the .env file you need to run the following command:

```shell
npm run init
```

Ready!

# Configuration

## Load your models - entities

First of all, you need to load the models that describe your data and register them as Entities.
[What is an entity?](https://github.com/QuantumGlitch/mongoose-admin-panel#user-content-entity)
You can put your mongoose models under **backend/models**.

N.B. change the file **configurate.js** if you want to provide different paths in which find models.

## Defining a Model - Entity

You can define the model as you normally would with mongoose, or using the project helpers.
Example:

```js
const mongoose = require('mongoose');

/**
 * Entity manager
 */
const Entity = require('mongoose-admin-panel-backend/models/entity');

/**
 * Schema
 */
const modelName = 'Manufacturer';
const schema = new mongoose.Schema({
  _id: {
    kind: 'String',
    type: mongoose.Schema.Types.ObjectId,
    readOnly: true,
    default: 0,
    description: 'Id',
  },
  name: {
    kind: 'String',
    type: String,
    required: true,
    description: 'Name',
  },
});

const model = mongoose.model(modelName, schema);

// Register this entity globally and on database
Entity.register(
  {
    // Id of this entity (usually the modelName is OK)
    id: modelName,
    // Optional: A way to reach this entity by url for standard forms (you can omit this field, if you want to make it not reachable)
    path: 'manufacturer',
    // Optional: This field provide population paths for references and sub references, when using the entity inside a DataTable. (you can omit it or using the helper for selecting all)
    populationOptions:
      {
        normal: [{ path: 'ref' }],
        sub: [{ path: 'subRef' }],
      } ||
      // Get all populable paths for this schema
      require('mongoose-admin-panel-backend/models/helpers/utilities').allPopulationOptions(schema),
    // Descriptive text
    description: 'Manufacturers',
  },
  model
);

module.exports = model;
```

or using helpers

```js
/**
 * Helpers
 */
const defaultSchema = require('mongoose-admin-panel-backend/models/helpers/default-schema');
const defaultModel = require('mongoose-admin-panel-backend/models/helpers/default-model');

/**
 * Fields
 */
const { integer, string } = require('mongoose-admin-panel-backend/models/helpers/primitive');

/**
 * Schema
 */
const modelName = 'Manufacturer';
const schema = defaultSchema(
  {
    _id: integer({
      readOnly: true,
      default: 0,
      description: 'Id',
    }),
    name: string({
      required: true,
      description: 'Name',
    }),
  },
  {
    modelName,
    // [Optional, Default=false] If you want the id to be a number and be progressively incremented, set this to true
    progressiveId: true,
    // [Optional, Default=true] Enable a set of custom validators that can be used to validate some kind of fields (email, telephone, array)
    customValidators: true,
    // [Optional, Default=true] Enable the schema to include (createdAt, createdBy, editedAt, editedBy)
    defaultDates: true,
    // [Optional, Default=true] Enable soft delete on the schema
    softDelete: true,
    // [Optional, Default=true] Enable references/relationships integrity more info on https://github.com/QuantumGlitch/mongoose-references-integrity-checker
    referencesIntegrityChecker: true,
    // [Optional, Default=true] Enable sub-references/sub-relationships integrity more info on https://github.com/QuantumGlitch/mongoose-sub-references-integrity-checker
    subReferencesIntegrityChecker: true,
  }
);

// Register the entity and returns the model
const model = defaultModel(modelName, schema, {
  description: 'Manufacturers',
  // If you want specify the following, or they will be generated automatically
  path: 'path',
  populationOptions: {},
});

module.exports = model;
```

This will generate the model and register the **Entity**.

### Fields

As you saw, in the model there are different kinds of fields that be defined through helpers.
The property **kind** on schema type is useful for the frontend component's Detail, so it can understand how to show the field while the property **description** it's the label associated with the field.

Let's see them.

#### Primitive

Helper file: _mongoose-admin-panel-backend/models/helpers/primitive_

| **Field** | **Type** | **Kind** | **Helper** | **Options**                                              |
| --------- | -------- | -------- | ---------- | -------------------------------------------------------- |
| Boolean   | Boolean  | Boolean  | boolean    |                                                          |
| String    | String   | String   | string     |                                                          |
| Integer   | Number   | Integer  | integer    |                                                          |
| Decimal   | Number   | Decimal  | decimal    | **fixed** ( how many digits after the zero are allowed ) |
| Date      | Date     | Date     | date       |                                                          |

#### Complex

##### Object

Helper file: _mongoose-admin-panel-backend/models/helpers/object_

This makes an object field or single nested document:

```js
const { object } = require('mongoose-admin-panel-backend/models/helpers/object');
const { integer } = require('mongoose-admin-panel-backend/models/helpers/primitive');

defaultSchema({
  // ...
  objectField: object(
    // SchemaType Options for this object field
    { required: true, description: 'Object Field', default: () => ({ integerField: 2 }) },
    // Schema Options for this object field
    {
      integerField: integer({ required: true }),
      nestedObjectField: object({ required: false }),
      anyOtherField: {
        // ...
      },
    }
  ),
  // ...
});
```

##### Enumerator

Helper file: _mongoose-admin-panel-backend/models/helpers/enumerator_

This makes an enumerator field, or a field that allows only a specific domain of values:

```js
const { enumerator } = require('mongoose-admin-panel-backend/models/helpers/enumerator');
const { integer } = require('mongoose-admin-panel-backend/models/helpers/primitive');

// Enum object
const Status = {
  Closed: { code: 0, description: 'Closed' },
  Open: { code: 1, description: 'Open' },
};

defaultSchema({
  // ...
  statusField: enumerator(Status, integer({ required: true })),
  // or
  statusField: enumerator(Status, { type: Number, kind: 'Integer', required: true }),
  // ...
});
```

##### Bound to

Helper file: _mongoose-admin-panel-backend/models/helpers/bound_

A bound to field is used specifically in the case we need to store a sub reference or a reference to a sub document and the reference to the root document (the same of the sub reference).
For a detailed explaination read this [Sub references integrity checker - Bound to fields](https://github.com/QuantumGlitch/mongoose-sub-references-integrity-checker#user-content-bound-to---schematype-option).

```js
const { boundTo } = require('mongoose-admin-panel-backend/models/helpers/bound');

defaultSchema({
  // ...
  customer: {
    required: true,
    ref: 'RegistriesCustomer',
    description: 'Customer',
  },

  customerContact: boundTo(
    { field: 'customer', ref: 'Customer.contacts' },
    {
      description: 'Contact of the customer',
      required: true,
    }
  ),
  // ...
});
```

##### Array

Define arrays like you normally would in mongoose.

### Relationships

You can define references and sub references on every field. This is implemented by the plugin [mongoose-references-integrity-checker](https://github.com/QuantumGlitch/mongoose-references-integrity-checker) and [mongoose-sub-references-integrity-checker](https://github.com/QuantumGlitch/mongoose-sub-references-integrity-checker).

## Defining a Menu

In order to make accessible your models, you need to expose a menu voice linked to them.
You can setup the menu in the file **backend/boot.js**.
In this file, under the comment '**#region Menu Setup**' you can add the instruction:

```js
await Menu.updateOne(
  { _id: orderOfTheMenu },
  {
    description: 'Menu Label',
    // This menu will be visible only for who has the UserPermission set to _read = true for the entity specified
    permissions: ['Entity0', 'Entity1', ...],
    children: [
      {
        // Same menu structure
        // description, permissions, children
        // plus the url to reach it
        description: 'Form',
        permissions: [],

        // See the next section, Forms
        // If you don't know the entity's path because it's generated automatically, watch on the collection 'entities' of MongoDB
        path: '/form/entity-0'
      },
    ],
  },
  { upsert: true }
);
```

## Defining a Form

This is another core concept of the project. The **Form** is the connection point between frontend - backend - database. The **Form** is a **[Component](https://github.com/QuantumGlitch/mongoose-admin-panel#user-content-component)**.

By default the library **mongoose-admin-panel-backend** provides a set of standard libraries. Some of these also have standard urls.

### Standard Forms

The following are the standard forms:

| **Form**        | **Url**                           | **Description**                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| DefaultForm     | /form/default-form/_{entityPath}_ | This the default available form. It provides all the basic **CRUD** operations if the permissions on the users allows it. A Grid will be available to show the current page of documents with a Filters Tab to filter the results, a Detail to show the current document on the Grid and edit it.                                                                                                            |
| RefForm         | /form/ref-form/_{entityPath}_     | This the form used by **RefInput** to select the reference on another collection. This form provides only a GridComponent with a Filters Tab to filter the result.                                                                                                                                                                                                                                           |
| ConstrainedForm | No                                | This form can be used to divide the visualization in Tabs. The first tab shows the main Entity Detail and Grid, any other tabs show a part of the relationship with the main document: they show the documents of other entities that has a foreign key setted equal to a primary key of the current document. **e.g** For example the form **User**, always included in the admin panel, it's of this type. |

### Custom Forms

If you want to define a new kind of form, then you need to create a new directory **backend/core/forms/<new-form-name>** always containing a **Form.js** file that exports the form in question.
This form will be accessible by the url **form/<new-form-name>**.
For example in this project you can find **/core/forms/manufacturer/Form.js**. By default the standard form **ConstrainedForm** is not accessible by url so let's look into manufacturer.

```js
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
```

This implementation will be accessible at **/form/manufacturer**.

N.B. change the file **configurate.js** if you want to provide different paths in which find forms.

# Development

To run the backend

```shell
npm run backend
```

To run the frontend

```shell
cd frontend
npm run start
```

# Deploy

If you want to deploy the app, you just need to build the frontend :

```shell
npm run build
```

then to run the backend and frontend

```shell
npm run backend
npm run frontend
```

You can host the frontend anywhere you want, this is just a helper.

# Support

If you would like to support my work, ⭐ this project, or [please buy me a coffe ☕](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HRVBJMSU9CQXW).
Thanks in advice.
