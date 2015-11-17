var ordersApp = angular.module('ordersApp', ['ngRoute']);

ordersApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/address', {
            templateUrl: '/assets/views/routes/address.html',
            controller: 'AddressController'
        }).
        when('/date', {
            templateUrl: '/assets/views/routes/date.html',
            controller: 'DateController'
        }).
        otherwise({
            redirectTo: 'address'
        })
}]);