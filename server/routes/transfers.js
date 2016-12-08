var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/create', common.isAuthenticate, function (request, response) {
    models.Transfer.create({
        dateregister: request.body.dateregister,
        code: request.body.code,
        total: request.body.total,
        detail: request.body.detail,
        status: request.body.status,
        idinventoryinput: request.body.idinventoryinput,
        idinventoryoutput: request.body.idinventoryoutput,
        idwarehouseinput: request.body.idwarehouseinput,
        idwarehouseoutput: request.body.idwarehouseoutput,
        iduser: request.body.iduser,
        idoffice: request.body.idoffice
    }).then(function (res) {
        response.send(common.response(res, "Se guardo correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.get('/', common.isAuthenticate, function (request, response) {
    models.Transfer.findAll().then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/destroy', common.isAuthenticate, function (request, response) {
    models.Transfer.destroy({
        where: { id: request.body.id }
    }).then(function () {
        response.send(common.response("", "Se elimino correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

module.exports = router;