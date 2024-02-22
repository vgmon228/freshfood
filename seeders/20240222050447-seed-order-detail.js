'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let data = [
    {
      OrderId:1,
      ProductId:1,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      OrderId:1,
      ProductId:2,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      OrderId:2,
      ProductId:3,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      OrderId:2,
      ProductId:7,
      createdAt : new Date(),
      updatedAt : new Date()
    }
   ]
   await queryInterface.bulkInsert('OrderDetails',data,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderDetails',null,{})
  }
};
