"use strict";
module.exports = (sequelize, DataTypes) => {
  const employees = sequelize.define(
    "employees",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      salary: {
        type: DataTypes.STRING,
        allowNull: false
      },
      depId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refrences: {
          model: "department",
          key: "id"
        }
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
  employees.associate = function(models) {
    // associations can be defined here
    employees.belongsTo(models.department, {
      foreignKey: "depId",
      target_key: "id"
    });
  };
  return employees;
};
