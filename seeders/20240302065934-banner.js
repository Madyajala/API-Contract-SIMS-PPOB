'use strict';
const { readFile } = require ('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = JSON.parse(await readFile('./data/banner.json', 'utf-8'))
    .map(el => {
     delete el.id
     el.createdAt = el.updatedAt = new Date
     return el
    })
    await queryInterface.bulkInsert('Banners', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Banners', null, {})
  }
};
