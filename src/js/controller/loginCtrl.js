angular
    .module('crmApp')
    .controller('loginCtrl', ['$scope', '$state', 'dataFactory', 'loginFactory', function ($scope, $state, dataFactory, loginFactory) {
        $scope.data = {}
        $scope.handlers = {
            login: login
        }

        function login() {
            if (!dataFactory.validatePage('login', $scope.data)) return;
            //getting user details and token if user exist  
            loginFactory.getUserDetails($scope.data)
                .then((response) => {
                    localStorage.setItem('token', response.data.data.token);
                    localStorage.setItem('userData', JSON.stringify(response.data.data));
                    $state.go('dashboard');
                }, function (error) {
                    console.log(error);
                })



        }
    }]);