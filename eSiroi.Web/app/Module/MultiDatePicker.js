angular.module('gm.datepickerMultiSelect', ['ui.bootstrap'])
.config(['$provide', function ($provide) {
    $provide.decorator('daypickerDirective', ['$delegate', function ($delegate) {
        var directive = $delegate[0];

        /* Override compile */
        var link = directive.link;

        directive.compile = function () {
            return function (scope, element, attrs, ctrl) {
                link.apply(this, arguments);

                var selectedDates = [];

                /* Called when multiSelect model is updated */
                scope.$on('update', function (event, newDates) {
                    selectedDates = newDates;
                    update();
                });

                /* Get dates pushed into multiSelect array before Datepicker is ready */
                scope.$emit('requestSelectedDates');

                /* Fires when date is selected or when month is changed. */
                scope.$watch(function () {
                    return ctrl.activeDate.getTime();
                }, update);

                function update() {
                    angular.forEach(scope.rows, function (row) {
                        angular.forEach(row, function (day) {
                            day.selected = selectedDates.indexOf(day.date.setHours(0, 0, 0, 0)) > -1
                        });
                    });
                }
            }
        }

        return $delegate;
    }]);
}])
.directive('multiSelect', function () {
    return {
        require: ['ngModel'],
        link: function (scope, elem, attrs, ctrls) {
            var selectedDates;

            /* Called when directive is compiled */
            scope.$on('requestSelectedDates', function () {
                scope.$broadcast('update', selectedDates);
            });

            scope.$watchCollection(attrs.multiSelect, function (newVal) {
                selectedDates = newVal || [];
                scope.$broadcast('update', selectedDates);
            });

            scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                if (!newVal) return;
                var dateVal = new Date();
                dateVal = newVal.getTime();

                if (selectedDates.indexOf(dateVal) < 0) {
                    selectedDates.push(dateVal);
                } else {
                    selectedDates.splice(selectedDates.indexOf(dateVal), 1);
                }
            });
        }
    }
});
