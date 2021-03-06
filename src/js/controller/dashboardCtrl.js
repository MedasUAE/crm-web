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

        $scope.customer = function(){
            $state.go('dashboard.customers')
        }

        $scope.user = function(){
            $state.go('dashboard.users', {userId:123})
        }
        
        $scope.call = function(){
            $state.go('dashboard.calls', {userId:123})
        }


        $scope.calllist = function(){
            // $('#exampleModal').modal('show')
            $state.go('dashboard.consultations')
        }

        $scope.toggle = function(){
            ($scope.menuActive) ? $scope.menuActive = false : $scope.menuActive = true;
        }
    }]);