/**
 * Directive for all headers
 */
angular.module('crmApp')
    .directive('consultation', function () {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            template: `
            <div class="card-group row px-5">
    <div class="card col-4 p-0">
        <div class="card-body p-0">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="row p-0">
                        <div class="col-3 py-0">
                            <p class="card-text">
                                <small>Hair Type:</small>
                            </p>
                        </div>
                        <div class="col-9 p-0">
                            <p class="card-text">
                                <small>{{data.hairType}}</small>
                            </p>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row p-0">
                        <div class="col-sm-4 py-0">
                            <p class="card-text">
                                <small>No of Hair:</small>
                            </p>
                        </div>
                        <div class="col-sm-7 p-0">
                            <p class="card-text">
                                <small>{{data.noOfHair}}</small>
                            </p>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row p-0">
                        <div class="col-sm-4 py-0">
                            <p class="card-text">
                                <small>implantArea:</small>
                            </p>
                        </div>
                        <div class="col-sm-7 p-0">
                            <p class="card-text">
                                <small>{{data.implantArea}}</small>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="card col-4 p-0">
        <div class="card-body p-0">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="row p-0">
                        <div class="col-sm-4 py-0">
                            <p class="card-text">
                                <small>Implant Type:</small>
                            </p>
                        </div>
                        <div class="col-sm-7 p-0">
                            <p class="card-text">
                                <small>{{data.implantType}}</small>
                            </p>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row p-0">
                        <div class="col-sm-4 py-0">
                            <p class="card-text">
                                <small>PRP:</small>
                            </p>
                        </div>
                        <div class="col-sm-7 p-0">
                            <p class="card-text">
                                <small>{{data.prp}}</small>
                            </p>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row p-0">
                        <div class="col-sm-4 py-0">
                            <p class="card-text">
                                <small>bloodTest:</small>
                            </p>
                        </div>
                        <div class="col-sm-7 p-0">
                            <p class="card-text">
                                <small>{{data.bloodTest}}</small>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="card col-4 p-0">
        <li class="list-group-item">
            <div class="col-4 p-0">
                <notes list="options.noteList"></notes>
            </div>
        </li>
    </div>
</div>
            `,
            controller: function ($scope) {}
        }
    })