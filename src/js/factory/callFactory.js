angular.module('crmApp')
    .factory('callFactory', function ($http) {
        var baseUrl = "http://localhost:3000/";
        var call ={};
        /**
         * method to get all calls from call API
         */
        function getCalls() {
            return $http.get(baseUrl+"calls");
        }

    
         /**
         * method to save call into the DB.
         */
        function create(data) {
            console.log(data)
            return $http.post(baseUrl+"call",data)
        }
        /**
         * getCall to get one call  by Id from call API
         */
        function getCall(id) {
            return $http.get(baseUrl+"call/"+id);
        }

       

        return {
            getCalls: getCalls,
            create:create,
            getCall:getCall
          
        }


    });