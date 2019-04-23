angular.module('crmApp')
    .factory('customerFactory',function ($http) {
        var baseUrl = "http://localhost:3000/";
        
        function getRemark(id) {
            return $http.get(baseUrl+"remark/"+id);
        }

        /**
         * method to get all customers from customer API
         */
        function getCustomers() {
            return $http.get(baseUrl+"customers");
        }

        /**
         * method to filter out  customers from customer API
         */
       
        //function filter(label,value) {
            function filter(label,value) {
          // return $http.get(baseUrl+"customers",{params: {fullName:value} });
          var params = {}
          if(label == 'fullName')   params["fullName"] = value;
          if(label == 'residenceId')   params["residenceId"] = value;
          if(label == 'mobile')   params["mobile"] = value;
         
          console.log(params);

            return $http.get(baseUrl+"customers",{params});
          // return $http.get(baseUrl+"customers",{params: {mobile:value} });
           
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
            create:create,
            getCustomers:getCustomers,
            filter:filter
          
        }


    });