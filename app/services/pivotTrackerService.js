(function () {
    'use strict';

    angular
        .module('app')
        .factory('pivotTrakerService', pivotTrakerService);

    pivotTrakerService.$inject = ['$http', '$resource'];

    function pivotTrakerService($http, $resource) {
        var service,
            projectId;

        service = {
            getProfile: getProfile
        };

        return service;

        function getProfile(callback) {
            var endPoint = 'https://www.pivotaltracker.com/services/v5/me',
                api;

            api = $resource(endPoint, {}, {
                get: {
                    method: 'GET',
                    headers: {'X-TrackerToken': '12781ca3a1548f8ebf844800fface44a'}
                }
            });

            api.get(function(response) {
                callback(response);
            });
        }
    }
})();