angular
    .module('crmApp')
    .controller('customerListCtrl', ['$scope', 'dataFactory','customerFactory', '$state', function ($scope, dataFactory,customerFactory,$state) {
        $scope.data = {}
        $scope.options = {}
        $scope.options.params = {}
        $scope.handlers = {
            add: add,
        filter:filter
        }
        init();

        function init() {
              customerFactory.getCustomers()
            .then((response)=>{
                $scope.options.customerList = response.data.data;
                  console.log(response.data.data);
            },function(error){
                console.log(error);
            })
        }

        function add() {    
            $state.go('dashboard.customer',{obj:data})
        }

       function filter(label,value) {
             customerFactory.filter(label,value)
            .then((response)=>{
                $scope.options.customerList = response.data.data;
                  console.log(response.data.data);
            },function(error){
                console.log(error);
            })
        };
    }]);