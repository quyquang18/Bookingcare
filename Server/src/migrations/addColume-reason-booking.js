module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("bookings", "reason", Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("bookings", "reason");
  },
};
