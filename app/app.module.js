(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngResource'])
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', { templateUrl: 'app/boards/boards.html', title: 'Boards' })
            .otherwise({ redirectTo: '/' });
    }
})();