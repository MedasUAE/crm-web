angular
    .module('crmApp')
    .controller('customerListCtrl', ['$scope', 'dataFactory', '$state', function ($scope, dataFactory, $state) {
        $scope.data = {}
        $scope.options = {}
        $scope.handlers = {
            add: add
        }

        init();

        function init() {
            $scope.options.patientlist = dataFactory.getPatients();
        }

        function add() {
            console.log("object");
            $state.go('dashboard.customer')
        }
    }]);