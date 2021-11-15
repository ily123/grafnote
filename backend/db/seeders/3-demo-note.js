'use strict';
const faker = require('faker');
const { README } = require('../utils');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notes', [
      { userId: 1, title: 'README.md', content: README },
      { userId: 1, folderId: 1, title: 'Apple pie', content: faker.lorem.paragraphs() },
      { userId: 1, folderId: 1, title: 'Peach pie', content: faker.lorem.paragraphs() },
      { userId: 1, folderId: 2, title: 'Gingerbread', content: faker.lorem.paragraphs() },
      { userId: 1, folderId: 2, title: 'Snickerdoodle', content: faker.lorem.paragraphs() },
      { userId: 1, folderId: 3, title: 'P-9001-X', content: faker.lorem.paragraphs() },
      { userId: 2, folderId: 2, title: 'note-3', content: faker.lorem.paragraphs() },
      { userId: 3, title: 'note-4', content: faker.lorem.paragraphs() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
