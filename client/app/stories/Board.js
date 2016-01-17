(function () {
    'use strict';

    angular
        .module('app')
        .service('Board', Board);

    Board.$inject = [];

    function Board() {
        this.build = function (title, allowedStates) {
            return {
                title: title,
                allowedStates: allowedStates,
                list: []
            }
        };
    }

})();