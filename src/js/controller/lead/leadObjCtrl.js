angular
    .module('crmApp')
    .controller('leadObjCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', 'customerFactory', 'remarkFactory', function ($scope, $state, $stateParams, dataFactory, customerFactory, remarkFactory) {
        $scope.data = {}
      //  $scope.data.demography = {}
      //  $scope.data.contact = {}
        
        $scope.options = {}
      //  $scope.options.callId = {}
        $scope.options.noteList = [];
        $scope.handlers = {
            save: save,
            activeClick: activeClick,
            back: back,
            dateChange: dateChange,
           loadTags: loadTags
          
        }

        init();

        function dateChange(eleID) {
            dataFactory.dateFormat(eleID)
            $scope.data.age = dataFactory.ageCal($scope.data.dob);
        }


        function back() {
            $state.go('dashboard.customers')
        }

        function loadTags(query) {
            return $scope.options.sources = dataFactory.getSources(query);
        }

        function save() {
           customerFactory.create($scope.data)
                .then((result) => {
                    if ($scope.options.reqFrom == 'callList') {
                        console.log("*********call id"+$scope.options.callId);
                        console.log( result.data.data.customerResult._id);
                          remarkFactory.updateRemark({ "id": $scope.options.callId, "customerId": result.data.data.customerResult._id})
                            .then((result) => {
                               // console.log(result);
                              }).catch((err) => {
                              })
                    }

                    $state.go('dashboard.leads');
                   
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        function init() {
            $scope.options.nationalities = dataFactory.getNationality();
            $scope.options.sources = dataFactory.getSources();
            $scope.options.otherids = dataFactory.getOtherIds();
            var result = $stateParams['obj'];
             if (result && result.reqFrom == 'callList') {
                $scope.data["demography.fullName"] = result.customerInfo.name;
                $scope.data["demography.gender"] = result.customerInfo.gender;
                $scope.data["demography.nationality"] = result.customerInfo.nationality;
                $scope.data["contact.mobile"] = result.mobile;
                $scope.options.reqFrom = result.reqFrom;
                   customerFactory.getRemark(result._id)
                    .then((response) => {
                        $scope.options.callId = result._id;
                        $scope.options.noteList.push(response.data.data);

                    }, function (error) {
                        console.log(error);
                    })
            } else if(result && result.reqFrom == 'leadList') {
                $scope.options.reqFrom = result.reqFrom;
                    }
        }

        function activeClick(value) {
            if (value) {
                if (value == 'male' || value == 'female' || value == 'other') {
                    $scope.data.demography.gender = value;
                } else if (value == 'Inbound' || value == 'Outbound') {
                    $scope.data.callType = value;
                } else if (value == 'Open' || value == 'Close') {
                    $scope.data.status = value;
                } else if (value == 'remainder' || value == 'note') {
                    $scope.data.alertType = value;

                }
            }
        }
    }]);