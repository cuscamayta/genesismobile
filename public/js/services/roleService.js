app.service('roleService', function ($http, $q, commonService) {
    this.getListRole = function () {
        var defer = $q.defer();
        $http.get("/roles?" + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getRoleForId = function (role) {
        var defer = $q.defer();
        $http.post("/roles/forid", role).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.saveRole = function (role) {
        var defer = $q.defer();
        $http.post("/roles/create", role).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateRole = function (role) {
        var defer = $q.defer();
        $http.post("/roles/update", role).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteRole = function (role) {
        var defer = $q.defer();
        $http.post("/roles/destroy", role).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
})