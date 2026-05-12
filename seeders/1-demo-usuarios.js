const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const usuarios = Array.from({ length: 10 }).map(() => ({
      nombre: faker.internet.username(),
      correo: faker.internet.email(),
      contrasena: hashedPassword,
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    // Agrega un admin manualmente
    usuarios.push({
      nombre: 'admin',
      correo: 'admin@juego.com',
      contrasena: hashedPassword,
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await queryInterface.bulkInsert('Usuarios', usuarios);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  },
};