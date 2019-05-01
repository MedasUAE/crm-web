angular
    .module('crmApp')
    .controller('paymentObjCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', 'consultationFactory', 'customerFactory', 'remarkFactory', function ($scope, $state, $stateParams, dataFactory, consultationFactory, customerFactory, remarkFactory) {
        $scope.data = {}
        $scope.remarkData = {}
        $scope.options = {}
        $scope.options.customerId = {}
        $scope.handlers = {
            save: save,
            activeClick: activeClick,
            back: back

        }

        init();

        function back() {
            $state.go('dashboard.consultations')
            consultationFactory
        }
        function save() {
            console.log(consultationFactory.paymentPostData($scope.data)); // ToDo We need to pass two object options and installments
            // consultationFactory.update(consultationFactory.paymentPostData($scope.data))
            //     .then((result) => {
            //         console.log(result)
            //         $state.go('dashboard.consultations')
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     })
        }

        
        function init() {
            // ToDo Show existing Installments
            //ToDo Show pending amount in Amount
            // Todo Amount should not exceed total amount
            $scope.data["customerId"] = $stateParams.id;
            $scope.options["addBtn"] = true;
            $scope.options.customerData = $stateParams['obj'];
            $scope.options.customerId = $stateParams.id; // Why ToDo
            $scope.options.paymentTypes = dataFactory.getPaymentTypes();

              console.log($stateParams.id);
            // get customer details
            customerFactory.getCustomer($stateParams.id)
                .then((response) => {

                    $scope.options.customerData = response.data.data.customerResult;
                    $scope.options.consultationData = response.data.data.consultResult;
                    const data = {rhinoplasty : $scope.options.consultationData.rhinoplasty,
                        remark : $scope.options.consultationData.remark,
                        payment : {total: $scope.options.consultationData.payment.total},
                        
                    }
                    $scope.data = data;
                    console.log($scope.data);
                    $scope.options.noteList = response.data.data.remarkResult;
                   // console.log(response);
                }, function (error) {
                    console.log(error);
                })

            // get customer consultation
            // consultationFactory.getConsultation($stateParams.id)
            //     .then((response) => {
            //         if (response.data.data) {
                
            //             $scope.options.consultationData = response.data.data[0]; //change all non editable object to options :ToDo
            //             $scope.data = response.data.data[0];
            //             $scope.data.remark = ''; //No Remarks saving :ToDo
            //             $scope.data.installment = {};
            //             $scope.data.installment.amount =  $scope.data.payment.total;
            //           //  console.log( $scope.data);
            //             $scope.options["addBtn"] = false;
                      
            //         }
            //     }, function (error) {
            //         console.log(error);
            //     })

            // get customer remarks :ToDo Move Remarks to Backend
            // remarkFactory.getAllRemarks($stateParams.id)
            //     .then((response) => {
            //         $scope.options.noteList = response.data.data;
            //         // console.log($scope.options.noteList);
            //     }, function (error) {
            //         console.log(error);
            //     })
        }

        function activeClick(value) {
            $scope.data.hairType = value;
        }
    }]);