'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [
      {
        order :'1FEB1708577387901',
        status :'Pending',
        orderDate : new Date(),
        UserId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        order :'2FEB1708577387901',
        status :'Delivered',
        orderDate : new Date(),
        UserId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ]
    await queryInterface.bulkInsert('Orders',data,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders',null,{})
  }
};
