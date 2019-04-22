angular.module('crmApp')
    .factory('customerFactory',function ($http) {
        var baseUrl = "http://localhost:3000/";
        
        function getRemark(id) {
            return $http.get(baseUrl+"remark/"+id);
        }

        /**
         * method to save customer into the DB.
         */
        function create(data) {
            console.log(data)
            return $http.post(baseUrl+"customer",data)
        }

       

        return {
           
            getRemark:getRemark,
            create:create
          
        }


    });