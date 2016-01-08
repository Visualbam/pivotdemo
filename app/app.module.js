(function () {
    'use strict';

    angular.module('app', [
        // angular modules
        'ngRoute',

        // common modules
        'app.core',

        // feature modules
        'app.boards'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/pivot', {
                templateUrl: 'app/boards/boards.html',
            })
            .otherwise({redirectTo: '/pivot'});
    }]);
})();