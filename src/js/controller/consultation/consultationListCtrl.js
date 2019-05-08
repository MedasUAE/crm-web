angular
    .module('crmApp')
    .controller('consultationListCtrl', ['$scope', 'consultationFactory','remainderFactory', '$state', function ($scope,consultationFactory,remainderFactory,$state) {
        $scope.data = {}
        $scope.options = {}
         $scope.handlers = {
            add: add,
            filter: filter,
            secondConsultation : secondConsultation,
            startPayment,
            fileOpenRemainder:fileOpenRemainder,
            startTreatment:startTreatment
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

        function secondConsultation(consultationId) {
            $state.go("dashboard.secondconsultation", { id: consultationId })
        }
        function startPayment(data) { 
           // console.log(data);   
            $state.go('dashboard.payment',{id: data.customerId._id,obj:data})
        }
        function fileOpenRemainder(data) { 
             remainderFactory.createRemainderFileOpen({customerId:data.customerId._id,date: data.createdAt,type:"FileOpen"})
             .then((result) => { 
                 console.log(result);
                    })
             .catch((err) => {
                 console.log(err);
             })
         }
         function startTreatment(data) { 
            // console.log(data);   
             $state.go('dashboard.treatment',{id: data.customerId._id,obj:data})
         }
         
    }]);