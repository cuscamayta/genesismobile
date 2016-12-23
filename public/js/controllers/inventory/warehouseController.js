app.controller('warehouseAdmController', function($scope, warehouseService, commonService, $stateParams) {
    init();

    $scope.saveWarehouse = function() {
        if ($scope.warehouse.id == 0) {
            warehouseService.saveWarehouse($scope.warehouse).then(function(res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        } else {
            warehouseService.updateWarehouse($scope.warehouse).then(function(res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        }
    } 

    function init() {
        $scope.warehouse = {};
        var warehouseId = $stateParams.warehouseId;
        if (warehouseId > 0) {
            getForId(warehouseId);
        } else {
            $scope.warehouse = { id: 0, state: 1 };
        }
    }

    function getForId(warehouseId) {
        $scope.warehouse.id = warehouseId;
        warehouseService.getWarehouseForId($scope.warehouse).then(function(res) {
            if (res.isSuccess) { $scope.warehouse = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.validateControls = function () {
        return $scope.warehouse == null || $scope.warehouse.title == null
            || $scope.warehouse.city == null || $scope.warehouse.address == null;
    };
})

app.controller('warehouseListController', function($scope, warehouseService, commonService, $ionicActionSheet, $location) {
    getList();

    function getList() {
        warehouseService.getListWarehouse().then(function(res) {
            if (res.isSuccess) { $scope.warehouses = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.showActionsheet = function(warehouse) {
        $ionicActionSheet.show({
            titleText: '¿Esta seguro de eliminar este registro?',
            destructiveText: 'Eliminar',
            cancelText: 'Cancelar',
            destructiveButtonClicked: function() {
                deleteWarehouse(warehouse);
                return true;
            }
        });
    };

    function deleteWarehouse(warehouse) {
        var response = warehouseService.deleteWarehouse(warehouse);
        response.then(function(res) {
            if (res.isSuccess) {
                toastr.success(res.message);
                getList();
            } else {
                toastr.error(res.message);
            }
        })
    };

    $scope.edit = function(id) {
        $location.path("/warehouse/adm/" + id);
    };
})