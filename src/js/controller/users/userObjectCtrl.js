angular
    .module('crmApp')
    .controller('userObjectCtrl', ['$scope','$state','$stateParams' ,'dataFactory', 'userFactory', function($scope, $state, $stateParams, dataFactory, userFactory){
        $scope.data = {
            //userFactory.getJson()
        }
      
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
           if(!$stateParams["id"] || $stateParams["id"]=="new") return;
           userFactory.getUser($stateParams["id"])
            .then((response)=>{
                $scope.data = response.data.data;
                activeClick($scope.data.activeStatus)
                $scope.data.activeDate = new Date($scope.data.activeDate)
            },function(error){
                console.log(error);
            })
        }
        function activeClick(status){
            $scope.data.activeStatus=status;
        }
        function save(){
            userFactory.create($scope.data)
                .then(()=>{
                    $state.go('dashboard.users')
                    console.log("saved");
                })
                .catch((err)=>{
                    console.log(err);
                })

        }
     var   user =userFactory.getUserDetail();
        
    }]);