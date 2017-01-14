app.service('transferService', function ($http, $q, commonService) {
    this.getListTransfer = function () {
        var defer = $q.defer();
        $http.get("/transfers?" + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getTransferForId = function (transfer) {
        var defer = $q.defer();
        $http.post("/transfers/forid", transfer).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.saveTransfer = function (transfer) {
        var defer = $q.defer();
        $http.post("/transfers/create", transfer).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.invalidateTransfer = function (transfer) {
        var defer = $q.defer();
        $http.post("/transfers/invalidate", transfer).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
})