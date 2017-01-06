var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/dailycash', common.isAuthenticate, function(request, response) {

    models.Sale.findAll({
        include: [{ model: models.User }],
        where: { dateregister: common.formatDate(request.body.dateregister), iduser: request.body.iduser, status: 1 },
        order: 'idschedule ASC'
    }).then(function(res) {
        response.send(common.response(res));
    }).catch(function(err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/create', common.isAuthenticate, function (request, response) {
    return models.sequelize.transaction(function (t) {

        return models.Inventorytransaction.create(createInventoryInput(request), { transaction: t }).then(function (input) {
            return models.Inventorytransaction.create(createInventoryOutput(request), { transaction: t }).then(function (output) {
                return models.Transfer.create(createTransfer(request, input.id, output.id), { transaction: t }).then(function (tranfer) {
                    var promises = []
                    for (var index = 0; index < request.body.details.length; index++) {                        
                        var newPromise = models.Inventorydetail.create(createInventoryDetail(request, index, input), { transaction: t });
                        promises.push(newPromise);
                        var newPromise2 = models.Inventorydetail.create(createInventoryDetail(request, index, output), { transaction: t });
                        promises.push(newPromise2);
                    }
                    return Promise.all(promises);

                });
            });
        });

    }).then(function () {
        response.send(common.response(null, "Se guardo correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

module.exports = router;