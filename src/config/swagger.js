const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',

    info: {
      title: 'Products CRUD API',
      version: '1.0.0',
      description: 'CRUD API สำหรับจัดการสินค้า'
    },

    servers: [
      {
        url:  '/'
      }
    ],

    tags: [
      {
        name: 'Products',
        description: 'จัดการสินค้า'
      }
    ]
  },

  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);