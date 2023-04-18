'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specialty.hasMany(models.Doctor_infor, {
        foreignKey: "id",
        as: "SpecialtyData",
      });
    }
  };
  Specialty.init(
    {
      nameVn: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      descriptionMarkdownVn: DataTypes.TEXT,
      descriptionMarkdownEn: DataTypes.TEXT,
      descriptionHtmlVn: DataTypes.TEXT,
      descriptionHtmlEn: DataTypes.TEXT,
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Specialty",
      freezeTableName: true,
    }
  );
  return Specialty;
};