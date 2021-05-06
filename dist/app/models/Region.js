"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Region extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          type: _sequelize2.default.DataTypes.UUID,
          allowNull: false,
          defaultValue: _sequelize2.default.DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: _sequelize2.default.DataTypes.STRING(160),
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

exports. default = Region;
