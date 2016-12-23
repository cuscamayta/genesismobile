app.controller('moduleAdmController', function($scope, moduleService, commonService, $stateParams) {
    init();

    $scope.saveModule = function() {
        if ($scope.module.id == 0) {
            moduleService.saveModule($scope.module).then(function(res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        } else {
            moduleService.updateModule($scope.module).then(function(res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        }
    }

    function init() {
        $scope.module = {};
        var moduleId = $stateParams.moduleId;
        if (moduleId > 0) {
            getForId(moduleId);
        } else {
            $scope.module = { id: 0, state: 1 };
        }
    }

    function getForId(moduleId) {
        $scope.module.id = moduleId;
        moduleService.getModuleForId($scope.module).then(function(res) {
            if (res.isSuccess) { $scope.module = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.validateControls = function () {
        return $scope.module == null || $scope.module.title == null
        || $scope.module.class == null;
    };
})

app.controller('moduleListController', function($scope, moduleService, commonService, $ionicActionSheet, $location) {
    getList();

    function getList() {
        moduleService.getListModule().then(function(res) {
            if (res.isSuccess) { $scope.modules = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.showActionsheet = function(module) {
        $ionicActionSheet.show({
            titleText: '¿Esta seguro de eliminar este registro?',
            destructiveText: 'Eliminar',
            cancelText: 'Cancelar',
            destructiveButtonClicked: function() {
                deleteModule(module);
                return true;
            }
        });
    };

    function deleteModule(module) {
        var response = moduleService.deleteModule(module);
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
        $location.path("/module/adm/" + id);
    };
})