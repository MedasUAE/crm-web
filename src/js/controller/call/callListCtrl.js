angular
    .module('crmApp')
    .controller('callListCtrl', ['$scope', 'dataFactory', 'callFactory' , '$state','$stateParams', function ($scope, dataFactory, callFactory, $state,$stateParams) {
        $scope.data = {}
        $scope.options = {}
        $scope.data.customerInfo = {};
        $scope.handlers = {
            customerRegistration:customerRegistration
        }

        init();

        function init() {
            callFactory.getCalls()
            .then((response)=>{
                $scope.options.callList = response.data.data;
                  console.log(response.data.data);
            },function(error){
                console.log(error);
            })
        }

        function customerRegistration(data) {
            data["reqFrom"] = "callList";
             $state.go('dashboard.customer', {obj:data})
        }
       
    }]);