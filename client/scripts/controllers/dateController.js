/**
 * Created by danesmith on 11/16/15.
 */
ordersApp.controller('DateController', ['$scope', '$http', '$filter', function($scope, $http, $filter){
    console.log('DateController is hooked up');
    $scope.users = [];
    $scope.currentUser = {};
    $scope.orderInfo = [];
    $scope.totalSpent = 0;

    $scope.getUsers = function(){
        $http.get('/users').then(function(response){
            $scope.users = response.data;
            console.log($scope.users);
        })
    };

    $scope.search = function(){
        var sendUser = {};
        sendUser.id = $scope.currentUser.id;
        sendUser.dateStart = $filter('date')($scope.currentUser.dateStart, "yyyy-MM-dd");
        sendUser.dateEnd = $filter('date')($scope.currentUser.dateEnd, "yyyy-MM-dd");

        $http.get('/dates', {params: sendUser}).then(function(response){
            $scope.orderInfo = response.data;
            console.log($scope.orderInfo);
            $scope.total()
        })
    };
    $scope.total = function(){
      for(var i =0; i < $scope.orderInfo.length; i++){
          $scope.totalSpent += Number($scope.orderInfo[i].amount);
          console.log($scope.totalSpent);
      }
    };

    $scope.getUsers();
}]);