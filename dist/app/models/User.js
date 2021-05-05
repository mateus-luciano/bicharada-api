"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          type: _sequelize2.default.DataTypes.UUID,
          allowNull: false,
          defaultValue: _sequelize2.default.DataTypes.UUIDV4,
          primaryKey: true,
        },
        email: {
          type: _sequelize2.default.DataTypes.STRING(160),
          allowNull: false,
          unique: true,
        },
        password: {
          type: _sequelize2.default.DataTypes.VIRTUAL,
        },
        password_hash: {
          type: _sequelize2.default.DataTypes.STRING,
          allowNull: true,
        },
        password_reset_token: {
          type: _sequelize2.default.DataTypes.STRING,
          allowNull: true,
        },
        password_reset_expires: {
          type: _sequelize2.default.DataTypes.DATE,
          allowNull: true,
        },
        admin: {
          type: _sequelize2.default.DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        status: {
          type: _sequelize2.default.DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        },
        name: {
          type: _sequelize2.default.DataTypes.STRING(160),
          allowNull: false,
        },
        city: {
          type: _sequelize2.default.DataTypes.STRING(160),
          allowNull: false,
        },
        phone: {
          type: _sequelize2.default.DataTypes.STRING,
          allowNull: false,
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
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Adoption, {
      as: 'adoption',
      foreignKey: 'user_uid',
    });
  }
}

exports. default = User;
