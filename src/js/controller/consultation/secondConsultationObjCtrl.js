angular
    .module('crmApp')
    .controller('secondConsultationObjCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', 'consultationFactory', 'customerFactory', 'remarkFactory', function ($scope, $state, $stateParams, dataFactory, consultationFactory, customerFactory, remarkFactory) {
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
            $scope.data["consultationId"] = $stateParams.id;
            console.log($scope.data)
            consultationFactory.update($scope.data)
                .then((result) => {
                     console.log(result)
                     $state.go('dashboard.consultations')
                    //  console.log($scope.data);
                    // console.log("saved");
                })
                .catch((err) => {
                    console.log(err);
                })
        }


        function init() {
            $scope.options["addBtn"] = false;

            console.log($stateParams.id);
            // get  consultation by consult Id
            consultationFactory.getConsultationById($stateParams.id)
                .then((response) => {
                    console.log(response);
                    // if (response.data.data) {
                         $scope.options.consultationData = response.data.data.consultResult;
                    //     $scope.options.consultationData.remark ="";
                     
                    //     $scope.data = response.data.data;
                         $scope.options.customerData = response.data.data.consultResult.customerId;
                         $scope.options.noteList = response.data.data.remarkResult;
                         $scope.options["addBtn"] = false;
                    //     console.log( $scope.options.consultationData)
                    //     getRemarks()
                    //     $scope.options["addBtn"] = false;
                    // }
                }, function (error) {
                    console.log(error);
                })

        }

        function activeClick(value) {
            $scope.data.hairType = value;
        }

        function getRemarks() {
            // get customer remarks
            remarkFactory.getAllRemarks($scope.options.customerData._id)
                .then((response) => {
                    $scope.options.noteList = response.data.data;
                }, function (error) {
                    console.log(error);
                })
        }
    }]);