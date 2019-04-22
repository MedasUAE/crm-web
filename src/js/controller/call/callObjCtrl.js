angular
    .module('crmApp')
    .controller('callObjCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', 'callFactory', function ($scope, $state, $stateParams, dataFactory, callFactory) {
        $scope.data = {}
        $scope.remarkData = {}
        $scope.data.customerInfo = {};
        $scope.options = {};
        $scope.handlers = {
            activeClick: activeClick,
            save: save
        }


        init();

        function init() {
            $scope.options.userTypes = dataFactory.getUserType();
            $scope.options.offices = dataFactory.getOffices();
            $scope.options.sources = dataFactory.getSources();
            $scope.options.callTypes = dataFactory.getCallTypes();
            $scope.options.statuss = dataFactory.getStatuss();
            $scope.options.alertTypes = dataFactory.getAlertTypes();
            $scope.options.nationalities = dataFactory.getNationality();


            if (!$stateParams["id"] || $stateParams["id"] == "new") return;
            callFactory.getCall($stateParams["id"])
                .then((response) => {
                    // activeClick($scope.data.customerInfo.gender)
                    $scope.data = response.data.data;
                    //activeClick($scope.data.customerInfo.gender)
                    //  $scope.data.activeDate = new Date($scope.data.activeDate)
                }, function (error) {
                    console.log(error);
                })
        }
        function activeClick(value) {
            if (value) {
                if (value == 'male' || value == 'female' || value == 'other') {
                    $scope.data.customerInfo.gender = value;
                } else if (value == 'Inbound' || value == 'Outbound') {
                    $scope.data.callType = value;
                } else if (value == 'Open' || value == 'Close') {
                    $scope.data.status = value;
                } else if (value == 'remainder' || value == 'note') {
                    $scope.data.alertType = value;

                }
            }
        }

        function save() {
            callFactory.create($scope.data)
                .then((result) => {
                    $scope.remarkData.documentId = result.data.data._id;
                    console.log(result)
                    $scope.remarkData.remark = $scope.data.remark;
                    $scope.remarkData.collectionName = "call";
                    $scope.remarkData.createdBy = "101";
                    $scope.remarkData.customerId = "5cb471b427abca3044b38aaa";

                    callFactory.createRemark($scope.remarkData)
                        .then((result) => {
                            console.log("saved Remark:" + result)
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                    console.log(result)
                    $state.go('dashboard.calls')
                    // console.log($scope.data);
                    console.log("saved");
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }]);