const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const habilidades = [];
    for (let i = 0; i < 15; i++) {
      habilidades.push({
        nombre: faker.lorem.words(2),
        descripcion: faker.lorem.sentence(),
        incremento_ataque: faker.number.int({ min: 1, max: 20 }),
        incremento_defensa: faker.number.int({ min: 1, max: 20 }),
        incremento_estamina: faker.number.int({ min: 1, max: 20 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Habilidads', habilidades); // Ojo plural: 'Habilidads'
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Habilidads', null, {});
  }
};