app.controller('officeAdmController', function($scope, officeService, commonService, $stateParams) {
    init();

    $scope.saveOffice = function() {
        if ($scope.office.id == 0) {
            officeService.saveOffice($scope.office).then(function(res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        } else {
            officeService.updateOffice($scope.office).then(function(res) {
                if (res.isSuccess) {
                    toastr.success("Se guardo correctamente");
                } else {
                    toastr.error("Error al guardar intente nuevamente");
                }
            });
        }
    }
    
    function init() {
        $scope.office = {};
        var officeId = $stateParams.officeId;
        if (officeId > 0) {
            getForId(officeId);
        } else {
            $scope.office = { id: 0, state: 1 };
        }
    }

    function getForId(officeId) {
        $scope.office.id = officeId;
        officeService.getOfficeForId($scope.office).then(function(res) {
            if (res.isSuccess) { $scope.office = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.validateControls = function () {
        return $scope.office == null || $scope.office.title == null
            || $scope.office.phone == null || $scope.office.address == null;
    };
})

app.controller('officeListController', function($scope, officeService, commonService, $ionicActionSheet, $location) {
    getList();

    function getList() {
        officeService.getListOffice().then(function(res) {
            if (res.isSuccess) { $scope.offices = res.data; }
            else { toastr.error(res.message); }
        });
    }

    $scope.showActionsheet = function(office) {
        $ionicActionSheet.show({
            titleText: '¿Esta seguro de eliminar este registro?',
            destructiveText: 'Eliminar',
            cancelText: 'Cancelars',
            destructiveButtonClicked: function() {
                deleteOffice(office);
                return true;
            }
        });
    };

    function deleteOffice(office) {
        var response = officeService.deleteOffice(office);
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
        $location.path("/office/adm/" + id);
    };
})