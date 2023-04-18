module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn("markdowns", "specialtyId"), queryInterface.removeColumn("markdowns", "clinicId")]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("markdowns", "specialtyId", Sequelize.INTEGER),
      queryInterface.addColumn("markdowns", "clinicId", Sequelize.INTEGER),
    ]);
  },
};
