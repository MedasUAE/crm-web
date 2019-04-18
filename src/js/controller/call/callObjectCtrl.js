angular
    .module('crmApp')
    .controller('callObjectCtrl', ['$scope','$state','$stateParams' ,'dataFactory', 'callFactory', function($scope, $state, $stateParams, dataFactory, callFactory){
        $scope.data = { }
        $scope.data.customerInfo = {};
        $scope.options = {};
        $scope.handlers = {
            activeClick:activeClick, 
            save:save 
        }
        $scope

        init();

        function init(){
           $scope.options.userTypes = dataFactory.getUserType();
           $scope.options.offices = dataFactory.getOffices();
           $scope.options.sources = dataFactory.getSources();
           $scope.options.callTypes = dataFactory.getCallTypes();
           $scope.options.statuss = dataFactory.getStatuss();
           $scope.options.alertTypes = dataFactory.getAlertTypes();
           $scope.options.nationalities = dataFactory.getNationality();
           

           if(!$stateParams["id"] || $stateParams["id"]=="new") return;
           callFactory.getCall($stateParams["id"])
            .then((response)=>{
               // activeClick($scope.data.customerInfo.gender)
                $scope.data = response.data.data;
                //activeClick($scope.data.customerInfo.gender)
              //  $scope.data.activeDate = new Date($scope.data.activeDate)
            },function(error){
                console.log(error);
            })
        }
        function activeClick(gender){
            console.log(gender)
            $scope.data.customerInfo.gender=gender;
        }
        function save(){
            callFactory.create($scope.data)
                .then(()=>{
                    $state.go('dashboard.calls')
                    console.log("saved");
                })
                .catch((err)=>{
                    console.log(err);
                })

        }
     }]);