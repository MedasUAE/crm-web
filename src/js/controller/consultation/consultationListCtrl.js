angular
    .module('crmApp')
    .controller('consultationListCtrl', ['$scope', 'dataFactory', 'consultationFactory', '$state', function ($scope, dataFactory, consultationFactory, $state) {
        $scope.data = {}
        $scope.options = {}
        $scope.options.params = {}
        $scope.handlers = {
            add: add,
            filter: filter,
            view: view
        }
        init();

        function init() {
            consultationFactory.getConsultations()
                .then((response) => {
                    $scope.options.consultationList = response.data.data;
                    console.log(response.data.data);
                }, function (error) {
                    console.log(error);
                })
        }

        function add() {
            $state.go('dashboard.customer', { obj: data })
        }

        function filter(label, value) {
            customerFactory.filter(label, value)
                .then((response) => {
                    $scope.options.customerList = response.data.data;
                    console.log(response.data.data);
                }, function (error) {
                    console.log(error);
                })
        };

        function view(id) {
            $state.go("dashboard.viewconsultation", { id: id })
        }


    }]);