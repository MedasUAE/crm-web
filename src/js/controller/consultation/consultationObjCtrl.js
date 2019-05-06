angular
    .module('crmApp')
    .controller('consultationObjCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', 'consultationFactory', 'customerFactory', 'remarkFactory', function ($scope, $state, $stateParams, dataFactory, consultationFactory, customerFactory, remarkFactory) {
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
                  //  console.log(result)
                    $state.go('dashboard.consultations')
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        function edit() {
           // $scope.data["consultationId"] =  $stateParams.id;
            console.log($scope.data)
            consultationFactory.update($scope.data)
                .then((result) => {
                       $state.go('dashboard.consultations')
                    
                })
                .catch((err) => {
                    console.log(err);
                })
        }


        function init() {
              $scope.options["addBtn"] = true;
            $scope.options.customerData = $stateParams['obj'];
            // get customer, remark, consultation(if consultation done)  details
            customerFactory.getCustomer($stateParams.id)
                .then((response) => {
                    console.log(response);
                    $scope.options.customerData = response.data.data.customerResult;
                    $scope.options.customerData.createdDate =  response.data.data.createdDate;
                    $scope.options.customerData.createdTime =  response.data.data.createdTime;
                    $scope.options.noteList = response.data.data.remarkResult;
                     // if consultation already done then edit mode
                    if(response.data.data.consultResult) {
                     $scope.options["addBtn"] = false; 
                        $scope.data.noOfHair = response.data.data.consultResult.noOfHair,
                        $scope.data.implantType = response.data.data.consultResult.rhinoplasty,
                        $scope.data.remark = response.data.data.consultResult.remark,
                        $scope.data.implantArea = response.data.data.consultResult.implantArea,
                        $scope.data.prp = response.data.data.consultResult.prp,
                        $scope.data.bloodTest = response.data.data.consultResult.bloodTest,
                        $scope.data.consultationId = response.data.data.consultResult._id
                        
                  } 
                 
                  $scope.data.customerId = $stateParams.id;
                 }, function (error) {
                    console.log(error);
                })
            
        }

        function activeClick(value) {
           $scope.data.hairType = value;
         
        }
    }]);