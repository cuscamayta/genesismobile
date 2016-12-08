app.service('commonService', ['$http', '$q', '$ionicPopup', function ($http, $q, $ionicPopup) {

    this.showAlert = function (message, onFinish) {
        var alertPopup = $ionicPopup.alert({
            title: 'Jira Says.',
            template: message,
            buttons: [{
                text: 'Close',
                type: 'button-assertive'
            }]
        });

        alertPopup.then(function (res) {
            if (onFinish)
                onFinish();
        });
    };
    this.showSucces = function (message, onFinish) {
        var alertPopup = $ionicPopup.alert({
            title: 'Jira Says.',
            template: message,
            buttons: [{
                text: 'Close',
                type: 'button-balanced'
            }]
        });

        alertPopup.then(function (res) {
            if (onFinish)
                onFinish();
        });
    };

    this.getUser = function () {
        return getItemFromLocalstorage('currentUser');
    }

    this.isUserLogged = function () {
        var user = this.getUser();
        return user ? true : false;
    }

    this.isSettingValid = function () {
        var settings = this.getSettings();
        if (!settings) return false;

        if (settings.userName && settings.projectName)
            return true;
        return false;

    }

    this.getProjects = function () {
        var defer = $q.defer();
        $http.get('/getProjects').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    //remove after implement settings
    this.getSprintNumbersByProject = function (projectKey) {
        var defer = $q.defer();
        $http.get('/getSprintsByProject?project=' + projectKey).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getSprintsByProject = function (projectKey) {
        var defer = $q.defer();
        $http.get('/getSprintsByProject?project=' + projectKey).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getVersionsByProject = function (project) {
        var defer = $q.defer();
        $http.get('/getprojectVersions?project='.concat(project)).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getTimeMilliseconds = function () {
        return new Date().getMilliseconds;
    };
}])
