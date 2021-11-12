'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notes', [
      { userId: 1, folderId: 1, title: 'note-1', content: faker.lorem.paragraphs() },
      { userId: 1, folderId: 1, title: 'note-2', content: faker.lorem.paragraphs() },
      { userId: 1, folderId: 2, title: 'note-3', content: faker.lorem.paragraphs() },
      { userId: 1, folderId: 2, title: 'note-4', content: faker.lorem.paragraphs() },
      { userId: 1, folderId: 3, title: 'note-5', content: faker.lorem.paragraphs() },
      { userId: 1, folderId: 3, title: 'note-6', content: faker.lorem.paragraphs() },
      { userId: 1, title: 'note-1', content: faker.lorem.paragraphs() },
      { userId: 1, title: 'note-2', content: faker.lorem.paragraphs() },
      { userId: 2, folderId: 2, title: 'note-3', content: faker.lorem.paragraphs() },
      { userId: 3, title: 'note-4', content: faker.lorem.paragraphs() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
