angular.module('crmApp')
    .factory('remainderFactory', function ($http) {
        var baseUrl = "http://localhost:3003/";

        function setHeaders(){
            const headers = { 'accept-version': "1.0.0",
            'Authorization': localStorage.getItem('token') }
            return headers;
          }
      

        /**
         * method to save remainder into the DB.
         */
        function createRemainderFileOpen(remainderData) {
            return $http.post(baseUrl + "remainderfileopen", remainderData, {headers:setHeaders()})
        }

        
        /**
         * method to save remainder into the DB.
         */
        function createRemainderPayment(remainderData) {
            return $http.post(baseUrl + "remainderpayment", remainderData,{headers:setHeaders()})
        }
        /**
         * method to update remainder into the DB.
         */
        function updateRemainder(data) {
            return $http.put(baseUrl + "remainder/" + data.id, data,{headers:setHeaders()})
        }

        // function getRemainder(id) {
        //    // return $http.get(baseUrl + "remainder?customerId=" + customerId);
        //     return $http.get(baseUrl + "remainder/" + id);
        // }

        function getRemainders(customerId) {
           if(customerId)   return $http.get(baseUrl + "remainders?customerId=" + customerId,{headers:setHeaders()});
            
        }

          /**
         * method to filter out  Remainders from Remainders API
         */
        function filter(customerId,label,value) {
            if(label == 'status' && customerId)  return $http.get(baseUrl + "remainders?customerId=" + customerId + "&status=" + value, {headers:setHeaders()});
           
            if(label == 'date' && customerId)  return $http.get(baseUrl + "remainders?customerId=" + customerId + "&date=" + value ,{headers:setHeaders()});
                      
          }


        return {
            createRemainderFileOpen: createRemainderFileOpen,
            createRemainderPayment: createRemainderPayment,
            updateRemainder: updateRemainder,
            getRemainders:getRemainders,
            filter:filter
          

        }


    });