module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attachments', {
      uid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      file: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      adoption_uid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'adoptions',
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
    await queryInterface.dropTable('attachments');
  },
};
