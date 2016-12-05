"use strict";

module.exports = function (sequelize, DataTypes) {
    var Transfer = sequelize.define("Transfer", {
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
        detail: { type: DataTypes.STRING, allowNull: true },
        total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        code: { type: DataTypes.STRING(8), allowNull: false },
        status: { type: DataTypes.INTEGER(4), allowNull: false }
    },
        {
            classMethods: {
                associate: function (models) {
                    Transfer.belongsTo(models.Inventorytransaction, { foreignKey: "idinventoryinput" });                    
                    Transfer.belongsTo(models.Inventorytransaction, { foreignKey: "idinventoryoutput" });
                    Transfer.belongsTo(models.Warehouse, { foreignKey: "idwarehouseinput" });
                    Transfer.belongsTo(models.Warehouse, { foreignKey: "idwarehouseoutput" });
                    Transfer.belongsTo(models.User, { foreignKey: "iduser" });
                    Transfer.belongsTo(models.Office, { foreignKey: "idoffice" });
                }
            }
        }
    );
    return Transfer;
};