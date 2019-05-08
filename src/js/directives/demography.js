/**
 * Directive for all headers
 */
angular.module('crmApp')
    .directive('demography', function () {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            templateUrl:"./views/customer/demography.html",
            controller: function ($scope) { }
        }
    })