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
                <div 
                    class="calendar-header border-mattGray-bottom border-mattGray-right align-text-bottom" 
                    ng-repeat="day in options.arrWeekDays">
                    <p class="text-right pr-1 align-text-bottom">{{day}}</p>
                </div>
                <div 
                    class="calendar-item border-mattGray-left border-mattGray-bottom"
                    ng-class="{ 'calendar-item-active': mDay.todayflag }"
                    ng-click="monthDateClick(mDay)"
                    ng-repeat="mDay in options.monthDays track by $index">
                    <p class="text-right pr-1">{{mDay.day}}</p>
                </div>
            </div>

            <!--week-->
            <div ng-show="options.calendarView == 'week'">
                <div class="week-container border-lightGray-top border-lightGray-right">
                    <div 
                        class="calendar-header border-lightGray-bottom border-lightGray-left">
                        <p class="text-right pr-1 align-text-bottom"></p>
                    </div>
                    <div 
                        class="calendar-header border-lightGray-bottom border-lightGray-right align-text-bottom" 
                        ng-repeat="day in options.arrWeekDates">
                        <p class="text-center pr-1 align-text-bottom">{{day.day}}</p>
                    </div>
                    <div 
                        ng-click="timeClick(time)" 
                        class="calendar-item border-lightGray-left border-lightGray-bottom" 
                        ng-repeat="time in options.times track by $index">
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
                            <p class="text-center pr-1 align-text-bottom">{{options.currentDate}}</p>
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
                $scope.options = {};
                let dateObject = moment().toObject(), monthIndex = 0, weekIndex = 0, yearIndex = 0, dayIndex = 0, addIndex = 0;

                init();
                function init(params) {
                    checkCalendarView('month');
                }

                function setMonthYear(date) {
                    $scope.options.currentMonth = moment(date).format("MMMM");
                    $scope.options.currentYear = moment(date).format("YYYY");
                }

                function weekInit() {
                    if (!monthIndex) {
                        $scope.options.arrWeekDates = weekDates(moment().add(weekIndex, "days"));
                        setMonthYear(moment().add(weekIndex, "days"));
                    }
                    else {
                        $scope.options.arrWeekDates = weekDates(moment().add(monthIndex, "M").startOf('month'));
                        setMonthYear(moment().add(monthIndex, "M").startOf('month'));
                    }
                    $scope.options.calendarView = 'week';
                    $scope.options.times = timeOneDayOfWeek();

                }

                function monthInit() {
                    $scope.options.monthDays = getDaysArrayByMonth(moment().add(addIndex, "M"))
                    $scope.options.arrWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurstday", "Friday", "Saturday"];
                    $scope.options.calendarView = 'month';

                    dateObject = moment().add(addIndex, "M").toObject();
                    setMonthYear(moment().add(addIndex, "M"));
                    if (monthIndex && $scope.options.calendarView == 'month')
                        dateObject.week = parseInt(moment().add(addIndex, "M").startOf('month').format("W"));
                    else
                        dateObject.week = parseInt(moment().add(addIndex, "M").format("W"));

                }

                function dayInit() {

                    $scope.options.currentDate = moment().add(dayIndex, "days").format("ddd DD");
                    $scope.options.currentMomentDate = moment().add(dayIndex, "days");
                    $scope.options.times = timeCurrentDay();
                    $scope.options.calendarView = 'day';
                    setMonthYear();
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
                    alert(JSON.stringify(time));
                }

                $scope.monthDateClick = function (date) {
                    $scope.$emit('onMonthClick', {dateObj:date})
                }

                /**
                 * Next
                 */
                $scope.next = function () {
                    addIndex++;
                    if ($scope.options.calendarView == 'month') {
                        monthIndex++;
                        monthInit();
                    }
                    else if ($scope.options.calendarView == 'week') {
                        weekIndex += 7;
                        weekInit();
                    }
                    else {
                        dayIndex++;
                        dayInit();
                    }
                }

                /**
                 * Prev
                 */
                $scope.prev = function () {
                    addIndex--;
                    if ($scope.options.calendarView == 'month') {
                        monthIndex--;
                        monthInit();
                    }
                    else if ($scope.options.calendarView == 'week') {
                        weekIndex -= 7;
                        weekInit();
                    }
                    else {
                        dayIndex--;
                        dayInit();
                    }
                }

                /**
                 * Today
                 */
                $scope.today = function () {
                    addIndex = 0;
                    monthIndex = 0;
                    weekIndex = 0;
                    dayIndex = 0;
                    setMonthYear();
                    checkCalendarView($scope.options.calendarView);
                }

                /**
                 * get weekDates array
                 */
                function weekDates(date) {
                    const startOfWeek = moment(date).startOf('isoWeek');
                    const endOfWeek = moment(date).endOf('isoWeek');

                    let days = [];
                    let day = startOfWeek;

                    while (day <= endOfWeek) {
                        days.push(addObj());
                        day = day.clone().add(1, 'd');
                    }

                    function addObj() {
                        return {
                            day: day.format("ddd DD"),
                            momentDate: day
                        }
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
                    console.log(dayIndex);
                    for (i = 0; i < hoursPerDay + 1; i++) { //fill in all of the hours
                        (!dayIndex) ? formattedTime = (moment().subtract(i, "hours")).format("hA") : formattedTime = moment().startOf('day').add(i, "hours").format("hA")  //give the time in format X AM/PM

                        fillTimes(); // fill blank time
                        time.push(formattedTime);  //add to beginning of array
                    } //do this for all 24 hours

                    return time.reverse();

                    function fillTimes() {
                        let index = 1
                        while (index) {
                            time.push({
                                date: $scope.options.currentDate,
                                momentDate: $scope.options.currentMomentDate,
                                time: formattedTime,
                                hide: true
                            });
                            index--
                        }
                    }
                }

                /**
                 * get Time Array of Day for week
                 */
                function timeOneDayOfWeek() {
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
                 * Check if the date id today and return boolean
                 */
                function checkToday(date) {
                    return (Math.floor(moment.duration(moment().diff(date)).asDays()) == 0);
                }

                /**
                 * method to get month array
                 */
                function getDaysArrayByMonth(_date) {

                    // var daysInMonth = moment(_date).daysInMonth();
                    var daysInMonth = _date.daysInMonth();
                    var arrDays = [];
                    // fisrt day of month with month name e.g May 1
                    removeDays(_date.startOf('month').format("d"), _date.startOf('month'));
                    monthDays();
                    addDays(_date.endOf('month').format("d"), _date.endOf('month'));

                    //adding days of next month to fill the calender week
                    function addDays(noOfDays, startDate) {
                        let index = 1;
                        // fisrt day of month with month name e.g May 1
                        addObj(moment(startDate).add(index, "days").format("MMM D"), startDate);
                        index++;
                        //loop to fill the array
                        while ((7 - noOfDays) != index) {
                            addObj(moment(startDate).add(index, "days").format("D"), startDate);
                            index++;
                        }
                    }
                    //Adding days from previous month to fill the calender week
                    function removeDays(noOfDays, startDate) {
                        noOfDays = noOfDays * -1;
                        while (noOfDays) {
                            addObj(moment(startDate).add(noOfDays, "days").format("D"), startDate);
                            noOfDays++;
                        }
                    }

                    //Month days
                    function monthDays() {
                        let index = 0;
                        _date.startOf('month').add(index, "d").format("D");
                        addObj(moment(_date).startOf('month').add(index, "d").format("MMM D"), _date);

                        //increament of first day
                        index++;

                        while (daysInMonth != index) {
                            const d = _date.startOf('month').add(index, "d").format("D");
                            addObj(d, _date);
                            index++;
                        }


                    }

                    //add date obj
                    function addObj(d, momentDate) {
                        arrDays.push({
                            day: d,
                            todayflag: checkToday(momentDate),
                            momentDate
                        });
                    }
                    return arrDays;
                }
            }
        }
    })