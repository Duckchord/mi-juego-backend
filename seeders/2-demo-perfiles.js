const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const perfiles = [];
    for (let i = 0; i < 10; i++) {
      perfiles.push({
        biografia: faker.lorem.paragraph(),
        avatar: faker.image.avatar(),
        usuarioId: i + 1,   // Relación 1 a 1: usuario 1 tiene perfil 1, etc.
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    // ¡Ojo con el nombre exacto de la tabla! Revisa tu migración de Perfil (probablemente 'Perfils' o 'Perfiles').
    // En la migración verás: await queryInterface.createTable('Perfils', { ... })
    await queryInterface.bulkInsert('Perfils', perfiles);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Perfils', null, {});
  }
};