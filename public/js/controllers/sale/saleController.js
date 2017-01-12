app.controller('saleAdmController', function ($scope, saleService, commonService, $stateParams, warehouseService, itemService) {
    init();

    $scope.saveSale = function () {
        //TODO: login
        //$scope.sale.iduser = $rootScope.currentUser.user.id;

        if (!$scope.sale.type) {
            $scope.sale.type = false;
        }

        if (!$scope.sale.typeprice) {
            $scope.sale.typeprice = false;
        }

        $scope.sale.iduser = 1;
        $scope.sale.idoffice = 1;
        $scope.sale.idwarehouse = $scope.sale.warehouse.id;
        $scope.sale.details = angular.copy($scope.detail.first().listinvnetorydetail);

        if ($scope.sale.id == 0) {
            saleService.saveSale($scope.sale).then(function (res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        } else {
            saleService.updateSale($scope.sale).then(function (res) {
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
        $scope.sale = {};
        var saleId = $stateParams.saleId;
        if (saleId > 0) {
            getForId(saleId);
        } else {
            $scope.sale = { id: 0, state: 1 };
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
            if (res.isSuccess) { $scope.listWarehouse = res.data; }
            else { toastr.error(res.message); }
        });
    }

    function getListItem() {
        itemService.getListItem().then(function (res) {
            if (res.isSuccess) { $scope.listItem = res.data; }
            else { toastr.error(res.message); }
        });
    }

    function getForId(saleId) {
        $scope.sale.id = saleId;
        saleService.getSaleForId($scope.sale).then(function (res) {
            if (res.isSuccess) {
                if (res.data) {
                    $scope.sale = res.data;
                    $scope.detail.first().listinvnetorydetail[0] = res.data.Saledetails;
                    $scope.detail.first().listinvnetorydetail[0].itemselect = res.data.Saledetails.first().Item;
                }
            }
            else { toastr.error(res.message); }
        });
    }

    $scope.validateControls = function () {
        return $scope.sale == null || $scope.sale.dateregister == null
            || $scope.detail.first().listinvnetorydetail.length < 1
            || $scope.sale.warehouse == null || $scope.sale.code == null;
    };

    $scope.validateControlsDetail = function () {
        return $scope.sale.item == null;
    };

    $scope.validateControlsTypePrice = function () {
        return $scope.sale.id != 0;
    };

    $scope.deletesaledetail = function (item) {
        $scope.detail.first().listinvnetorydetail.remove(item);
        $scope.sumTotal = $scope.detail.first().listinvnetorydetail.sum(function (item) {
            return item.price;
        });
    };

    $scope.additemsaledetail = function () {
        if ($scope.sale.item) {
            var itemselected = $scope.listItem.where(function (item) {
                if (item.id == $scope.sale.item.id) {
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

                    if ($scope.sale.typeprice == true) {
                        $scope.itemlist.price = itemselected.first().wholesaleprice;
                    } else {
                        $scope.itemlist.price = itemselected.first().unitprice;
                    }

                    $scope.itemlist.cost = itemselected.first().cost;
                    $scope.itemlist.quantity = 1;
                    $scope.detail.first().listinvnetorydetail.push($scope.itemlist);

                    $scope.sale.total = $scope.detail.first().listinvnetorydetail.sum(function (item) {
                        return parseInt(item.price);
                    });
                }
            }
        } else {
            toastr.warning("Seleccione un item");
        }

        $scope.sale.item = null;
    };

    $scope.addquantitysaledetail = function (element) {
        var itemselected = $scope.detail.first().listinvnetorydetail.where(function (item) {
            if (item.id == element.id) {
                item.quantity += 1;
                return;
            }
        });
    };

    $scope.subtractquantitysaledetail = function (element) {
        var itemselected = $scope.detail.first().listinvnetorydetail.where(function (item) {
            if (item.id == element.id && item.quantity > 1) {
                item.quantity -= 1;
                return;
            }
        });
    };
})

app.controller('saleListController', function ($scope, saleService, commonService, $ionicActionSheet, $location) {
    getList();

    function getList() {
        saleService.getListSale().then(function (res) {
            if (res.isSuccess) { $scope.inventories = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.showActionsheet = function (sale) {
        $ionicActionSheet.show({
            titleText: '¿Esta seguro de eliminar este registro?',
            destructiveText: 'Eliminar',
            cancelText: 'Cancelar',
            destructiveButtonClicked: function () {
                deleteSale(sale);
                return true;
            }
        });
    };

    function deleteSale(sale) {
        if (sale.readonly == 1) {
            var response = saleService.deleteSale(sale);
            response.then(function (res) {
                if (res.isSuccess) {
                    toastr.success(res.message);
                    getList();
                } else {
                    toastr.error(res.message);
                }
            })
        } else {
            toastr.error("La transaccion no se puede eliminar");
        }
    };

    $scope.edit = function (id) {
        $location.path("/sale/adm/" + id);
    };
})