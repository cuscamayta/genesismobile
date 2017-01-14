app.service('moduleService', function ($http, $q, commonService) {
    this.getListModule = function () {
        var defer = $q.defer();
        $http.get("/modules?" + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getModuleForId = function (module) {
        var defer = $q.defer();
        $http.post("/modules/forid", module).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.saveModule = function (module) {
        var defer = $q.defer();
        $http.post("/modules/create", module).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateModule = function (module) {
        var defer = $q.defer();
        $http.post("/modules/update", module).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteModule = function (module) {
        var defer = $q.defer();
        $http.post("/modules/destroy", module).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
})