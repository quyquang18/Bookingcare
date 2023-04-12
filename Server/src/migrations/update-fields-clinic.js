module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("clinics", "image", {
        type: Sequelize.BLOB("long"),
        allowNull: true,
      }),
      queryInterface.addColumn("clinics", "desEndowHtml", Sequelize.TEXT),
      queryInterface.addColumn("clinics", "desEndowMarkdow", Sequelize.TEXT),
      queryInterface.addColumn("clinics", "desIntroHtml", Sequelize.TEXT),
      queryInterface.addColumn("clinics", "desIntroMarkdown", Sequelize.TEXT),
      queryInterface.addColumn("clinics", "desStrengthsHtml", Sequelize.TEXT),
      queryInterface.addColumn("clinics", "desStrengthsMarkdown", Sequelize.TEXT),
      queryInterface.addColumn("clinics", "desEquipmentMarkdown", Sequelize.TEXT),
      queryInterface.addColumn("clinics", "desAddressHtml", Sequelize.TEXT),
      queryInterface.addColumn("clinics", "desAddressMarkdown", Sequelize.TEXT),
      queryInterface.addColumn("clinics", "desProcedureHtml", Sequelize.TEXT),
      queryInterface.addColumn("clinics", "desProcedureMarkdown", Sequelize.TEXT),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("clinics", "image", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.removeColumn("clinics", "desEndowHtml"),
      queryInterface.removeColumn("clinics", "desEndowMarkdow"),
      queryInterface.removeColumn("clinics", "desIntroHtml"),
      queryInterface.removeColumn("clinics", "desIntroMarkdown"),
      queryInterface.removeColumn("clinics", "desStrengthsHtml"),
      queryInterface.removeColumn("clinics", "desStrengthsMarkdown"),
      queryInterface.removeColumn("clinics", "desEquipmentMarkdown"),
      queryInterface.removeColumn("clinics", "desAddressHtml"),
      queryInterface.removeColumn("clinics", "desAddressMarkdown"),
      queryInterface.removeColumn("clinics", "desProcedureHtml"),
      queryInterface.removeColumn("clinics", "desProcedureMarkdown"),
    ]);
  },
};
