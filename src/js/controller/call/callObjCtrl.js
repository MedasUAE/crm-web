angular
    .module('crmApp')
    .controller('callObjCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', 'callFactory', function ($scope, $state, $stateParams, dataFactory, callFactory) {
        $scope.data = {}

        $scope.remarkData = {}
        $scope.data.customerInfo = {};
        $scope.options = {};
        $scope.options.isHideFollowupDate = true;
        $scope.handlers = {
            activeClick: activeClick,
            save: save
        }

        init();

        function init() {
            $scope.data["callType"] = "Inbound";
            $scope.data["status"] = "Open";
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
                    $scope.data = response.data.data;
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
                } else if (value == 'followup') {
                    $scope.options.isHideFollowupDate = !$scope.options.isHideFollowupDate;
                    $scope.options.nextStep = value;
                } else if (value == 'appointment') {
                    $scope.options.nextStep = value;
                } else if (value == 'Close') {
                    $scope.options.nextStep = value;
                    $scope.data.status = value;

                }
            }
        }

        function save() {
             callFactory.create($scope.data)
                .then((result) => { 
                    console.log(result);
                      $state.go('dashboard.calls')
                    })
                .catch((err) => {
                    console.log(err);
                })
        }
    }]);