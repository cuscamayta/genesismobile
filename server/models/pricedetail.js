"use strict";

module.exports = function (sequelize, DataTypes) {
    var Pricedetail = sequelize.define("Pricedetail", {
        price: { type: DataTypes.DECIMAL, allowNull: false }
    },
        {
            classMethods: {
                associate: function (models) {
                    Pricedetail.belongsTo(models.Item, { foreignKey: "idpricedetail" });
                    Pricedetail.belongsTo(models.Pricetype, { foreignKey: "idpricetype" });
                }
            }
        });

    return Pricedetail;
};