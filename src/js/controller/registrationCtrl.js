angular
    .module('crmApp')
    .controller('registrationCtrl', ['$scope','$state','dataFactory', function($scope, $state, dataFactory){
        $scope.data = {}
        $scope.options = {}
        $scope.handlers = {
            save:save,
            back:back,
            dateChange: dateChange,
            genderClick:genderClick,
            loadTags: loadTags,
            onTagAdding: onTagAdding
        }

        init();

        function save(){
            // check the validity
            if(!dataFactory.validatePage('registration', $scope.data))  return;
            //back page
            back();
        }

        function dateChange(eleID){
            dataFactory.dateFormat(eleID)
            $scope.data.age = dataFactory.ageCal($scope.data.dob);
        }

        function genderClick(option){
            $scope.data.gender = option;
        }

        function onTagAdding(tag){
           return dataFactory.checkTagToAdd(tag);
        }

        function back(){
            $state.go('dashboard')
        }

        function loadTags(query) {
            return $scope.options.sources = dataFactory.getSources(query);

       }

        function init() {
            $scope.options.nationalities = dataFactory.getNationality();
            $scope.options.sources = dataFactory.getSources();
            $scope.options.otherids = dataFactory.getOtherIds();
        }
    }]);