app.controller('transferAdmController', function ($scope, transferService, commonService, $stateParams, warehouseService, itemService) {
    init();

    $scope.saveTransfer = function () {
        //TODO: login
        //$scope.transfer.iduser = $rootScope.currentUser.user.id;

        if (!$scope.transfer.typeprice) {
            $scope.transfer.typeprice = false;
        }

        $scope.transfer.iduser = 1;
        $scope.transfer.idoffice = 1;
        $scope.transfer.idwarehouseoutput = $scope.transfer.warehouseOutput.id;
        $scope.transfer.idwarehouseinput = $scope.transfer.warehouseInput.id;
        $scope.transfer.details = angular.copy($scope.detail.first().listinvnetorydetail);

        if ($scope.transfer.id == 0) {
            transferService.saveTransfer($scope.transfer).then(function (res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        } else {
            transferService.updateTransfer($scope.transfer).then(function (res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        }
    }

    $scope.toggleGroup = function (item) {
        item.show = !item.show;
    };

    $scope.isGroupShown = function (item) {
        return item.show;
    };

    function init() {
        getListWarehouse();
        getListItem();
        $scope.transfer = {};
        var transferId = $stateParams.transferId;
        if (transferId > 0) {
            getForId(transferId);
        } else {
            $scope.transfer = { id: 0, state: 1 };
        }

        $scope.detail = [];
        $scope.detail[0] = {
            name: "Detalle de la transaccion",
            listinvnetorydetail: [],
            show: true
        };
    }

    function getListWarehouse() {
        warehouseService.getListWarehouse().then(function (res) {
            if (res.isSuccess) {
                $scope.listWarehouseInput = res.data;
                $scope.listWarehouseOutput = res.data;
            }
            else { toastr.error(res.message); }
        });
    }

    function getListItem() {
        itemService.getListItem().then(function (res) {
            if (res.isSuccess) { $scope.listItem = res.data; }
            else { toastr.error(res.message); }
        });
    }

    function getForId(transferId) {
        $scope.transfer.id = transferId;
        transferService.getTransferForId($scope.transfer).then(function (res) {
            if (res.isSuccess) {
                if (res.data) {
                    $scope.transfer = res.data;
                    $scope.detail.first().listinvnetorydetail[0] = res.data.Transferdetails;
                    $scope.detail.first().listinvnetorydetail[0].itemselect = res.data.Transferdetails.first().Item;
                }
            }
            else { toastr.error(res.message); }
        });
    }

    $scope.validateControls = function () {
        return $scope.transfer == null || $scope.transfer.dateregister == null
            || $scope.detail.first().listinvnetorydetail.length < 1
            || $scope.transfer.warehouseInput == null || $scope.transfer.warehouseOutput == null
            || $scope.transfer.code == null;
    };

    $scope.validateControlsDetail = function () {
        return $scope.transfer.item == null;
    };

    $scope.validateControlsTypePrice = function () {
        return $scope.transfer.id != 0;
    };

    $scope.deletetransferdetail = function (item) {
        $scope.detail.first().listinvnetorydetail.remove(item);
        $scope.sumTotal = $scope.detail.first().listinvnetorydetail.sum(function (item) {
            return item.price;
        });
    };

    $scope.additemtransferdetail = function () {
        if ($scope.transfer.item) {
            var itemselected = $scope.listItem.where(function (item) {
                if (item.id == $scope.transfer.item.id) {
                    return item;
                }
            });

            var itemselect = $scope.detail.first().listinvnetorydetail.where(function (item) {
                if (item.id == itemselected.first().id) {
                    return item;
                }
            });

            if (itemselect.length == 0) {
                if (itemselected) {
                    $scope.itemlist = {};
                    $scope.itemlist.iditem = itemselected.first().id;
                    $scope.itemlist.itemselect = itemselected.first();

                    if ($scope.transfer.typeprice == true) {
                        $scope.itemlist.price = itemselected.first().wholesaleprice;
                    } else {
                        $scope.itemlist.price = itemselected.first().unitprice;
                    }

                    $scope.itemlist.cost = itemselected.first().cost;
                    $scope.itemlist.quantity = 1;
                    $scope.detail.first().listinvnetorydetail.push($scope.itemlist);

                    $scope.transfer.total = $scope.detail.first().listinvnetorydetail.sum(function (item) {
                        return parseInt(item.price);
                    });
                }
            }
        } else {
            toastr.warning("Seleccione un item");
        }

        $scope.transfer.item = null;
    };

    $scope.addquantitytransferdetail = function (element) {
        var itemselected = $scope.detail.first().listinvnetorydetail.where(function (item) {
            if (item.id == element.id) {
                item.quantity += 1;
                return;
            }
        });
    };

    $scope.subtractquantitytransferdetail = function (element) {
        var itemselected = $scope.detail.first().listinvnetorydetail.where(function (item) {
            if (item.id == element.id && item.quantity > 1) {
                item.quantity -= 1;
                return;
            }
        });
    };
})

app.controller('transferListController', function ($scope, transferService, commonService, $ionicActionSheet, $location) {
    getList();

    function getList() {
        transferService.getListTransfer().then(function (res) {
            if (res.isSuccess) { $scope.transfers = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.showActionsheet = function (transfer) {
        $ionicActionSheet.show({
            titleText: '¿Esta seguro de eliminar este registro?',
            destructiveText: 'Eliminar',
            cancelText: 'Cancelar',
            destructiveButtonClicked: function () {
                deleteTransfer(transfer);
                return true;
            }
        });
    };

    function deleteTransfer(transfer) {
        var response = transferService.invalidateTransfer(transfer);
        response.then(function (res) {
            if (res.isSuccess) {
                toastr.success(res.message);
                getList();
            } else {
                toastr.error(res.message);
            }
        })
    };

    $scope.edit = function (id) {
        $location.path("/transfer/adm/" + id);
    };
})