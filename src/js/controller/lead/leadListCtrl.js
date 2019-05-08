angular
    .module('crmApp')
    .controller('leadListCtrl', ['$scope','customerFactory', '$state', function ($scope,customerFactory,$state) {
        $scope.data = {}
        $scope.options = {}
        $scope.handlers = {
            add: add,
        filter:filter,
        startConsultation:startConsultation
        }
        init();

        function init() {
              customerFactory.getCustomers(false)
            .then((response)=>{
                $scope.options.leadList = response.data.data;
                 },function(error){
                console.log(error);
            })
        }

        function add() {    
            $state.go('dashboard.lead')
        }

       
        function startConsultation(data) { 
             $state.go('dashboard.consultation',{id: data._id,obj:data})
           
        }

       

       function filter(label,value) {
             customerFactory.filter(label,value)
            .then((response)=>{
                $scope.options.leadList = response.data.data;
             },function(error){
                console.log(error);
            })
        };
    }]);