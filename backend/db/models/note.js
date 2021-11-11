'use strict';

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    folderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT
    }
  });

  Note.associate = function (models) {
    Note.belongsTo(models.User, { foreignKey: 'userId' });
    Note.belongsTo(models.Folder, { foreignKey: 'folderId' });
  };

  return Note;
};
