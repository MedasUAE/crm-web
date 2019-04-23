/**
 * Directive for all headers
 */
angular.module('crmApp')
    .directive('angularCalendar', function () {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            template: `
            <div class="row pb-2">
                <div class="col-8 col-sm-7 col-md-8 pl-4">
                    <h4><strong>{{options.currentMonth}}</strong> {{options.currentYear}}</h4>
                </div>
                <div class="col-2 col-md-2 col-sm-2">
                    <div class="btn-group btn-group-sm btn-block" role="group">
                        <button type="button" class="btn btn-outline-secondary p-0" ng-click="prev()"> <i class="material-icons icon">keyboard_arrow_left</i> </button>
                        <button type="button" class="btn btn-outline-secondary" ng-click="today()">Today</button>
                        <button type="button" class="btn btn-outline-secondary p-0" ng-click="next()"> <i class="material-icons icon">keyboard_arrow_right</i>  </button>
                    </div>
                </div>
                <div class="col-2 col-md-2 col-sm-2">
                    <div class="btn-group btn-group-sm btn-block" role="group">
                        <button type="button" class="btn btn-outline-secondary" ng-click="calendarBtnClick('month')" ng-class="{active: options.calendarView == 'month'}">Month</button>
                        <button type="button" class="btn btn-outline-secondary" ng-click="calendarBtnClick('week')" ng-class="{active: options.calendarView == 'week'}">Week</button>
                        <button type="button" class="btn btn-outline-secondary" ng-click="calendarBtnClick('day')" ng-class="{active: options.calendarView == 'day'}">Day</button>
                    </div>
                </div>
            </div>

            <!-- month -->
            <div class="month-container border-mattGray-top border-mattGray-right" ng-show="options.calendarView == 'month'">
                <div class="calendar-header border-mattGray-bottom border-mattGray-right align-text-bottom" ng-repeat="day in options.arrWeekDays">
                    <p class="text-right pr-1 align-text-bottom">{{day}}</p>
                </div>
                <div class="calendar-item border-mattGray-left border-mattGray-bottom" ng-repeat="mDay in options.monthDays track by $index">
                    <p class="text-right pr-1">{{mDay}}</p>
                </div>
            </div>

            <!--week-->
            <div ng-show="options.calendarView == 'week'">
                <div class="week-container border-lightGray-top border-lightGray-right">
                    <div class="calendar-header border-lightGray-bottom border-lightGray-left"><p class="text-right pr-1 align-text-bottom"></p></div>
                    <div class="calendar-header border-lightGray-bottom border-lightGray-right align-text-bottom" ng-repeat="day in options.arrWeekDates">
                        <p class="text-center pr-1 align-text-bottom">{{day}}</p>
                    </div>
                    <div ng-click="timeClick(time)" class="calendar-item border-lightGray-left border-lightGray-bottom" ng-repeat="time in options.times track by $index">
                        <p class="text-right pr-1" ng-if="!time.hide">{{time}}</p>
                    </div>
                </div>
            </div>

            <!-- day -->
            <div class="row">
                <div class="col-6">
                    <div ng-show="options.calendarView == 'day'" class="day-container border-lightGray-top border-lightGray-right">
                        <div class="calendar-header border-lightGray-bottom border-lightGray-left"><p class="text-right pr-1 align-text-bottom"></p></div>
                        <div class="calendar-header border-lightGray-bottom border-lightGray-right align-text-bottom">
                            <p class="text-center pr-1 align-text-bottom">21-Apr-19</p>
                        </div>
                        <div ng-click="timeClick(time)" class="calendar-item border-lightGray-left border-lightGray-bottom" ng-repeat="time in options.times track by $index">
                            <p class="text-right pr-1" ng-if="!time.hide">{{time}}</p>
                        </div>
                    </div>
                </div>
                <div class="col-6"></div>
            </div>
            `,

            controller: function ($scope) {
                $scope.options = {}
                init();
                function init(params) {

                    checkCalendarView('month');
                    $scope.options.currentMonth = moment().format("MMMM");
                    $scope.options.currentYear = moment().format("YYYY");
                    $scope.options.addIndex = 0;
                }

                function weekInit() {
                    $scope.options.arrWeekDates = weekDates();
                    $scope.options.calendarView = 'week';
                    $scope.options.times = timeOneDay();
                }

                function monthInit() {
                    $scope.options.monthDays = getDaysArrayByMonth();
                    $scope.options.arrWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurstday", "Friday", "Saturday"];
                    $scope.options.calendarView = 'month';
                }

                function dayInit() {
                    $scope.options.arrWeekDates = weekDates();
                    $scope.options.times = timeCurrentDay();
                    $scope.options.calendarView = 'day';
                }

                function checkCalendarView(type) {
                    switch (type) {
                        case "week":
                            weekInit();
                            break;
                        case "month":
                            monthInit();
                            break;
                        case "day":
                            dayInit();
                            break;
                        default:
                            weekInit();
                            break;
                    }
                }

                $scope.calendarBtnClick = function (type) {
                    checkCalendarView(type);
                }

                $scope.timeClick = function (time) {
                    if (!time.hide) return;
                    alert(time);
                }

                /**
                 * Next
                 */
                $scope.next = function(){
                    if ($scope.options.calendarView == 'month') {
                        $scope.options.addIndex++;
                        $scope.options.currentMonth = moment().add($scope.options.addIndex,"M").format("MMMM");
                        $scope.options.currentYear = moment().add($scope.options.addIndex,"M").format("YYYY");
                        $scope.options.monthDays = getDaysArrayByMonth(moment().add($scope.options.addIndex,"M"))
                    }
                }

                /**
                 * Prev
                 */
                $scope.prev = function(){
                    if ($scope.options.calendarView == 'month') {
                        $scope.options.addIndex--;
                        $scope.options.currentMonth = moment().add($scope.options.addIndex,"M").format("MMMM");
                        $scope.options.currentYear = moment().add($scope.options.addIndex,"M").format("YYYY");
                    }
                }

                /**
                 * Today
                 */
                $scope.today = function(){

                }

                /**
                 * get weekDates array
                 */
                function weekDates() {
                    const startOfWeek = moment().startOf('isoWeek');
                    const endOfWeek = moment().endOf('isoWeek');

                    let days = [];
                    let day = startOfWeek;

                    while (day <= endOfWeek) {
                        days.push(day.format("ddd DD"));
                        day = day.clone().add(1, 'd');
                    }
                    return days
                }

                /**
                 * Get Time Array for Current Date
                 */

                function timeCurrentDay() {
                    const hoursPerDay = 24;
                    let time = [];
                    let formattedTime;
                    for (i = 0; i < hoursPerDay + 1; i++) { //fill in all of the hours
                        formattedTime = (moment().subtract(i, "hours")).format("hA");  //give the time in format X AM/PM
                        fillTimes(); // fill blank time
                        time.push(formattedTime);  //add to beginning of array
                    } //do this for all 24 hours
                    
                    return time.reverse();

                    function fillTimes() {
                        let index = 1
                        while (index) {
                            time.push({
                                date: $scope.options.arrWeekDates[index - 1],
                                time: formattedTime,
                                hide: true
                            });
                            index--
                        }
                    }
                }

                /**
                 * get Time Array of Day
                 */

                function timeOneDay() {
                    const hoursPerDay = 24;
                    let time = [];
                    let formattedTime;
                    for (i = 0; i < hoursPerDay + 1; i++) { //fill in all of the hours
                        formattedTime = (moment().subtract(i, "hours")).format("hA");  //give the time in format X AM/PM
                        fillTimes(); // fill blank time
                        time.push(formattedTime);  //add to beginning of array
                    } //do this for all 24 hours
                    
                    return time.reverse();

                    function fillTimes() {
                        let index = 7
                        while (index) {
                            time.push({
                                date: $scope.options.arrWeekDates[index - 1],
                                time: formattedTime,
                                hide: true
                            });
                            index--
                        }
                    }
                }

                /**
                 * method to get month array
                 */
                function getDaysArrayByMonth(_date) {

                    var daysInMonth = moment(_date).daysInMonth();
                    var arrDays = [];
                    monthDays();
                    removeDays(moment(_date).startOf('month').format("d"), moment(_date).startOf('month'));
                    addDays(moment(_date).endOf('month').format("d"), moment(_date).endOf('month'));

                    function addDays(noOfDays, startDate) {
                        let index = 1;

                        while ((7 - noOfDays) != index) {
                            arrDays.push(moment(_date).endOf('month').add("day", index).format("D"));
                            index++;
                        }
                    }

                    function removeDays(noOfDays, startDate) {
                        noOfDays = noOfDays * -1;
                        while (noOfDays) {
                            arrDays.push(startDate.add("day", noOfDays).format("D"));
                            noOfDays++;
                        }
                    }

                    function monthDays() {
                        let index = 0;
                        while (daysInMonth != index) {
                            const current = moment(_date).date(index);
                            arrDays.push(current.format("D"));
                            index++;
                        }
                    }
                    return arrDays;
                }
            }
        }
    })