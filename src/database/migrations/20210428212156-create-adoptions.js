module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('adoptions', {
      uid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.DataTypes.STRING(460),
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.DataTypes.STRING(160),
        allowNull: false,
        unique: true,
      },
      type: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      user_uid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('adoptions');
  },
};
