angular
    .module('crmApp')
    .controller('consultationObjCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', 'consultationFactory', 'customerFactory','remarkFactory', function ($scope, $state, $stateParams, dataFactory, consultationFactory, customerFactory,remarkFactory) {
        $scope.data = {}
        $scope.remarkData = {}
        $scope.options = {}
        $scope.options.customerId = {}
        $scope.handlers = {
            save: save,
            edit:edit,
            activeClick: activeClick,
            back: back

        }

        init();

        function back() {
            $state.go('dashboard.consultations')
            consultationFactory
        }
        function save() {
             $scope.data["customerId"] =  $stateParams.id;
             console.log($scope.data) 
            consultationFactory.create($scope.data)
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

        function edit() {
            $scope.data["customerId"] =  $stateParams.id;
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
            $scope.data["customerId"] =  $stateParams.id;
            $scope.options["addBtn"] = true;
         
            
         
            consultationFactory.getConsultation($stateParams.id)
            .then((response) => {
                $scope.data = response.data.data;
                if( $scope.data) {
                    $scope.options["addBtn"] = false;
                  
                }  
              
                console.log( $scope.data)
            }, function (error) {
                console.log(error);
            })

           // $scope.options.hairTypes = dataFactory.getHairType();
            consultationFactory.getRemarks($scope.options.customerId)
                .then((response) => {
                    $scope.options.noteList = response.data.data;
                }, function (error) {
                    console.log(error);
                })

            $scope.options.customerData = $stateParams['obj'];
            if ($scope.options.customerData) {
                $scope.options.customerId = $scope.options.customerData._id;
            } else {
                console.log($stateParams.id);
                customerFactory.getCustomer($stateParams.id)
                    .then((response) => {
                        $scope.options.customerData = response.data.data;
                    }, function (error) {
                        console.log(error);
                    })
            }

        }

        function activeClick(value) {
            $scope.data.hairType = value;
        }
    }]);