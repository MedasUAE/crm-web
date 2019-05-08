angular.module('crmApp')
    .factory('customerFactory',function ($http) {
        var baseUrl = "http://localhost:3003/";
        
        function setHeaders(){
            const headers = { 'accept-version': "1.0.0",
            'Authorization': localStorage.getItem('token') }
            return headers;
           // return  {'Authorization': localStorage.getItem('token')}
        }
        

        function getRemark(id) {
            return $http.get(baseUrl+"remark/"+id,{headers:setHeaders()});
        }

        /**
         * method to get all customers from customer API
         */
        function getCustomers(openFile) {
            return $http.get(baseUrl+"customers?openFile=" + openFile, {headers:setHeaders()});
        }

        /**
         * method to get one customer by customer Id from customer API
         */
        function getCustomer(id) {
            return $http.get(baseUrl+"customer/"+id,{headers:setHeaders()});
        }
        /**
         * method to filter out  customers from customer API
         */
            function filter(label,value) {
               
          // return $http.get(baseUrl+"customers",{params: {fullName:value} });
          var params = {}
          if(label == 'fullName')   params["fullName"] = value;
          if(label == 'residenceId')   params["residenceId"] = value;
          if(label == 'mobile')   params["mobile"] = value;
            return $http.get(baseUrl+"customers",{params},{headers:setHeaders()});
              
        }

        /**
         * method to save customer into the DB.
         */
        function create(data) {
            let user = JSON.parse(localStorage.getItem("userData"));
            data.createdBy = {id:user.user_id,name: user.user_label};
            data.coordinator = {id:user.user_id,name: user.user_label};
                 return $http.post(baseUrl+"customer",data,{headers:setHeaders()})
        }


        return {
           
            getRemark:getRemark,
            create:create,
            getCustomers:getCustomers,
            filter:filter,
            getCustomer:getCustomer
          
        }


    });