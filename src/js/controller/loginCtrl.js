angular
    .module('crmApp')
    .controller('loginCtrl', ['$scope','$state','dataFactory', function($scope, $state, dataFactory){
        $scope.data = {}
        $scope.handlers = {
            login:login
        }

        function login(){
            //enter log data
            if(!dataFactory.validatePage('login', $scope.data))  return;
            localStorage.setItem('token', "")
            $state.go('dashboard'); 
        }
    }]);