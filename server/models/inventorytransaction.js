"use strict";
var moment = require("moment");
var common = require('../routes/common');

module.exports = function (sequelize, DataTypes) {
    var Inventorytransaction = sequelize.define("Inventorytransaction", {
        dateregister: {
            type: DataTypes.DATE, allowNull: false,
            set: function (val) {
                this.setDataValue('dateregister', common.formatDate(val));
            },
            get: function (val) {
                var date = this.getDataValue('dateregister');
                return moment(date).format("DD/MM/YYYY");
            }
        },
        numberid: {
            type: DataTypes.STRING, allowNull: false,
            set: function (val) {
                this.setDataValue('numberid', val.toUpperCase());
            }
        },
        fullname: {
            type: DataTypes.STRING, allowNull: false,
            set: function (val) {
                this.setDataValue('fullname', val.toUpperCase());
            }
        },
        total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        code: { type: DataTypes.STRING(8), allowNull: false },
        type: { type: DataTypes.INTEGER(4), allowNull: false },
        status: { type: DataTypes.INTEGER(4), allowNull: false }
    },
        {
            classMethods: {
                associate: function (models) {
                    Inventorytransaction.belongsTo(models.Warehouse, { foreignKey: "idwarehouse" });
                    Inventorytransaction.belongsTo(models.Pricetype, { foreignKey: "idpricetype" });
                    Inventorytransaction.belongsTo(models.User, { foreignKey: "iduser" });
                    Inventorytransaction.belongsTo(models.Office, { foreignKey: "idoffice" });
                    Inventorytransaction.hasMany(models.Sale, { foreignKey: "idinventorytransaction" });
                    Inventorytransaction.hasMany(models.Inventorydetail, { foreignKey: "idinventorytransaction" });
                    Inventorytransaction.hasMany(models.Transfer, { foreignKey: "idinventoryoutput" });
                    Inventorytransaction.hasMany(models.Transfer, { foreignKey: "idinventoryinput" });
                }
            }
        }
    );
    return Inventorytransaction;
};