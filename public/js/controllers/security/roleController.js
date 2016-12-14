app.controller('roleAdmController', function($scope, roleService, commonService, $stateParams) {
    init();

    $scope.saveRole = function() {
        if ($scope.role.id == 0) {
            roleService.saveRole($scope.role).then(function(res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        } else {
            roleService.updateRole($scope.role).then(function(res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        }
    }

    $scope.updateRole = function() {
        roleService.updateRole($scope.role).then(function(res) {
            if (res.isSuccess) {
                toastr.success("Se guardo correctamente");
            } else {
                toastr.error("Error al guardar intente nuevamente");
            }
        })
    }

    function init() {
        $scope.role = {};
        var roleId = $stateParams.roleId;
        if (roleId > 0) {
            getForId(roleId);
        } else {
            $scope.role = { id: 0, state: 1 };
        }
    }

    function getForId(roleId) {
        $scope.role.id = roleId;
        roleService.getRoleForId($scope.role).then(function(res) {
            if (res.isSuccess) { $scope.role = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.validateControls = function () {
        return $scope.role == null || $scope.role.title == null;
    };
})

app.controller('roleListController', function($scope, roleService, commonService, $ionicActionSheet, $location) {
    getList();

    function getList() {
        roleService.getListRole().then(function(res) {
            if (res.isSuccess) { $scope.roles = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.showActionsheet = function(role) {
        $ionicActionSheet.show({
            titleText: '¿Esta seguro de eliminar este registro?',
            destructiveText: 'Eliminar',
            cancelText: 'Cancelars',
            destructiveButtonClicked: function() {
                deleteRole(role);
                return true;
            }
        });
    };

    function deleteRole(role) {
        var response = roleService.deleteRole(role);
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
        $location.path("/role/adm/" + id);
    };
})