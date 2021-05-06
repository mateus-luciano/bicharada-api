"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Adoption extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          type: _sequelize2.default.DataTypes.UUID,
          allowNull: false,
          defaultValue: _sequelize2.default.DataTypes.UUIDV4,
          primaryKey: true,
        },
        status: {
          type: _sequelize2.default.DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        },
        title: {
          type: _sequelize2.default.DataTypes.STRING(60),
          allowNull: false,
        },
        description: {
          type: _sequelize2.default.DataTypes.STRING(460),
          allowNull: false,
        },
        address: {
          type: _sequelize2.default.DataTypes.STRING(160),
          allowNull: false,
        },
        type: {
          type: _sequelize2.default.DataTypes.STRING(100),
          allowNull: false,
        },
        user_uid: {
          type: _sequelize2.default.DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        region_uid: {
          type: _sequelize2.default.DataTypes.UUID,
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
    this.belongsTo(models.Region, {
      as: 'region',
      foreignKey: 'region_uid',
    });
  }
}

exports. default = Adoption;
