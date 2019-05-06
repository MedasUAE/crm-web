angular.module('crmApp')
    .factory('loginFactory', function ($http) {
        var baseUrl = "http://localhost:3003/";

        /**
         * method to get user details from Mysql user_setup table 
         */
        function getUserDetails(data) {
            const headers = { 'accept-version': "1.0.0" }
             return $http.post(baseUrl + "login", data, { headers })
        }

        return {
            getUserDetails: getUserDetails

        }
    });