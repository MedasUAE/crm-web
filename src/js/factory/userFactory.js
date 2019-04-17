angular.module('crmApp')
    .factory('userFactory', function ($http) {
        var baseUrl = "http://localhost:3000/";
        var user ={};
        /**
         * method to get all user from user API
         */
        function getUsers() {
            return $http.get(baseUrl+"users");
        }

    
         /**
         * method to save user into the DB.
         */
        function create(data) {
            return $http.post(baseUrl+"user",data)
        }
        /**
         * getUser to get one user  by Id from user API
         */
        function getUser(id) {
            return $http.get(baseUrl+"user/"+id);
        }

        function setUserDetail(data){
            user = data;
        }
        
        function getUserDetail(){
           return user;
        }
    

        return {
            getUsers: getUsers,
            create:create,
            getUser:getUser,
            setUserDetail:setUserDetail,
            getUserDetail:getUserDetail
        }


    });