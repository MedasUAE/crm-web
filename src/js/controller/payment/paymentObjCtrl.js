angular
    .module('crmApp')
    .controller('paymentObjCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', 'consultationFactory', 'customerFactory', 'remarkFactory', function ($scope, $state, $stateParams, dataFactory, consultationFactory, customerFactory, remarkFactory) {
        $scope.data = {}
        $scope.remarkData = {}
        $scope.options = {}
        $scope.options.customerId = {}
        $scope.handlers = {
            save: save,
            edit: edit,
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

        

        function edit() {
            //ToDo Remove this
            $scope.data["consultationId"] = $scope.data._id;
            consultationFactory.update($scope.data)
                .then((result) => {
                    $scope.remarkData.documentId = result.data.data._id;
                    // console.log(result)
                    $scope.remarkData.remark = $scope.data.remark;
                    $scope.remarkData.collectionName = "Consultation";
                    $scope.remarkData.createdBy = "101";
                    $scope.remarkData.customerId = $stateParams.id;

                    remarkFactory.createRemark($scope.remarkData)
                        .then((result) => {
                            console.log("saved Remark:" + result)
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                    // console.log(result)
                    $state.go('dashboard.consultations')
                    // console.log($scope.data);
                    // console.log("saved");
                })
                .catch((err) => {
                    console.log(err);
                })
        }


        function init() {
            // ToDo Show existing Installments
            $scope.data["customerId"] = $stateParams.id;
            $scope.options["addBtn"] = true;
            $scope.options.customerData = $stateParams['obj'];
            $scope.options.customerId = $stateParams.id; // Why ToDo
            $scope.options.paymentTypes = dataFactory.getPaymentTypes();


            // get customer details
            customerFactory.getCustomer($stateParams.id)
                .then((response) => {

                    $scope.options.customerData = response.data.data;

                }, function (error) {
                    console.log(error);
                })
            // get curomet consultation
            consultationFactory.getConsultation($stateParams.id)
                .then((response) => {
                    if (response.data.data.length) {

                        $scope.options.consultationData = response.data.data[0]; //change all non editable object to options :ToDo
                        $scope.data = response.data.data[0];
                        $scope.data.remark = ''; //No Remarks saving :ToDo
                        $scope.data.installment = {};
                        $scope.data.installment.amount =  $scope.data.payment.total;
                        console.log( $scope.data);
                        $scope.options["addBtn"] = false;
                        // if($scope.data.payment.emis == 1) 
                    }
                }, function (error) {
                    console.log(error);
                })
            // get customer remarks :ToDo Move Remarks to Backend
            remarkFactory.getAllRemarks($stateParams.id)
                .then((response) => {
                    $scope.options.noteList = response.data.data;
                    // console.log($scope.options.noteList);
                }, function (error) {
                    console.log(error);
                })
        }

        function activeClick(value) {
            $scope.data.hairType = value;
        }
    }]);