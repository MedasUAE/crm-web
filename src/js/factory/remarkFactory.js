angular.module('crmApp')
    .factory('remarkFactory', function ($http) {
        var baseUrl = "http://localhost:3000/";

        /**
         * method to save remark into the DB.
         */
        function createRemark(data) {
            return $http.post(baseUrl + "remark", data)
        }

        /**
         * method to update remark into the DB.
         */
        function updateRemark(data) {
            return $http.put(baseUrl + "remark/" + data.id, data)
        }

        function getRemarks(id) {
            return $http.get(baseUrl + "remarks/" + id);
        }

        function getAllRemarks(customerId) {
            return $http.get(baseUrl + "remarks?customerId=" + customerId);
        }


        return {
            createRemark: createRemark,
            updateRemark: updateRemark,
            getRemarks:getRemarks,
            getAllRemarks:getAllRemarks

        }


    });