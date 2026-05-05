const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const personajes = [];
    for (let perfilId = 1; perfilId <= 10; perfilId++) {
      // 2 personajes por perfil
      for (let i = 0; i < 2; i++) {
        personajes.push({
          nombre: faker.person.firstName(),
          descripcion: faker.lorem.sentence(),
          ataque: faker.number.int({ min: 10, max: 100 }),
          defensa: faker.number.int({ min: 10, max: 100 }),
          estamina: faker.number.int({ min: 10, max: 100 }),
          perfilId: perfilId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert('Personajes', personajes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Personajes', null, {});
  }
};