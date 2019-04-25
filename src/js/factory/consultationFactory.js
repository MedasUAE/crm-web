angular.module('crmApp')
    .factory('consultationFactory',function ($http) {
        var baseUrl = "http://localhost:3000/";
        
        function getRemarks(id) {
            return $http.get(baseUrl+"remarks?documentId="+id);
        }

        /**
         * method to get all consultation from consultation API
         */
        function getConsultations() {
            return $http.get(baseUrl+"consultations");
        }

        /**
         * method to get  consultation by customer Id from consultation API
         */
        function getConsultation(id) {
            return $http.get(baseUrl+"consultationbycustomerid/"+id);
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
         

            return $http.get(baseUrl+"customers",{params});
          // return $http.get(baseUrl+"customers",{params: {mobile:value} });
           
        }

        
        /**
         * method to update consultation into the DB.
         */
        function create(data) {
          
            return $http.post(baseUrl+"consultation",data)
        }

        /**
         * method to update consultation into the DB.
         */
        function update(data) {
            console.log(data.customerId)
              return $http.put(baseUrl+"consultation/"+data.customerId,data)
          }
        

        return {
           
            getRemarks:getRemarks,
            create:create,
            getConsultations:getConsultations,
            filter:filter,
            getConsultation:getConsultation,
            update:update
          
        }


    });