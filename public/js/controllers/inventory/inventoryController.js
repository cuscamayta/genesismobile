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

    $scope.updateInventory = function () {
        inventoryService.updateInventory($scope.inventory).then(function (res) {
            if (res.isSuccess) {
                toastr.success("Se guardo correctamente");
            } else {
                toastr.error("Error al guardar intente nuevamente");
            }
        })
    }

    $scope.toggleGroup = function (group) {
        group.show = !group.show;
    };
    $scope.isGroupShown = function (group) {
        return group.show;
    };

    function init() {
        $scope.inventory = {};
        var inventoryId = $stateParams.inventoryId;
        if (inventoryId > 0) {
            getForId(inventoryId);
        } else {
            $scope.inventory = { id: 0, state: 1 };
        }

        $scope.groups = [];
        $scope.groups[0] = {
            name: "Detalle",
            items: [],
            show: true
        };
        for (var j = 0; j < 3; j++) {
            $scope.groups[0].items.push(0 + '-' + j);
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
        return $scope.inventory == null || $scope.inventory.name == null
            || $scope.inventory.make == null || $scope.inventory.model == null
            || $scope.inventory.cost == null || $scope.inventory.serialnumber == null
            || $scope.inventory.type == null;
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
        var response = inventoryService.deleteInventory(inventory);
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
        $location.path("/inventory/adm/" + id);
    };
})