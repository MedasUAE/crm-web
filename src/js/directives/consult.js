/**
 * Directive for all headers
 */
angular.module('crmApp')
    .directive('consult', function () {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                list: '='
            },
            templateUrl: "./views/consultation/consultDirective.html",
            controller: function ($scope) {
               // console.log($scope.data);
            }
        }
    })