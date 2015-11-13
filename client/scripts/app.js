var myApp = angular.module('myApp',['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/week1', {
           templateUrl: '/assets/views/routes/week1.html',
            controller: 'NoteController'
        }).
        when('/week2', {
            templateUrl: '/assets/views/routes/week2.html',
            controller: 'NoteController'
        }).
        when('/week3', {
            templateUrl: '/assets/views/routes/week3.html',
            controller: 'NoteController'
        }).
        otherwise({
            redirectTo: 'week1'
        })
}]);