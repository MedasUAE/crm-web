angular.module('crmApp')
    .factory('remainderFactory', function ($http) {
        var baseUrl = "http://localhost:3000/";

        /**
         * method to save remainder into the DB.
         */
        function createRemainderFileOpen(remainderData) {
            return $http.post(baseUrl + "remainderfileopen", remainderData)
        }

        
        /**
         * method to save remainder into the DB.
         */
        function createRemainderPayment(remainderData) {
            return $http.post(baseUrl + "remainderpayment", remainderData)
        }
        /**
         * method to update remainder into the DB.
         */
        function updateRemainder(data) {
            return $http.put(baseUrl + "remainder/" + data.id, data)
        }

        function getRemainder(id) {
            return $http.get(baseUrl + "remainder/" + id);
        }

        function getAllRemainder(customerId) {
            return $http.get(baseUrl + "remainder?customerId=" + customerId);
        }

        return {
            createRemainderFileOpen: createRemainderFileOpen,
            createRemainderPayment: createRemainderPayment,
            updateRemainder: updateRemainder,
            getRemainder:getRemainder,
            getAllRemainder:getAllRemainder
          

        }


    });