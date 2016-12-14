app.service('orderBookService', function ($http, $q, commonService) {
    this.getListOrderBook = function () {
        var defer = $q.defer();
        $http.get("/orderbooks").success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getOrderBookForId = function (orderBook) {
        var defer = $q.defer();
        $http.post("/orderbooks/forid", orderBook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.saveOrderBook = function (orderBook) {
        var defer = $q.defer();
        $http.post("/orderbooks/create", orderBook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateOrderBook = function (orderBook) {
        var defer = $q.defer();
        $http.post("/orderbooks/update", orderBook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteOrderBook = function (orderBook) {
        var defer = $q.defer();
        $http.post("/orderbooks/destroy", orderBook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
})