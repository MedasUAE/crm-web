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
            template: `
            <div class="card-group row px-5">
                <div class="card col-2">
                    <img style="width: 100%;height: 120px;object-fit: contain;" class="card-img-top pt-2" src="css/images/person.png" alt="Card image cap">
                </div>
                <div class="card col-10 p-0">
                    <div class="card-body p-0">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="row p-0">
                                <div class="col-2 py-0"><p class="card-text"><small>Name:</small></p></div>
                                <div class="col-9 p-0"><p class="card-text"><small>Abdul Rahman Ali Mehamed</small></p></div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="row p-0">
                                <div class="col-sm-2 py-0"><p class="card-text"><small>Nationality:</small></p></div>
                                <div class="col-sm-9 p-0"><p class="card-text"><small>American</small></p></div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="row p-0">
                                <div class="col-sm-2 py-0"><p class="card-text"><small>Coordinator:</small></p></div>
                                <div class="col-sm-9 p-0"><p class="card-text"><small>Talat M</small></p></div>
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            `,
            controller: function () {
            }
        }
    })