'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios', 'role', {
      type: Sequelize.STRING(20),
      defaultValue: 'USER',
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('Usuarios', 'role');
  }
};