angular
    .module('crmApp')
    .controller('remainderListCtrl', ['$scope', 'remainderFactory','dataFactory', '$state','$stateParams', function ($scope, remainderFactory,dataFactory, $state,$stateParams) {
        $scope.data = {}
        $scope.options = {}
        $scope.handlers = {
            filter:filter
        }

        init();

        function init() {
            $scope.options.statuss = dataFactory.getStatuss();
           // $scope.options.customerId = $stateParams["id"];
          //  $scope.options.customer = $stateParams["obj"];
          //  console.log( $scope.options.customer);
           // remainderFactory.getRemainders($scope.options.customerId)
           remainderFactory.getRemainders()
            .then((response)=>{
                $scope.options.remainderList = response.data.data;
            },function(error){
                console.log(error);
            })

      
        }
        function filter(label,value) {
            remainderFactory.filter(label,value)
           .then((response)=>{
               $scope.options.remainderList = response.data.data;
            },function(error){
               console.log(error);
           })
       };

       
    }]);