angular
    .module('crmApp')
    .controller('consultationCtrl', ['$scope','$stateParams' ,'dataFactory', function($scope, $stateParams, dataFactory){
        $scope.data = {}
        $scope.options = {}
        $scope.handlers = {}

        init();

        function init() {
            $scope.options.patientInfo = dataFactory.getPatients($stateParams["consultId"]);
            console.log(dataFactory.getPatients($stateParams["consultId"]));
        }
    }]); 