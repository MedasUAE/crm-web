angular
    .module('crmApp')
    .controller('appointmentCtrl', ['$scope','$stateParams' ,'dataFactory', function($scope, $stateParams, dataFactory){
        $scope.data = {}
        $scope.options = {}
        $scope.handlers = {}
        $scope.calendarView = 'month';
        $scope.viewDate = new Date();
        $scope.events = [
            {
                title: 'My event title', // The title of the event
                type: 'info',
                startsAt: new Date(),
                endsAt: new Date(2019, 4, 18, 15),
                editable: false,
                deletable: false,
                incrementsBadgeTotal: true
            }
           ];
        $scope.calendarTitle = "Calendar";
        init();

        function init() {
            console.log("pageload");
        }
    }]); 