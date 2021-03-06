import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
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
        password: {
          type: Sequelize.DataTypes.VIRTUAL,
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
        phone: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        region_uid: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'regions',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
        tableName: 'users',
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        // eslint-disable-next-line no-param-reassign
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Adoption, {
      as: 'adoption',
      foreignKey: 'user_uid',
    });
    this.belongsTo(models.Region, {
      as: 'region',
      foreignKey: 'region_uid',
    });
  }
}

export default User;
