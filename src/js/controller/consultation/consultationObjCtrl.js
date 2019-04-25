angular
    .module('crmApp')
    .controller('consultationObjCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', 'consultationFactory', 'customerFactory', 'remarkFactory', function ($scope, $state, $stateParams, dataFactory, consultationFactory, customerFactory, remarkFactory) {
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
            consultationFactory.create($scope.data)
                .then((result) => {
                    console.log(result)
                    $state.go('dashboard.consultations')
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        function edit() {
            $scope.data["consultationId"] = $scope.data._id;
            console.log($scope.data)
            consultationFactory.update($scope.data)
                .then((result) => {
                    $scope.remarkData.documentId = result.data.data._id;
                    console.log(result)
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

                    console.log(result)
                    $state.go('dashboard.consultations')
                    // console.log($scope.data);
                    console.log("saved");
                })
                .catch((err) => {
                    console.log(err);
                })
        }


        function init() {
            $scope.data["customerId"] = $stateParams.id;
            $scope.options["addBtn"] = true;
            $scope.options.customerData = $stateParams['obj'];
            $scope.options.customerId = $stateParams.id;

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
                    if(response.data.data.length){
                        $scope.data = response.data.data[0];
                        $scope.options["addBtn"] = false;
                    }
                }, function (error) {
                    console.log(error);
                })
            // get customer remarks
            remarkFactory.getAllRemarks($stateParams.id)
                .then((response) => {
                    $scope.options.noteList = response.data.data;
                }, function (error) {
                    console.log(error);
                })
        }

        function activeClick(value) {
            $scope.data.hairType = value;
        }
    }]);