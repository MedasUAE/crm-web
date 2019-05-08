angular.module('crmApp', [
    'ui.router',
    'ngTagsInput'
])
    .config([
        '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard', {
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
                    params: { obj: null },
                    templateUrl: './views/customer/object.html',
                })
                .state('dashboard.customers', {
                    url: '/customers',
                    templateUrl: './views/customer/list.html'
                })
                .state('dashboard.lead', {
                    url: '/lead',
                    params: { obj: null },
                    templateUrl: './views/lead/object.html',
                })
                .state('dashboard.leads', {
                    url: '/leads',
                    templateUrl: './views/lead/list.html'
                })
                .state('dashboard.consultations', {
                    url: '/consultations',
                    templateUrl: './views/consultation/list.html'
                })
                .state('dashboard.consultation', {
                    url: '/consultation/:id',
                    params: { obj: null },
                    templateUrl: './views/consultation/object.html'
                })
                .state('dashboard.secondconsultation', {
                    url: '/secondconsultation/:id',
                    templateUrl: './views/consultation/secondObject.html'
                })
                .state('dashboard.appointment', {
                    url: '/appointment',
                    templateUrl: './views/appointment/appointment.html'
                })
                .state('dashboard.user', {
                    url: '/user/:id',
                    templateUrl: './views/users/object.html'
                })
                .state('dashboard.users', {
                    url: '/users',
                    templateUrl: './views/users/list.html'
                })
                .state('dashboard.call', {
                    url: '/call/:id',
                    templateUrl: './views/call/object.html'
                })
                .state('dashboard.calls', {
                    url: '/calls',
                    templateUrl: './views/call/list.html'
                })
                .state('dashboard.payment', {
                    url: '/payment/:id',
                    params: { obj: null },
                    templateUrl: './views/payment/object.html'
                })
                .state('dashboard.payments', {
                    url: '/payments',
                    templateUrl: './views/payment/list.html'
                })
                .state('dashboard.remainder', {
                    url: '/remainder/:id',
                    params: { obj: null },
                    templateUrl: './views/remainder/object.html'
                })
                .state('dashboard.remainders', {
                    url: '/remainders',
                   // params: { obj: null },
                    templateUrl: './views/remainder/list.html'
                })
                .state('dashboard.treatment', {
                    url: '/treatment/:id',
                    params: { obj: null },
                    templateUrl: './views/treatment/object.html'
                })
                .state('dashboard.treatments', {
                    url: '/treatments',
                   // params: { obj: null },
                    templateUrl: './views/treatment/list.html'
                })
                .state('otherwise', {
                    url: '*path',
                    templateUrl: './views/dashboard.html',
                    onEnter: ['$state', function ($state) {
                        if (!validateToken()) $state.go('login');
                    }]
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