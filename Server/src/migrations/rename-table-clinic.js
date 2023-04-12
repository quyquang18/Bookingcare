module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameTable("clinics", "Clinics");
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameTable("Clinics", "clinics");
  },
};
