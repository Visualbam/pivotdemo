(function () {
    'use strict';

    angular
        .module('app')
        .factory('pivotTrakerService', pivotTrakerService);

    pivotTrakerService.$inject = ['$http', '$resource'];

    function pivotTrakerService($http, $resource) {
        var service,
            projectId,
            config = { headers: { 'X-TrackerToken': '12781ca3a1548f8ebf844800fface44a' } };

        service = {
            getProfile: getProfile,
            getProject: getProject
        };

        return service;

        function getProfile() {
            return $http.get('https://www.pivotaltracker.com/services/v5/me', config)
                .then(function (data) {
                    projectId = data.data.projects[0].id;
                    return data;
                });
        }

        function getProject() {
            return $http.get('https://www.pivotaltracker.com/services/v5/projects/' + projectId, config)
                .then(function (data) {
                    return data;
                });
        }


    }
})();