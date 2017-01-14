app.service('saleService', function ($http, $q, commonService) {
    this.getListSale = function () {
        var defer = $q.defer();
        $http.get("/sales?" + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getSaleForId = function (sale) {
        var defer = $q.defer();
        $http.post("/sales/forid", sale).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.saveSale = function (sale) {
        var defer = $q.defer();
        $http.post("/sales/create", sale).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.invalidateInvoice = function (sale) {
        var defer = $q.defer();
        $http.post("/sales/destroy", sale).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
})