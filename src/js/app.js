angular.module('crmApp', [
    'ui.router',
    'ngTagsInput',
    'mwl.calendar',
    'ui.bootstrap'
])
    .config([
        '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('dashboard', {
                url: '/dashboard',
                templateUrl: './views/dashboard.html',
                onEnter: ['$state', function ($state) {
                    if (!validateToken()) $state.go('login');
                }]
            })
                .state('login', {
                    url: '/login',
                    templateUrl: './views/login.html'
                })
                .state('dashboard.customer', {
                    url: '/customer',
                    templateUrl: './views/customer/object.html'
                })
                .state('dashboard.customers', {
                    url: '/customers',
                    templateUrl: './views/customer/list.html'
                })
                .state('dashboard.consultations', {
                    url: '/consultations',
                    templateUrl: './views/consultation/list.html'
                })
                .state('dashboard.consultation', {
                    url: '/consultation/:consultId',
                    templateUrl: './views/consultation/object.html'
                })
                .state('dashboard.appointment', {
                    url: '/appointment',
                    templateUrl: './views/appointment/appointment.html'
                })
                .state('otherwise', {
                    url: '*path',
                    templateUrl: './views/dashboard.html'
                })
        }
    ])

/* 
*/
function validateToken() {
    let token = localStorage.getItem('token')
    if (!token) return false;
    else return true;
}