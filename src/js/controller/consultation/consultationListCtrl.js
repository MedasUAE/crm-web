angular
    .module('crmApp')
    .controller('consultationListCtrl', ['$scope', 'dataFactory', 'consultationFactory', '$state', function ($scope, dataFactory, consultationFactory, $state) {
        $scope.data = {}
        $scope.options = {}
        $scope.options.params = {}
        $scope.handlers = {
            add: add,
            filter: filter,
            secondConsultation : secondConsultation,
            startPayment
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

        function secondConsultation(id) {
            $state.go("dashboard.secondconsultation", { id: id })
        }
        function startPayment(data) { 
            console.log(data);   
            $state.go('dashboard.payment',{id: data.customerId._id,obj:data})
           
        }


    }]);