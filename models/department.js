"use strict";
module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define(
    "department",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      hooks: {
        beforeValidate: () => {
          console.log("Before Validation.");
        },
        beforeCreate: () => {
          console.log("Before Creating.");
        },
        afterCreate: () => {
          console.log("After Creating.");
        },
        afterValidate: () => {
          console.log("After Validation.");
        },
        beforeBulkCreate: () => {
          console.log("Creating Bulk.");
        },
        afterBulkCreate: () => {
          console.log("Bulk created.");
        }
      }
    }
  );
  department.associate = function(models) {
    // associations can be defined here
    department.hasMany(models.employees, {
      foreignKey: "depId"
    });
  };
  return department;
};
