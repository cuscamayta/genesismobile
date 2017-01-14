app.controller('settingAdmController', function($scope, settingService, commonService, $stateParams) {
    init();

    $scope.saveSetting = function() {
        if ($scope.setting.id == 0) {
            settingService.saveSetting($scope.setting).then(function(res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        } else {
            settingService.updateSetting($scope.setting).then(function(res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        }
    }
    
    function init() {
        $scope.setting = {};
        var settingId = $stateParams.settingId;
        if (settingId > 0) {
            getForId(settingId);
        } else {
            $scope.setting = { id: 0, state: 1 };
        }
    }

    function getForId(settingId) {
        $scope.setting.id = settingId;
        settingService.getSettingForId($scope.setting).then(function(res) {
            if (res.isSuccess) { $scope.setting = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.validateControls = function () {
        return $scope.setting == null || $scope.setting.title == null
            || $scope.setting.numberid == null || $scope.setting.note == null;
    };
})

app.controller('settingListController', function($scope, settingService, commonService, $ionicActionSheet, $location) {
    getList();

    function getList() {
        settingService.getListSetting().then(function(res) {
            if (res.isSuccess) { $scope.settings = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.showActionsheet = function(setting) {
        $ionicActionSheet.show({
            titleText: '¿Esta seguro de eliminar este registro?',
            destructiveText: 'Eliminar',
            cancelText: 'Cancelar',
            destructiveButtonClicked: function() {
                deleteSetting(setting);
                return true;
            }
        });
    };

    function deleteSetting(setting) {
        var response = settingService.deleteSetting(setting);
        response.then(function(res) {
            if (res.isSuccess) {
                toastr.success(res.message);
                getList();
            } else {
                toastr.error(res.message);
            }
        })
    };

    $scope.edit = function(id) {
        $location.path("/setting/adm/" + id);
    };
})