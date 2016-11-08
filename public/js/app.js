var app=angular.module('app',[]);
app.controller('MainController',function($scope,$http){
	$scope.msg = "It is new";
	$http.get("data/employees.json")
    .then(function(response) {
        $scope.emp = response.data.employees;
        //console.log(response.data);
    });
});