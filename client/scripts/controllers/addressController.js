/**
 * Created by danesmith on 11/16/15.
 */
ordersApp.controller('AddressController', ['$scope', '$http', function($scope, $http){
    console.log('AddressController is hooked up');
    $scope.users = [];
    $scope.currentUser = {};
    $scope.userAddresses =[];

    $scope.getUsers = function(){
        $http.get('/users').then(function(response){
            $scope.users = response.data;
            console.log($scope.users);
        })
    };
    $scope.getAddresses = function(){
        var sendUser = ($scope.currentUser);
        $http.get('/addresses', {params: {user: sendUser.id}} ).then(function(response){
            $scope.userAddresses = response.data;
        })
    };


    $scope.getUsers();
}]);