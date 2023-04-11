'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Specialty", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nameVn: {
        type: Sequelize.STRING,
      },
      nameEn: {
        type: Sequelize.STRING,
      },
      descriptionMarkdownVn: {
        type: Sequelize.TEXT,
      },
      descriptionMarkdownEn: {
        type: Sequelize.TEXT,
      },
      descriptionHtmlVn: {
        type: Sequelize.TEXT,
      },
      descriptionHtmlEn: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Specialty");
  }
};