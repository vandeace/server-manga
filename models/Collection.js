"use strict";
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define(
    "Collection",
    {
      idKitsu: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      canonicalTitle: DataTypes.STRING,
      synopsis: DataTypes.STRING(3000),
      averageRating: DataTypes.STRING,
    },
    {}
  );
  Collection.associate = function (models) {
    // associations can be defined here
    Collection.belongsTo(models.User);
  };
  return Collection;
};
