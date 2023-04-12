module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Clinics", "desEquipmentHtml", Sequelize.TEXT);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Clinics", "desEquipmentHtml");
  },
};
