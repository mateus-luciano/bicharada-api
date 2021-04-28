import Sequelize, { Model } from 'sequelize';

class Attachment extends Model {
  static init(sequelize) {
    super.init(
      {
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
        url: {
          type: Sequelize.DataTypes.VIRTUAL,
          get() {
            return `http://localhost:3333/attachments/${this.file}`;
          },
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
      },
      {
        sequelize,
        tableName: 'attachments',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Adoption, {
      as: 'adoption',
      foreignKey: 'adoption_uid',
    });
  }
}

export default Attachment;
