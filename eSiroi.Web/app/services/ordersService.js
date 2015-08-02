'use strict';
app.factory('ordersService', ['$http', 'eSiroiWebSettings', function ($http, eSiroiWebSettings) {

    var serviceBase = eSiroiWebSettings.apiAuthServiceBaseUri;

    var ordersServiceFactory = {};

    var _getOrders = function () {

        return $http.get('http://localhost/eSiroi.Resource/' + 'api/orders').then(function (results) {
            return results;
        });
    };

    ordersServiceFactory.getOrders = _getOrders;

    return ordersServiceFactory;

}]);