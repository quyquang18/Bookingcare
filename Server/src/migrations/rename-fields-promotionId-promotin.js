module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn("promotions", "promotionId", "typePromotion");
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn("promotions", "typePromotion", "promotionId");
  },
};
