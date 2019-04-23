angular.module('crmApp')
    .factory('remarkFactory', function ($http) {
        var baseUrl = "http://localhost:3000/";
       
        /**
         * method to save remark into the DB.
         */
        function createRemark(data) {
              return $http.post(baseUrl+"remark",data)
        }

        /**
         * method to update remark into the DB.
         */
        function updateRemark(data) {
            return $http.put(baseUrl+"remark/"+data.id,data)
      }

      
        return {
            createRemark:createRemark,
            updateRemark:updateRemark
          
        }


    });