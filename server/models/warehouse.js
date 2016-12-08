"use strict";

module.exports = function (sequelize, DataTypes) {
  var Warehouse = sequelize.define("Warehouse", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: true },
    detail: { type: DataTypes.STRING, allowNull: true }
  },
    {
      classMethods: {
        associate: function (models) {
          Warehouse.hasMany(models.Userwarehouse, { foreignKey: 'idwarehouse' });
          Warehouse.hasMany(models.Sale, { foreignKey: 'idoffice' });
          Warehouse.hasMany(models.Transfer, { foreignKey: "idwarehouseoutput" });
          Warehouse.hasMany(models.Transfer, { foreignKey: "idwarehouseinput" });
        }
      }
    }
  );
  return Warehouse;
};