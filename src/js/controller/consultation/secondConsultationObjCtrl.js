angular
    .module('crmApp')
    .controller('secondConsultationObjCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', 'consultationFactory', 'customerFactory', 'remarkFactory', function ($scope, $state, $stateParams, dataFactory, consultationFactory, customerFactory, remarkFactory) {
        $scope.data = {}
         $scope.options = {}
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
            consultationFactory.update($scope.data)
                .then((result) => {
                        $state.go('dashboard.consultations')
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
                      if (response.data.data) {
                         $scope.options.consultationData = response.data.data.consultResult;
                          $scope.options.customerData = response.data.data.consultResult.customerId;
                         $scope.options.noteList = response.data.data.remarkResult;
                         $scope.options["addBtn"] = false;
                     }
                }, function (error) {
                    console.log(error);
                })

        }

        function activeClick(value) {
            $scope.data.hairType = value;
        }

    }]);