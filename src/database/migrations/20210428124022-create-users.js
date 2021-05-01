module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      uid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV4,
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
      name: {
        type: Sequelize.DataTypes.STRING(160),
        allowNull: false,
      },
      city: {
        type: Sequelize.DataTypes.STRING(160),
        allowNull: false,
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
