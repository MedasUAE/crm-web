angular
    .module('crmApp')
    .controller('consultationObjCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', 'customerFactory', 'remarkFactory', function ($scope, $state, $stateParams, dataFactory, customerFactory, remarkFactory) {
        $scope.data = {}
        $scope.data.demography = {}
        $scope.data.contact = {}
         $scope.remarkData = {}
        $scope.remarkData.customerId = {}
        $scope.options = {}
        $scope.options.callId = {}
        $scope.options.noteList = [];
        $scope.handlers = {
            save: save,
            activeClick: activeClick,
            back: back,
            dateChange: dateChange,
            genderClick: genderClick,
            loadTags: loadTags,
            onTagAdding: onTagAdding
        }

        init();

        function dateChange(eleID) {
            dataFactory.dateFormat(eleID)
            $scope.data.age = dataFactory.ageCal($scope.data.dob);
        }

        function genderClick(option) {
            $scope.data.gender = option;
        }

        function onTagAdding(tag) {
            return dataFactory.checkTagToAdd(tag);
        }

        function back() {
            $state.go('dashboard.customers')
        }

        function loadTags(query) {
            return $scope.options.sources = dataFactory.getSources(query);
        }

        function save() {
            console.log("data mmmm:"+$scope.data)
            customerFactory.create($scope.data)
                .then((result) => {
                    $scope.remarkData.documentId = result.data.data._id;
                    console.log(result)
                    $scope.remarkData.remark = $scope.data.remark;
                    $scope.remarkData.collectionName = "customer";
                    $scope.remarkData.createdBy = "101";
                    $scope.remarkData.customerId = result.data.data._id;

                    remarkFactory.createRemark($scope.remarkData)
                        .then((result) => {
                            console.log("saved Remark:" + result)
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    if ($scope.options.reqFrom == 'callList') {
                        console.log($scope.options.reqFrom)
                        remarkFactory.updateRemark({ "id": $scope.options.callId, "customerId": $scope.remarkData.customerId })
                            .then((result) => {
                                console.log("update Remark:" + result)
                            }).catch((err) => {
                                console.log(err);
                            })
                    }

                    console.log(result)
                    $state.go('dashboard.customers');
                    console.log("saved");
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
            console.log(result)
            if (result && result.reqFrom == 'callList') {
                $scope.data.demography.fullName = result.customerInfo.name;
                $scope.data.demography.gender = result.customerInfo.gender;
                $scope.data.demography.nationality = result.customerInfo.nationality;
                $scope.data.contact.mobile = result.mobile;
                $scope.options.reqFrom = result.reqFrom;
                
                console.log( $scope.options.reqFrom);
                  customerFactory.getRemark(result._id)
                    .then((response) => {
                        $scope.options.callId = result._id;
                        $scope.options.noteList.push(response.data.data);

                    }, function (error) {
                        console.log(error);
                    })
            } else if(result && result.reqFrom == 'customerList') {
                $scope.options.reqFrom = result.reqFrom;
                console.log("*****************************:"+$scope.options.reqFrom);
                console.log( $scope.options.reqFrom);
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