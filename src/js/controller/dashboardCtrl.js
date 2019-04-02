angular
    .module('crmApp')
    .controller('dashboardCtrl', ['$scope','$state', function($scope, $state){
        $scope.message = "Dashboard";
        function adjustSideBar(){
            jQuery(".sidebar").slimScroll({
                height: document.documentElement.clientHeight - jQuery(".navbar").outerHeight()
            })
        }

        // adjustSideBar();

        $scope.registration = function(){
            console.log("registration");
            $state.go('dashboard.registration')
        }

        $scope.calllist = function(){
            // $('#exampleModal').modal('show')
            $state.go('dashboard.consultationlist')
        }

        $scope.toggle = function(){
            ($scope.menuActive) ? $scope.menuActive = false : $scope.menuActive = true;
        }
    }]);