app.service('warehouseService', function ($http, $q, commonService) {
    this.getListWarehouse = function () {
        var defer = $q.defer();
        $http.get("/warehouses?" + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getWarehouseForId = function (warehouse) {
        var defer = $q.defer();
        $http.post("/warehouses/forid", warehouse).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.saveWarehouse = function (warehouse) {
        var defer = $q.defer();
        $http.post("/warehouses/create", warehouse).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateWarehouse = function (warehouse) {
        var defer = $q.defer();
        $http.post("/warehouses/update", warehouse).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteWarehouse = function (warehouse) {
        var defer = $q.defer();
        $http.post("/warehouses/destroy", warehouse).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
})