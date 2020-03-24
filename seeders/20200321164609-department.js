"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let amount = 10;

    while (amount--) {
      data.push({
        name: faker.company.companyName()
      });
    }

    return queryInterface.bulkInsert("departments", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("departments", null, {});
  }
};
