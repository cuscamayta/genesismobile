"use strict";

module.exports = function (sequelize, DataTypes) {
  var Pricetype = sequelize.define("Pricetype", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    path: { type: DataTypes.STRING, allowNull: false },
  }, {
      classMethods: {
        associate: function (models) {
          Pricetype.hasMany(models.Inventorytransaction, { foreignKey: 'idpricetype' });
          Pricetype.hasMany(models.Sale, { foreignKey: 'idpricetype' });
          Pricetype.hasMany(models.Pricedetail, { foreignKey: 'idpricetype' });
        }
      }
    });
  return Pricetype;
};