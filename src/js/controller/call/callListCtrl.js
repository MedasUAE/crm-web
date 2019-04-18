angular
    .module('crmApp')
    .controller('callListCtrl', ['$scope', 'dataFactory', 'callFactory' , '$state', function ($scope, dataFactory, callFactory, $state) {
        $scope.data = {}
        $scope.options = {}
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

        function customerRegistration(id) {
            var customerInfo = $scope.data.customerInfo;
            console.log(customerInfo);
            $state.go('dashboard.customer', {id: id,customerInfo:customerInfo})
        }
       
    }]);