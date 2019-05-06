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

        // function getRemainder(id) {
        //    // return $http.get(baseUrl + "remainder?customerId=" + customerId);
        //     return $http.get(baseUrl + "remainder/" + id);
        // }

        function getRemainders(customerId) {
           if(customerId)   return $http.get(baseUrl + "remainders?customerId=" + customerId);
            
        }

          /**
         * method to filter out  Remainders from Remainders API
         */
        function filter(customerId,label,value) {
            if(label == 'status' && customerId)  return $http.get(baseUrl + "remainders?customerId=" + customerId + "&status=" + value);
           
            if(label == 'date' && customerId)  return $http.get(baseUrl + "remainders?customerId=" + customerId + "&date=" + value);
                
         
                  
          }


        return {
            createRemainderFileOpen: createRemainderFileOpen,
            createRemainderPayment: createRemainderPayment,
            updateRemainder: updateRemainder,
            getRemainders:getRemainders,
            filter:filter
          

        }


    });