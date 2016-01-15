(function () {
    'use strict';

    angular
        .module('app')
        .controller('BoardsController', BoardsController);

    BoardsController.$inject = ['pivotTrakerService', '$scope'];

    function BoardsController(pivotTrakerService, $scope) {
        var storyId;

        $scope.backlog = [];
        $scope.done = [];
        $scope.working = [];

        $scope.models = {
            selected: null,
            boards: {
                backlog: $scope.backlog,
                working: $scope.working,
                done: $scope.done
            }
        };

        $scope.getStoryId = function (id) {
            storyId = id;
        };
        
        // $scope.updateStatus = function () {
        //     var story = pivotTrakerService.story.get({ id: storyId });
        //     // save request
        // };
        
        $scope.dropCallback = function(event, index, item, external, type, allowedType) {
            console.log(index);
            if (external) {
                if (allowedType === 'itemType' && !item.label) return false;
                if (allowedType === 'containerType' && !angular.isArray(item)) return false;
            }
            return item;
        };
       
        $scope.$watchCollection('backlog', function(one, two, scope) {
            console.log(one.length)
        }, true);

        pivotTrakerService.stories.query(function (data) {
            angular.forEach(data, function (story) {
                if (story.current_state === 'unstarted') {
                    $scope.backlog.push(story);
                }

                if (story.current_state === 'started' || story.current_state === 'finished' || story.current_state === 'delivered') {
                    $scope.working.push(story);
                }

                if (story.current_state === 'accepted') {
                    $scope.done.push(story);
                }
            });
        });

    }
})();