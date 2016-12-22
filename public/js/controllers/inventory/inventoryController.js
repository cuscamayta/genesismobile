app.controller('inventoryAdmController', function ($scope, inventoryService, commonService, $stateParams, warehouseService, itemService) {
    init();

    $scope.saveInventory = function () {
        //TODO: login
        //$scope.inventory.iduser = $rootScope.currentUser.user.id;

        if (!$scope.inventory.type) {
            $scope.inventory.type = false;
        }

        if (!$scope.inventory.typeprice) {
            $scope.inventory.typeprice = false;
        }

        $scope.inventory.iduser = 1;
        $scope.inventory.idoffice = 2;
        $scope.inventory.idwarehouse = $scope.inventory.warehouse.id;
        $scope.inventory.details = angular.copy($scope.detail.first().listinvnetorydetail);

        if ($scope.inventory.id == 0) {
            inventoryService.saveInventory($scope.inventory).then(function (res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        } else {
            inventoryService.updateInventory($scope.inventory).then(function (res) {
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
        $scope.inventory = {};
        var inventoryId = $stateParams.inventoryId;
        if (inventoryId > 0) {
            getForId(inventoryId);
        } else {
            $scope.inventory = { id: 0, state: 1 };
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

    function getForId(inventoryId) {
        $scope.inventory.id = inventoryId;
        inventoryService.getInventoryForId($scope.inventory).then(function (res) {
            if (res.isSuccess) {
                $scope.inventory = res.data;
                //$scope. = res.data.Inventorydetails; 
            }
            else { toastr.error(res.message); }
        });
    }

    $scope.validateControls = function () {
        return $scope.inventory == null || $scope.inventory.dateregister == null
            || $scope.detail.first().listinvnetorydetail.length < 1
            || $scope.inventory.warehouse == null || $scope.inventory.code == null;
    };

    $scope.validateControlsDetail = function () {
        return $scope.inventory.item == null;
    };

    $scope.validateControlsTypePrice = function () {
        return $scope.detail.first().listinvnetorydetail.length > 1;
    };

    $scope.deleteinventorydetail = function (item) {
        $scope.detail.first().listinvnetorydetail.remove(item);
        $scope.sumTotal = $scope.detail.first().listinvnetorydetail.sum(function (item) {
            return item.price;
        });
    };

    $scope.additeminventorydetail = function () {
        if ($scope.inventory.item) {
            var itemselected = $scope.listItem.where(function (item) {
                if (item.id == $scope.inventory.item.id) {
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
                    $scope.itemlist.id = itemselected.first().id;
                    $scope.itemlist.title = itemselected.first().name;

                    if ($scope.inventory.typeprice == true) {
                        $scope.itemlist.price = itemselected.first().wholesaleprice;
                    } else {
                        $scope.itemlist.price = itemselected.first().unitprice;
                    }

                    $scope.itemlist.cost = itemselected.first().cost;
                    $scope.itemlist.quantity = 1;
                    $scope.detail.first().listinvnetorydetail.push($scope.itemlist);

                    $scope.inventory.total = $scope.detail.first().listinvnetorydetail.sum(function (item) {
                        return parseInt(item.price);
                    });
                }
            }
        } else {
            toastr.warning("Seleccione un item");
        }

        $scope.inventory.item = null;
    };

    $scope.addquantityinventorydetail = function (element) {
        var itemselected = $scope.detail.first().listinvnetorydetail.where(function (item) {
            if (item.id == element.id) {
                item.quantity += 1;
                return;
            }
        });
    };

    $scope.subtractquantityinventorydetail = function (element) {
        var itemselected = $scope.detail.first().listinvnetorydetail.where(function (item) {
            if (item.id == element.id && item.quantity > 1) {
                item.quantity -= 1;
                return;
            }
        });
    };
})

app.controller('inventoryListController', function ($scope, inventoryService, commonService, $ionicActionSheet, $location) {
    getList();

    function getList() {
        inventoryService.getListInventory().then(function (res) {
            if (res.isSuccess) { $scope.inventories = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.showActionsheet = function (inventory) {
        $ionicActionSheet.show({
            titleText: '¿Esta seguro de eliminar este registro?',
            destructiveText: 'Eliminar',
            cancelText: 'Cancelars',
            destructiveButtonClicked: function () {
                deleteInventory(inventory);
                return true;
            }
        });
    };

    function deleteInventory(inventory) {
        if (inventory.readonly == 2) {
            var response = inventoryService.deleteInventory(inventory);
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
        $location.path("/inventory/adm/" + id);
    };
})