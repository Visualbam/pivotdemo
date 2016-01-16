(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngResource', 'dndLists'])
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', { templateUrl: 'app/stories/boards.html', title: 'Boards' })
            .otherwise({ redirectTo: '/' });
    }
})();