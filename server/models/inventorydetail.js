"use strict";

module.exports = function (sequelize, DataTypes) {
    var Inventorydetail = sequelize.define("Inventorydetail", {
        price: { type: DataTypes.DECIMAL, allowNull: false },
        cost: { type: DataTypes.DECIMAL, allowNull: false },
        quantity: { type: DataTypes.DECIMAL(10,4), allowNull: false },
    },
        {
            classMethods: {
                associate: function (models) {                    
                    Inventorydetail.belongsTo(models.Item, { foreignKey: "iditem" });
                    // Inventorydetail.belongsTo(models.Pricedetail, { foreignKey: "idpricedetail" });
                    Inventorydetail.belongsTo(models.Inventorytransaction, { foreignKey: "idinventory" });
                    Inventorydetail.hasMany(models.Salesdetail, { foreignKey: "idinventorydetail" });
                }
            }
        }
    );
    return Inventorydetail;
};