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
    <div class="card col-6 p-0">
        <div class="card-body p-0">
            <ul class="list-group list-group-flush">

                <li class="list-group-item">
                    <div class="row p-0">
                        <div class="col-2 py-0">
                            <p class="card-text">
                                <small>Date:</small>
                            </p>
                        </div>
                        <div class="col-9 p-0">
                            <p class="card-text">
                                <small>{{data.createdAt}}</small>
                            </p>
                        </div>
                    </div>
                </li>

               

                <li class="list-group-item">
                    <div class="row p-0">
                        <div class="col-4 py-0">
                            <p class="card-text">
                                <small>Civil Id No:</small>
                            </p>
                        </div>
                        <div class="col-7 p-0">
                            <p class="card-text">
                                <small>{{data.demography.residenceId}}</small>
                            </p>
                        </div>
                    </div>
                </li>

                <li class="list-group-item">
                    <div class="row p-0">
                        <div class="col-sm-4 py-0">
                            <p class="card-text">
                                <small>Nationality:</small>
                            </p>
                        </div>
                        <div class="col-sm-7 p-0">
                            <p class="card-text">
                                <small>{{data.demography.nationality}}</small>
                            </p>
                        </div>
                    </div>
                </li>

                <li class="list-group-item">
                    <div class="row p-0">
                        <div class="col-sm-4 py-0">
                            <p class="card-text">
                                <small>Address:</small>
                            </p>
                        </div>
                        <div class="col-sm-7 p-0">
                            <p class="card-text">
                                <small>{{data.contact.address}}</small>
                            </p>
                        </div>
                    </div>
                </li>

                <li class="list-group-item">
                    <div class="row p-0">
                        <div class="col-sm-4 py-0">
                            <p class="card-text">
                                <small>Phone No:</small>
                            </p>
                        </div>
                        <div class="col-sm-7 p-0">
                            <p class="card-text">
                                <small>{{data.contact.mobile[0]}}</small>
                            </p>
                        </div>
                    </div>
                </li>
   

            </ul>
        </div>
    </div>
    <div class="card col-6 p-0">
            <div class="card-body p-0">
                <ul class="list-group list-group-flush">
    
                <li class="list-group-item">
                <div class="row p-0">
                    <div class="col-2 py-0">
                        <p class="card-text">
                            <small>Time:</small>
                        </p>
                    </div>
                    <div class="col-9 p-0">
                        <p class="card-text">
                            <small>{{data.createdAt}}</small>
                        </p>
                    </div>
                </div>
            </li>
    
                    <li class="list-group-item">
                        <div class="row p-0">
                            <div class="col-2 py-0">
                                <p class="card-text">
                                    <small>Name:</small>
                                </p>
                            </div>
                            <div class="col-9 p-0">
                                <p class="card-text">
                                    <small>{{data.demography.fullName}}</small>
                                </p>
                            </div>
                        </div>
                    </li>
    
                    <li class="list-group-item">
                        <div class="row p-0">
                            <div class="col-sm-2 py-0">
                                <p class="card-text">
                                    <small>Sex:</small>
                                </p>
                            </div>
                            <div class="col-sm-9 p-0">
                                <p class="card-text">
                                    <small>{{data.demography.gender}}</small>
                                </p>
                            </div>
                        </div>
                    </li>
    
                    <li class="list-group-item">
                        <div class="row p-0">
                            <div class="col-sm-4 py-0">
                                <p class="card-text">
                                    <small>Reference:</small>
                                </p>
                            </div>
                            <div class="col-sm-7 p-0">
                                <p class="card-text">
                                    <small>{{data.source}}</small>
                                </p>
                            </div>
                        </div>
                    </li>
    
                    <li class="list-group-item">
                        <div class="row p-0">
                            <div class="col-sm-4 py-0">
                                <p class="card-text">
                                    <small>Age:</small>
                                </p>
                            </div>
                            <div class="col-sm-7 p-0">
                                <p class="card-text">
                                    <small>{{data.demography.dob}}</small>
                                </p>
                            </div>
                        </div>
                    </li>
    
                </ul>
            </div>
        </div>
</div>
            `,
            controller: function ($scope) {
                console.log($scope.data)
            }
        }
    })