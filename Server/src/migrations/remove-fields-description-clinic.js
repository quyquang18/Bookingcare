module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("clinics", "description");
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("clinics", "description", Sequelize.TEXT);
  },
};
