"use strict";

module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: { type: DataTypes.STRING, allowNull: false },
        model: { type: DataTypes.STRING, allowNull: false },
        make: { type: DataTypes.STRING, allowNull: false },
        cost: { type: DataTypes.DECIMAL, allowNull: false },
        serialnumber: { type: DataTypes.STRING, allowNull: true },
        barcode: { type: DataTypes.STRING, allowNull: true },
        type: { type: DataTypes.STRING, allowNull: false },
        path: { type: DataTypes.STRING, allowNull: true },
        detail: { type: DataTypes.STRING, allowNull: true }
    },
        {
            classMethods: {
                associate: function (models) {
                    Item.hasMany(models.Inventorydetail, { foreignKey: "iditem" });
                    Item.hasMany(models.Salesdetail, { foreignKey: "iditem" });
                    Item.hasMany(models.Pricedetail, { foreignKey: "iditem" });
                }
            }
        }
    );
    return Item;
};