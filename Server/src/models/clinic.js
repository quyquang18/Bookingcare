'use strict';
const { Model, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clinic.hasOne(models.Doctor_infor, {
        foreignKey: "clinicId",
        as: "ClinicData",
      });
    }
  }
  Clinic.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      desEndowHtml: DataTypes.TEXT,
      desEndowMarkdow: DataTypes.TEXT,
      desIntroHtml: DataTypes.TEXT,
      desIntroMarkdown: DataTypes.TEXT,
      desStrengthsHtml: DataTypes.TEXT,
      desStrengthsMarkdown: DataTypes.TEXT,
      desEquipmentHtml: DataTypes.TEXT,
      desEquipmentMarkdown: DataTypes.TEXT,
      desAddressHtml: DataTypes.TEXT,
      desAddressMarkdown: DataTypes.TEXT,
      desProcedureHtml: DataTypes.TEXT,
      desProcedureMarkdown: DataTypes.TEXT,
      avatar: DataTypes.BLOB("long"),
      coverImage: DataTypes.BLOB("long"),
      countBooking: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Clinic",
    }
  );
  return Clinic;
};