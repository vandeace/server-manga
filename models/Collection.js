"use strict";
module.exports = (sequelize, DataTypes) => {
  const collection = sequelize.define(
    "collection",
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
  collection.associate = function (models) {
    // associations can be defined here
    collection.belongsTo(models.user);
  };
  return collection;
};
