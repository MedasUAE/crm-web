/**
 * Directive for all headers
 */
angular.module('crmApp')
    .directive('notes', function () {
        return {
            restrict: 'E',
            scope: {
                list: '='
            },
            template: `
            <div class="card text-sm mb-3">
                <div class="card-header text-white bg-warning">
                    Notes
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" ng-repeat="note in list">
                        <p class="card-text mb-0"><small>{{note.remark}}</small></p>
                        <p class="card-text font-italic"><small class="text-muted">- by login User  on {{note.createDate}}</small></p>
                    </li>
                </ul>
            </div>
            `,
            controller: function ($scope) {
                //console.log($scope.list);
                // list is comming from init of objctrl  not  here
             }
        }
    })