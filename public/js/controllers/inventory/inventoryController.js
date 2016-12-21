app.controller('inventoryAdmController', function ($scope, inventoryService, commonService, $stateParams) {
    init();

    $scope.saveInventory = function () {

        //TODO: login
        //$scope.inventory.iduser = $rootScope.currentUser.user.id;

        $scope.inventory.iduser = 1;
        if ($scope.inventory.id == 0) {
            inventoryService.saveInventory($scope.inventory).then(function (res) {
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
        $scope.inventory = {};
        var inventoryId = $stateParams.inventoryId;
        if (inventoryId > 0) {
            getForId(inventoryId);
        } else {
            $scope.inventory = { id: 0, state: 1 };
        }

        $scope.detail = [];
        $scope.detail[0] = {
            name: "Detalle",
            listinvnetorydetail: [],
            show: true
        };
        for (var j = 0; j < 3; j++) {
            $scope.itemlist = {};
            $scope.itemlist.id = j;
            $scope.itemlist.title = " item ";
            $scope.itemlist.price = 1;
            $scope.itemlist.cost = 1;
            $scope.itemlist.quantity = 1;
            $scope.detail[0].listinvnetorydetail.push($scope.itemlist);
        }
    }

    function getForId(inventoryId) {
        $scope.inventory.id = inventoryId;
        inventoryService.getInventoryForId($scope.inventory).then(function (res) {
            if (res.isSuccess) { $scope.inventory = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.validateControls = function () {
        return $scope.inventory == null || $scope.inventory.dateregister == null;
    };

    $scope.deleteinventorydetail = function (item) {
        $scope.detail[0].listinvnetorydetail.remove(item);
        $scope.sumTotal = $scope.detail[0].listinvnetorydetail.sum(function (item) {
            return item.price;
        });
    };

    $scope.addquantityinventorydetail = function (element) {
        var itemselected = $scope.detail[0].listinvnetorydetail.where(function (item) {
            if (item.id == element.id) {
                item.quantity += 1;
                return;
            }
        });
    };

    $scope.subtractquantityinventorydetail = function (element) {
        var itemselected = $scope.detail[0].listinvnetorydetail.where(function (item) {
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
            if (res.isSuccess) { $scope.inventorys = res.data; }
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