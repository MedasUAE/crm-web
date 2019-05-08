angular
    .module('crmApp')
    .controller('treatmentObjCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', 'customerFactory', 'remarkFactory', function ($scope, $state, $stateParams, dataFactory, customerFactory, remarkFactory) {
        $scope.data = {}
        $scope.options = {}
         $scope.options.noteList = [];
        $scope.handlers = {
            save: save,
            activeClick: activeClick,
            back: back,
         
          
        }

        init();

        function back() {
            $state.go('dashboard.consultations')

        }
        function save() {
            let paymentPostData = consultationFactory.paymentPostData($scope.data);
            let paymentRemainderData = {
                customerId: $scope.data.customerId,
                date: $scope.data.installments[0].date,
                status: $scope.data.payment.status,
                type: "Payment"
            }

            remainderFactory.createRemainderPayment(paymentRemainderData)
                .then((result) => {
                  })
                .catch((err) => {
                    console.log(err);
                })

            consultationFactory.update(paymentPostData)
                .then((result) => {
                 })
                .catch((err) => {
                    console.log(err);
                })
        }

        function init() {
            
            $scope.data["customerId"] = $stateParams.id;
            $scope.options["addBtn"] = true;
            $scope.options.customerData = $stateParams['obj'];
            $scope.options.paymentTypes = dataFactory.getPaymentTypes();

            // get customer, consultation, remarks  details
            customerFactory.getCustomer($stateParams.id)
                .then((response) => {
                    $scope.options.customerData = response.data.data.customerResult;
                    $scope.options.customerData.createdDate = response.data.data.createdDate;
                    $scope.options.customerData.createdTime = response.data.data.createdTime;
                    $scope.options.consultationData = response.data.data.consultResult;
                    if (response.data.data.consultResult) {

                        $scope.options["addBtn"] = false;
                    }
                    $scope.data.consultationId = response.data.data.consultResult._id;

                    $scope.data.rhinoplasty = response.data.data.consultResult.rhinoplasty;
                        $scope.data.remark = response.data.data.consultResult.remark;
                        $scope.data.payment = {
                            total: response.data.data.consultResult.payment.total,
                            status: response.data.data.consultResult.payment.status,
                            emis: response.data.data.consultResult.payment.emis
                        },
                        $scope.data.installments = response.data.data.consultResult.installments;
                        $scope.data.medicalsummary = response.data.data.consultResult.medicalsummary;
                     
                        let paidAmount = consultationFactory.paidAmount($scope.data);
                        $scope.data.installment = {};
          
                        $scope.data.installment.amount = parseInt($scope.data.payment.total) - paidAmount;
                      //  if($scope.data.installment.amount < 0 ) alert("Amount can't be greater than Total Cost ");

                     $scope.options.noteList = response.data.data.remarkResult;
                }, function (error) {
                    console.log(error);
                })
        }

        function activeClick(value) {
            $scope.data.hairType = value;
        }
    }]);