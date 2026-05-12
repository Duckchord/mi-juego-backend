const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const usuarios = [];
    for (let i = 0; i < 10; i++) {
      usuarios.push({
        nombre: faker.internet.username(),
        correo: faker.internet.email(),
        contrasena: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Usuarios', usuarios);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};