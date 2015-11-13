/**
 * Created by danesmith on 11/12/15.
 */
myApp.controller('NoteController', ['$scope', '$http', function($scope, $http){

    $scope.noteArray = [];

    $scope.note = {};

    $scope.saveNotes = function(noteObject){
        $scope.noteArray.push($scope.note);
        console.log($scope.noteArray);
        //$http.post('/note', noteObject).then(function(response) {
            $scope.note = {};
        //    $scope.getNotes();
        //})
    };

    $scope.getNotes = function(){
        $http.get('./note').then(function(response){
            $scope.noteArray = response.data;
        })
    };
    $scope.sendData = function(){
        console.log('Data would be sent to database');

        //$http.post('./note', noteArray).then(function(response){
        //    $scope.getNotes();
        //})
    };





}]);