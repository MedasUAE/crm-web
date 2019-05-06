angular.module('crmApp')
    .factory('callFactory', function ($http) {
        var baseUrl = "http://localhost:3003/";

        function setHeaders(){
            const headers = { 'accept-version': "1.0.0",
            'Authorization': localStorage.getItem('token') }
            return headers;
          }
      
        /**
         * method to get all calls from call API
         */
        function getCalls() {
            return $http.get(baseUrl+"calls",{headers:setHeaders()});
        }

    
         /**
         * method to save call into the DB.
         */
        function create(data) {
            let user = JSON.parse(localStorage.getItem("userData"));
               data.createdBy = {id:user.user_id,name: user.user_label};
             return $http.post(baseUrl+"call",data,{headers:setHeaders()})
        }

        /**
         * method to save remark into the DB.
         */
        function createRemark(data) {
              return $http.post(baseUrl+"remark",data,{headers:setHeaders()})
        }
        
        /**
         * getCall to get one call  by Id from call API
         */
        function getCall(id) {
            return $http.get(baseUrl+"call/"+id,{headers:setHeaders()});
        }

       

        return {
            getCalls: getCalls,
            create:create,
            getCall:getCall,
            createRemark:createRemark
          
        }


    });