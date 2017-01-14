app.service('itemService', function ($http, $q, commonService) {
    this.getListItem = function () {
        var defer = $q.defer();
        $http.get("/items?" + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getItemForId = function (item) {
        var defer = $q.defer();
        $http.post("/items/forid", item).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.saveItem = function (item) {
        var defer = $q.defer();
        $http.post("/items/create", item).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateItem = function (item) {
        var defer = $q.defer();
        $http.post("/items/update", item).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteItem = function (item) {
        var defer = $q.defer();
        $http.post("/items/destroy", item).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
})