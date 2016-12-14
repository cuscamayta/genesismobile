app.controller('orderBookAdmController', function ($scope, orderBookService, commonService, $stateParams) {
    init();

    $scope.saveOrderBook = function () {
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

    $scope.updateOrderBook = function () {
        orderBookService.updateOrderBook($scope.orderBook).then(function (res) {
            if (res.isSuccess) {
                toastr.success("Se guardo correctamente");
            } else {
                toastr.error("Error al guardar intente nuevamente");
            }
        })
    }

    function init() {
        $scope.orderBook = {};
        var orderBookId = $stateParams.orderBookId;
        if (orderBookId > 0) {
            getForId(orderBookId);
        } else {
            $scope.orderBook = { id: 0, state: 1 };
        }
    }

    function getForId(orderBookId) {
        $scope.orderBook.id = orderBookId;
        orderBookService.getOrderBookForId($scope.orderBook).then(function (res) {
            if (res.isSuccess) { $scope.orderBook = res.data; }
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
            cancelText: 'Cancelars',
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