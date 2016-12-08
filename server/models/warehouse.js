"use strict";

module.exports = function (sequelize, DataTypes) {
  var Warehouse = sequelize.define("Warehouse", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    detail: { type: DataTypes.STRING, allowNull: true }
  },
    {
      classMethods: {
        associate: function (models) {
          Warehouse.belongsTo(models.Destination, { foreignKey: "idorigin" });
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