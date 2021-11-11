'use strict';
module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {});

  Folder.associate = function (models) {
    Folder.belongsTo(models.User, { foreignKey: 'userId' });
    Folder.hasMany(models.Note, { foreignKey: 'folderId' });
  };

  return Folder;
};
