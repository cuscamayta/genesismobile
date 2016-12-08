"use strict";

module.exports = function (sequelize, DataTypes) {
  var Office = sequelize.define("Office", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: true },
    detail: { type: DataTypes.STRING, allowNull: true }
  }, 
    {
      classMethods: {
        associate: function (models) {
          Office.hasMany(models.Useroffice, { foreignKey: 'idoffice' });
          Office.hasMany(models.Orderbook, { foreignKey: 'idoffice' });
          Office.hasMany(models.Sale, { foreignKey: 'idoffice' });
          Office.hasMany(models.Salesbook, { foreignKey: 'idoffice' });
          Office.hasMany(models.Transfer, { foreignKey: 'idoffice' });
          Office.hasMany(models.Inventorytransaction, { foreignKey: 'idoffice' });
        }
      }
    }
  );
  return Office;
};