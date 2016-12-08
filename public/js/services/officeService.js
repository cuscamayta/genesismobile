app.service('officeService', function ($http, $q, commonService) {
    this.getListOffice = function () {
        var defer = $q.defer();
        $http.get("/offices").success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getOfficeForId = function (office) {
        var defer = $q.defer();
        $http.post("/offices/forid", office).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.saveOffice = function (office) {
        var defer = $q.defer();
        $http.post("/offices/create", office).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateOffice = function (office) {
        var defer = $q.defer();
        $http.post("/offices/update", office).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteOffice = function (office) {
        var defer = $q.defer();
        $http.post("/offices/destroy", office).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };    
})