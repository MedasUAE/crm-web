angular.module('crmApp')
    .factory('remarkFactory', function ($http) {
        var baseUrl = "http://localhost:3003/";

        function setHeaders(){
            const headers = { 'accept-version': "1.0.0",
            'Authorization': localStorage.getItem('token') }
            return headers;
          }
      

        /**
         * method to save remark into the DB.
         */
        function createRemark(data) {
            let user = JSON.parse(localStorage.getItem("userData"));
            data.createdBy = {id:user.user_id,name: user.user_label};
            return $http.post(baseUrl + "remark", data,{headers:setHeaders()})
        }

        /**
         * method to update remark into the DB.
         */
        function updateRemark(data) {
            return $http.put(baseUrl + "remark/" + data.id, data,{headers:setHeaders()})
        }

        function getRemarks(id) {
            return $http.get(baseUrl + "remarks/" + id,{headers:setHeaders()});
        }

        function getAllRemarks(customerId) {
            return $http.get(baseUrl + "remarks?customerId=" + customerId,{headers:setHeaders()});
        }


        return {
            createRemark: createRemark,
            updateRemark: updateRemark,
            getRemarks:getRemarks,
            getAllRemarks:getAllRemarks

        }


    });