const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Recipe_Diet",
    {},
    {
      timestamps: false,
    }
  );
};