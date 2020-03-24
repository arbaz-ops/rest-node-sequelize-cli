"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let amount = 10;

    while (amount--) {
      data.push({
        name: faker.name.firstName(),
        salary: faker.random.number(),
        depId: faker.random.number({
          min: 1,
          max: 10
        })
      });
    }

    return queryInterface.bulkInsert("employees", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("employees", null, {});
  }
};
