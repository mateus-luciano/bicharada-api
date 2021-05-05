import Sequelize, { Model } from 'sequelize';

class Region extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING(160),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'regions',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.User, {
      as: 'user',
      foreignKey: 'region_uid',
    });
  }
}

export default Region;
