module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([queryInterface.renameColumn("Clinics", "image", "avatar"), queryInterface.addColumn("Clinics", "coverImage", Sequelize.BLOB("long"))]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([queryInterface.renameColumn("Clinics", "avatar", "image"), queryInterface.removeColumn("Clinics", "coverImage")]);
  },
};
