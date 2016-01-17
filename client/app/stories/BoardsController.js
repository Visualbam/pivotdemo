(function () {
    'use strict';

    angular
        .module('app')
        .controller('BoardsController', BoardsController);

    BoardsController.$inject = ['pivotTrakerService', '$scope', 'Board'];

    function BoardsController(pivotTrakerService, $scope, Board) {
        var backlog,
            working,
            done;

        // properties
        $scope.boards = [];

        // build boards
        backlog = Board.build('Backlog', ['unstarted']);
        working = Board.build('Working', ['started', 'finished', 'delivered', 'rejected']);
        done = Board.build('Done', ['accepted']);

        $scope.boards.push(backlog, working, done);
    }
})();