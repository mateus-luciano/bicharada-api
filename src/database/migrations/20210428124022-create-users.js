module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      uid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV1,
        primaryKey: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING(160),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      password_reset_token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      password_reset_expires: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      admin: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      status: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      first_name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
