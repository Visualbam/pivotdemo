(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('pivot', pivot);

    /* @ngInject */
    function pivot() {
        var service = {
            getBoards: getBoards
        };

        return service;

        function getBoards() {
            return $http.get('/api/maa')
                .then(getBoardsComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getBoards')(message);
                    $location.url('/');
                });

            function getBoardsComplete(data, status, headers, config) {
                return data.data[0].data.results;
            }
        }

    }
})();