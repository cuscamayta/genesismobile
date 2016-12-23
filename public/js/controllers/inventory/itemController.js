app.controller('itemAdmController', function ($scope, itemService, commonService, $stateParams, $location) {
    init();

    $scope.saveItem = function () {
        if ($scope.item.id == 0) {
            itemService.saveItem($scope.item).then(function (res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");    
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        } else {
            itemService.updateItem($scope.item).then(function (res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        }
    }

    function init() {
        $scope.item = {};
        var itemId = $stateParams.itemId;
        if (itemId > 0) {
            getForId(itemId);
        } else {
            $scope.item = { id: 0, state: 1 };
        }
    }

    function getForId(itemId) {
        $scope.item.id = itemId;
        itemService.getItemForId($scope.item).then(function (res) {
            if (res.isSuccess) { $scope.item = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.validateControls = function () {
        return $scope.item == null || $scope.item.name == null
            || $scope.item.make == null || $scope.item.model == null
            || $scope.item.cost == null || $scope.item.serialnumber == null
            || $scope.item.type == null || $scope.item.unitprice == null
            || $scope.item.wholesaleprice == null;
    };
})

app.controller('itemListController', function ($scope, itemService, commonService, $ionicActionSheet, $location) {
    getList();

    function getList() {
        itemService.getListItem().then(function (res) {
            if (res.isSuccess) { $scope.items = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.showActionsheet = function (item) {
        $ionicActionSheet.show({
            titleText: '¿Esta seguro de eliminar este registro?',
            destructiveText: 'Eliminar',
            cancelText: 'Cancelar',
            destructiveButtonClicked: function () {
                deleteItem(item);
                return true;
            }
        });
    };

    function deleteItem(item) {
        var response = itemService.deleteItem(item);
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
        $location.path("/item/adm/" + id);
    };
})