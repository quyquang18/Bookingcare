"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Promotion.belongsTo(models.Allcode, {
        foreignKey: "typePromotion",
        targetKey: "keyMap",
        as: "promotionData",
      });
    }
  }
  Promotion.init(
    {
      name: DataTypes.STRING,
      typePromotion: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Promotion",
    }
  );
  return Promotion;
};
