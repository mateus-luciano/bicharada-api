"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Attachment extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          type: _sequelize2.default.DataTypes.UUID,
          allowNull: false,
          defaultValue: _sequelize2.default.DataTypes.UUIDV4,
          primaryKey: true,
        },
        file: {
          type: _sequelize2.default.DataTypes.STRING,
          allowNull: false,
        },
        generate_url: {
          type: _sequelize2.default.DataTypes.VIRTUAL,
          get() {
            return `${process.env.URL_HTTP}/attachments/${this.file}`;
          },
        },
        url: {
          type: _sequelize2.default.DataTypes.STRING,
        },
        name: {
          type: _sequelize2.default.DataTypes.STRING,
          allowNull: false,
        },
        adoption_uid: {
          type: _sequelize2.default.DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'adoptions',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
        tableName: 'attachments',
      }
    );

    this.addHook('beforeSave', (attachment) => {
      attachment.url = attachment.generate_url;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Adoption, {
      as: 'adoption',
      foreignKey: 'adoption_uid',
    });
  }
}

exports. default = Attachment;
