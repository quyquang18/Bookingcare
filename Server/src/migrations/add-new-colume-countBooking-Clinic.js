module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Clinics", "countBooking", Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Clinics", "countBooking");
  },
};
