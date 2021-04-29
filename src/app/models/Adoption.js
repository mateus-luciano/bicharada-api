import Sequelize, { Model } from 'sequelize';

class Adoption extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: Sequelize.DataTypes.STRING(60),
          allowNull: false,
        },
        description: {
          type: Sequelize.DataTypes.STRING(460),
          allowNull: false,
        },
        address: {
          type: Sequelize.DataTypes.STRING(160),
          allowNull: false,
        },
        type: {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: false,
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
      },
      {
        sequelize,
        tableName: 'adoptions',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_uid',
    });

    this.hasMany(models.Attachment, {
      as: 'attachments',
      foreignKey: 'adoption_uid',
    });
  }
}

export default Adoption;
