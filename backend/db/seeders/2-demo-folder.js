'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Folders', [
      { userId: 1, title: 'Pie Recipes' },
      { userId: 1, title: 'Best Cookies' },
      { userId: 1, title: 'Weight Loss Notes' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
