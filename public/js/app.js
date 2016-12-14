var app = angular.module('genesisMobileApp', ['ionic', 'pickadate', 'ionic-modal-select']);

app.run(function($ionicPlatform, $rootScope, $location) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.$broadcast(toState.url);
    });
})

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $httpProvider.interceptors.push('customeInterceptor');
    $stateProvider
        .state('office', {
            url: '/office',
            controller: 'TabsCtrl',
            templateUrl: 'templates/config/office/office.html'
        })
        .state('office.detail', {
            url: '/detail',
            views: {
                'detail-office': {
                    templateUrl: 'templates/config/office/office-list.html',
                    controller: 'officeListController'
                }
            }
        })
        .state('office.adm', {
            url: '/adm/:officeId',
            views: {
                'adm-office': {
                    templateUrl: 'templates/config/office/office-adm.html',
                    controller: 'officeAdmController'
                }
            }
        })
        .state('role', {
            url: '/role',
            controller: 'TabsCtrl',
            templateUrl: 'templates/security/role/role.html'
        })
        .state('role.detail', {
            url: '/detail',
            views: {
                'detail-role': {
                    templateUrl: 'templates/security/role/role-list.html',
                    controller: 'roleListController'
                }
            }
        })
        .state('role.adm', {
            url: '/adm/:roleId',
            views: {
                'adm-role': {
                    templateUrl: 'templates/security/role/role-adm.html',
                    controller: 'roleAdmController'
                }
            }
        })

        .state('module', {
            url: '/module',
            controller: 'TabsCtrl',
            templateUrl: 'templates/security/module/module.html'
        })
        .state('module.detail', {
            url: '/detail',
            views: {
                'detail-module': {
                    templateUrl: 'templates/security/module/module-list.html',
                    controller: 'moduleListController'
                }
            }
        })
        .state('module.adm', {
            url: '/adm/:moduleId',
            views: {
                'adm-module': {
                    templateUrl: 'templates/security/module/module-adm.html',
                    controller: 'moduleAdmController'
                }
            }
        })

        .state('item', {
            url: '/item',
            controller: 'TabsCtrl',
            templateUrl: 'templates/inventory/item/item.html'
        })
        .state('item.detail', {
            url: '/detail',
            views: {
                'detail-item': {
                    templateUrl: 'templates/inventory/item/item-list.html',
                    controller: 'itemListController'
                }
            }
        })
        .state('item.adm', {
            url: '/adm/:itemId',
            views: {
                'adm-item': {
                    templateUrl: 'templates/inventory/item/item-adm.html',
                    controller: 'itemAdmController'
                }
            }
        })

        .state('warehouse', {
            url: '/warehouse',
            controller: 'TabsCtrl',
            templateUrl: 'templates/inventory/warehouse/warehouse.html'
        })
        .state('warehouse.detail', {
            url: '/detail',
            views: {
                'detail-warehouse': {
                    templateUrl: 'templates/inventory/warehouse/warehouse-list.html',
                    controller: 'warehouseListController'
                }
            }
        })
        .state('warehouse.adm', {
            url: '/adm/:warehouseId',
            views: {
                'adm-warehouse': {
                    templateUrl: 'templates/inventory/warehouse/warehouse-adm.html',
                    controller: 'warehouseAdmController'
                }
            }
        })

        .state('login', {
            url: '/login',
            controller: 'loginController',
            templateUrl: 'templates/login.html'
        })

    $urlRouterProvider.otherwise('/office/detail');
});

app.controller('TabsCtrl', function($scope, $ionicSideMenuDelegate) {

    $scope.openMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    }

});

app.controller('HomeTabCtrl', function($scope, $ionicSideMenuDelegate) {

});

app.factory('customeInterceptor', ['$timeout', '$injector', '$q', '$location', function($timeout, $injector, $q, $location) {

    var requestInitiated;

    function showLoadingText() {
        $injector.get("$ionicLoading").show({
            template: 'Loading...',
            animation: 'fade-in',
            showBackdrop: true
        });
    };

    function hideLoadingText() {
        $injector.get("$ionicLoading").hide();
    };

    return {
        request: function(config) {

            var extension = config.url.slice(-4);
            if (extension != "html") {
                requestInitiated = true;
                showLoadingText();
            }
            return config;
        },
        response: function(response) {
            requestInitiated = false;
            $timeout(function() {
                if (requestInitiated) return;
                hideLoadingText();
            }, 300);
            return response;
        },
        requestError: function(err) {
            hideLoadingText();
            return err;
        },
        responseError: function(err) {
            hideLoadingText();
            if (err.status == 401) {
                var commonService = $injector.get('commonService');
                hasTolog = false;
                commonService.showAlert('You must login to continue.', function() {
                    $location.path('/login');
                });
            }
            return $q.reject(err);
        }
    }
}]);