/**
 * Directive for all headers
 */
angular.module('crmApp')
    .directive('header', function () {
        return {
            restrict: 'E',
            scope: {
                label: '=',
                buttonLabel: '=',
                icon: '=',
                state: '=',
                stateParam: '='
            },
            template: `
            <h3 class="mb-2 p-3">
                <i class="material-icons icon pl-5 pr-4">{{icon}}</i>
                {{label}}
                <sup>
                    <button type="button" class="btn btn-link py-0" ng-click="new()">
                        <strong>
                            {{buttonLabel}}
                        </strong>
                    </button>
                </sup>
            </h3>
            <hr class="border-mattGray m-0">
            `,
            controller: function ($scope,$state) {
                $scope.new=function(){
                    $state.go($scope.state, {id:"new"});
                }
            }
        }
    })