'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let data =[
    { name: 'Buah',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    { name: 'Sayur',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    { name: 'Ikan',
      createdAt : new Date(),
      updatedAt : new Date()
    }
   ]
   await queryInterface.bulkInsert('Categories',data,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories',null,{})
  }
};
