angular
    .module('crmApp')
    .controller('appointmentCtrl', ['$scope', function($scope){
        $scope.data = {}
        $scope.options = {}
        $scope.handlers = {}
        
        init();

        function init() {
            console.log("pageload appointment");
        }
        
        $scope.$on('onMonthClick', function(e,d){
            console.log(d);
        })
    }]); 