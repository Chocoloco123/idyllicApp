'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    albumId: {
      type: DataTypes.INTEGER,
      references: { model: 'Albums' }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageTitle: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT
    },
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.User, { foreignKey: 'userId' }),
    Image.belongsTo(models.Album, { foreignKey: 'albumId' }),
    Image.hasMany(models.Comment, { foreignKey: 'imageId' })
  };
  return Image;
};