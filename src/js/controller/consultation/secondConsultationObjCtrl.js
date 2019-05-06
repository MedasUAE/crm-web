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
       // get  consultation by consultation Id
            consultationFactory.getConsultationById($stateParams.id)
                .then((response) => {
                      if (response.data.data) {
                        $scope.options["addBtn"] = false;
                        $scope.data["customerId"] =  response.data.data.consultResult.customerId._id;
                         $scope.options.consultationData = response.data.data.consultResult;
                          $scope.options.customerData = response.data.data.consultResult.customerId;
                          $scope.options.customerData.createdDate = response.data.data.createdDate;
                          $scope.options.customerData.createdTime = response.data.data.createdTime;
                          $scope.options.noteList = response.data.data.remarkResult;
                       
                     }
                }, function (error) {
                    console.log(error);
                })

        }

        function activeClick(value) {
            $scope.data.hairType = value;
        }

    }]);