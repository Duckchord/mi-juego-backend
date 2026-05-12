const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    const usuarios = [];

    // Un usuario ADMIN con credenciales conocidas para probar
    usuarios.push({
      nombre: 'Administrador',
      correo: 'admin@juego.com',
      contrasena: await bcrypt.hash('admin123', SALT_ROUNDS),
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Un usuario USER con credenciales conocidas para probar
    usuarios.push({
      nombre: 'Usuario Demo',
      correo: 'user@juego.com',
      contrasena: await bcrypt.hash('user123', SALT_ROUNDS),
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 8 usuarios random adicionales (todos USER)
    for (let i = 0; i < 8; i++) {
      usuarios.push({
        nombre: faker.internet.username(),
        correo: faker.internet.email(),
        contrasena: await bcrypt.hash(faker.internet.password(), SALT_ROUNDS),
        role: 'USER',
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