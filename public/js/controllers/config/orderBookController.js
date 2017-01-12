app.controller('orderBookAdmController', function ($scope, orderBookService, commonService, $stateParams, officeService) {
    init();

    $scope.saveOrderBook = function () {
        $scope.orderBook.status = $scope.orderBook.status.id;
        $scope.orderBook.idoffice = $scope.orderBook.office.id;
        if ($scope.orderBook.id == 0) {
            orderBookService.saveOrderBook($scope.orderBook).then(function (res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        } else {
            orderBookService.updateOrderBook($scope.orderBook).then(function (res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        }
    }

    function init() {
        getListOffice();
        $scope.orderBook = {};
        $scope.office = {};
        var orderBookId = $stateParams.orderBookId;
        if (orderBookId > 0) {
            getForId(orderBookId);
        } else {
            $scope.orderBook = { id: 0, state: 1 };
        }

        var data = [{ id: 1, name: 'Disponible' }, { id: 2, name: 'En uso' }, { id: 3, name: 'Lleno' }];
        $scope.listStatus = data;
    }

    function getForId(orderBookId) {
        $scope.orderBook.id = orderBookId;
        orderBookService.getOrderBookForId($scope.orderBook).then(function (res) {
            if (res.isSuccess) { $scope.orderBook = res.data; }
            else { toastr.error(res.message); }
        });
    }

    function getListOffice() {
        officeService.getListOffice().then(function (res) {
            if (res.isSuccess) { $scope.listOffice = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.validateControls = function () {
        return $scope.orderBook == null || $scope.orderBook.numberorder == null
            || $scope.orderBook.controlkey == null || $scope.orderBook.dateofissue == null
            || $scope.orderBook.deadline == null || $scope.orderBook.status == null;
    };
})

app.controller('orderBookListController', function ($scope, orderBookService, commonService, $ionicActionSheet, $location) {
    getList();

    function getList() {
        orderBookService.getListOrderBook().then(function (res) {
            if (res.isSuccess) { $scope.orderBooks = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.showActionsheet = function (orderBook) {
        $ionicActionSheet.show({
            titleText: '¿Esta seguro de eliminar este registro?',
            destructiveText: 'Eliminar',
            cancelText: 'Cancelar',
            destructiveButtonClicked: function () {
                deleteOrderBook(orderBook);
                return true;
            }
        });
    };

    function deleteOrderBook(orderBook) {
        var response = orderBookService.deleteOrderBook(orderBook);
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
        $location.path("/orderBook/adm/" + id);
    };
})