app.service('settingService', function ($http, $q, commonService) {
    this.getListSetting = function () {
        var defer = $q.defer();
        $http.get("/settings?" + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getSettingForId = function (setting) {
        var defer = $q.defer();
        $http.post("/settings/forid", setting).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.saveSetting = function (setting) {
        var defer = $q.defer();
        $http.post("/settings/create", setting).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateSetting = function (setting) {
        var defer = $q.defer();
        $http.post("/settings/update", setting).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteSetting = function (setting) {
        var defer = $q.defer();
        $http.post("/settings/destroy", setting).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
})