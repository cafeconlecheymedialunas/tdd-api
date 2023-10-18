'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    try {
      const createdPermissions = await queryInterface.bulkInsert('permissions', [
        {
          route: 'user',
          method: 'POST',
        },
        {
          route: 'user/:id',
          method: 'GET',
        },
        {
          route: 'user',
          method: 'GET',
        },
        {
          route: 'user/:id',
          method: 'PUT',
        },
        {
          route: 'user/:id',
          method: 'DELETE',
        },
        {
          route: 'role',
          method: 'POST',
        },
        {
          route: 'role',
          method: 'GET',
        },
        {
          route: 'role/:id',
          method: 'GET',
        },
        {
          route: 'role/:id',
          method: 'PUT',
        },
        {
          route: 'role/:id',
          method: 'DELETE',
        },
        {
          route: 'permission',
          method: 'POST',
        },
        {
          route: 'permission',
          method: 'GET',
        },
        {
          route: 'permission/:id',
          method: 'GET',
        },
        {
          route: 'permission/:id',
          method: 'GET',
        },
        {
          route: 'permission/:id',
          method: 'PUT',
        },
        {
          route: 'permission/:id',
          method: 'DELETE',
        },
      ]);
      const adminRole = await queryInterface.bulkInsert('roles', [
        {
          name: 'Admin',
        },
      ]);


      const userAdmin = await queryInterface.create('users',
        {
          firstname: 'John',
          lastname: 'Doe',
          email: 'test@test.com.ar',
          password: 'Arselocura1234@',
        },
      );
      // Asociar permisos con el rol de administrador
      await adminRole.setPermissions(createdPermissions);

      // Asociar usuario con el rol de administrador
      const user = await queryInterface.findOne("users", { where: { email: 'test@test.com.ar' } });
      await user.addRole(adminRole);
      console.log('Permisos creados correctamente.');
    } catch (error) {
      console.error('Error al crear los permisos:', error);
    } finally {
      await queryInterface.sequelize.close(); // Cierra la conexión de la base de datos cuando hayas terminado
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
