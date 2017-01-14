app.service('inventoryService', function ($http, $q, commonService) {
    this.getListInventory = function () {
        var defer = $q.defer();
        $http.get("/inventorytransactions?" + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getInventoryForId = function (inventory) {
        var defer = $q.defer();
        $http.post("/inventorytransactions/forid", inventory).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.saveInventory = function (inventory) {
        var defer = $q.defer();
        $http.post("/inventorytransactions/create", inventory).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateInventory = function (inventory) {
        var defer = $q.defer();
        $http.post("/inventorytransactions/update", inventory).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteInventory = function (inventory) {
        var defer = $q.defer();
        $http.post("/inventorytransactions/destroy", inventory).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
})