angular
    .module('crmApp')
    .controller('userListCtrl', ['$scope', 'dataFactory', 'userFactory' , '$state', function ($scope, dataFactory, userFactory, $state) {
        $scope.data = {}
        $scope.options = {}
        $scope.handlers = {
           edit:edit
        }

        init();

        function init() {
          userFactory.getUsers()
            .then((response)=>{
                $scope.options.userlist = response.data.data;
            },function(error){
                console.log(error);
            })
        }

        function edit(id) {
            $state.go('dashboard.user', {id: id})
        }
       
    }]);