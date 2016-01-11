(function () {
    'use strict';

    angular
        .module('app')
        .factory('pivotTrakerService', pivotTrakerService);

    pivotTrakerService.$inject = ['$http', '$resource'];

    function pivotTrakerService($http, $resource) {
        var service,
            projectId,
            token = { 'X-TrackerToken': '12781ca3a1548f8ebf844800fface44a' },
            profile,
            actions = {
                get: { method: 'GET', headers: token },
                save: { method: 'POST', headers: token },
                create: { method: 'POST', headers: token },
                query: { method: 'GET', isArray: true, headers: token },
                remove: { method: 'DELETE', headers: token },
                delete: { method: 'DELETE', headers: token },
                update: { method: 'PUT', headers: token }
            };

        service = {
            profile: $resource('https://www.pivotaltracker.com/services/v5/me', {}, actions),
            stories: $resource('https://www.pivotaltracker.com/services/v5//projects/1509314/stories', {}, actions)
        };

        return service;
    }
})();