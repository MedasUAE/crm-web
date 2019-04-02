angular.module('crmApp', [
    'ui.router',
    'ngTagsInput'
])
.config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $stateProvider.state('dashboard',{
            url: '/dashboard',
            templateUrl: './views/dashboard.html',
            onEnter:['$state', function ($state) {
                if(!validateToken()) $state.go('login');
            }]
        })
        .state('login',{
            url: '/login',
            templateUrl: './views/login.html'
        })
        .state('dashboard.registration',{
            url: '/registration',
            templateUrl: './views/registration.html'
        })
        .state('dashboard.consultationlist',{
            url: '/consultationlist',
            templateUrl: './views/consultationlist.html'
        })
        .state('dashboard.consultation',{
            url: '/consultation/:consultId',
            templateUrl: './views/consultation.html'
        })
        .state('otherwise',{
            url: '*path',
            templateUrl: './views/dashboard.html'
        })
    }
])

/* 
*/
function validateToken(){
    let token = localStorage.getItem('token')
    if(!token) return false;
    else return true;
}