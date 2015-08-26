
'use strict';
//angular.module('eSiroi.Web')
//    .directive('loadingWidget', ['requestNotificationChannel', function (requestNotificationChannel) {
//    return {
//        restrict: "EA",
//        link: function (scope, element) {
//            // hide the element initially
//            element.hide();

//            var startRequestHandler = function () {
//                // got the request start notification, show the element
                
//                element.show();
//            };

//            var endRequestHandler = function () {
//                // got the request start notification, show the element
//                element.hide();
//            };
            
//            requestNotificationChannel.onRequestStarted(scope, startRequestHandler);

//            requestNotificationChannel.onRequestEnded(scope, endRequestHandler);
//        }
//    };
//}]);

angular.module('eSiroi.Web').directive('httpLoader', function () {
    return {
        restrict: 'EA',
        link: function (scope, element) {
            // Store original display mode of element
            var shownType = element.css('display');
            function hideElement() {
                element.css('display', 'none');
            }

            scope.$on('httpLoaderStart', function () {
                element.css('display', shownType);
            });

            scope.$on('httpLoaderEnd', hideElement);

            // Initially hidden
            hideElement();
        }
    };
});