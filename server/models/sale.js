"use strict";
var moment = require("moment");
var common = require('../routes/common');

module.exports = function (sequelize, DataTypes) {
    var Sale = sequelize.define("Sale", {
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
        detail: { type: DataTypes.STRING, allowNull: true },
        typeprice: { type: DataTypes.INTEGER(4), allowNull: false },
        status: { type: DataTypes.INTEGER(4), allowNull: false }
    },
        {
            classMethods: {
                associate: function (models) {
                    Sale.belongsTo(models.Salesbook, { foreignKey: "idsalesbook", allowNull: false });
                    Sale.belongsTo(models.Warehouse, { foreignKey: "idwarehouse", allowNull: false });
                    Sale.belongsTo(models.User, { foreignKey: "iduser", allowNull: false });
                    Sale.belongsTo(models.Office, { foreignKey: "idoffice", allowNull: false });
                    Sale.belongsTo(models.Inventorytransaction, { foreignKey: "idinventory", allowNull: false });
                    Sale.hasMany(models.Salesdetail, { foreignKey: "idsale", allowNull: false });
                }
            }
        }
    );
    return Sale;
};