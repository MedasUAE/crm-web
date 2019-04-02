angular
    .module('crmApp')
    .controller('consultationListCtrl', ['$scope','dataFactory', '$state', function($scope, dataFactory, $state){
        $scope.data = {}
        $scope.options = {}
        $scope.handlers = {
            start:startConsultation
        }

        init();

        function init() {
            $scope.options.patientlist = dataFactory.getPatients();
            $('[data-toggle="tooltip"]').tooltip();
        }

        function startConsultation(id) {
            $state.go('dashboard.consultation', {consultId: id})
        }
    }]);