angular
    .module('crmApp')
    .controller('loginCtrl', ['$scope','$state','dataFactory', function($scope, $state, dataFactory){
        $scope.data = {}
        $scope.handlers = {
            login:login
        }

        function login(){
            if(!dataFactory.validatePage('login', $scope.data))  return;
            localStorage.setItem('token', "123")
            $state.go('dashboard'); 
        }
    }]);