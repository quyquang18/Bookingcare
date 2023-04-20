module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("bookings", "birthday", Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("bookings", "birthday");
  },
};
