(function () {
    'use strict';

    angular
        .module('app')
        .controller('StoriesController', StoriesController);

    StoriesController.$inject = ['pivotTrakerService', '$scope'];

    function StoriesController(pivotTrakerService, $scope) {
        $scope.stories = [];

        pivotTrakerService.stories.query(function (stories) {
            $scope.stories = stories;
        });

        $scope.removeStoryNode = function (event, storyId) {
            var element = event.srcElement;
            element.parentNode.removeChild(element);
        };

        $scope.updateStory = function (event, index, item) {
            var board = event.path[2].parentElement.className,
                Story = pivotTrakerService.story.get({ id: item.id });

            if (board.indexOf('Backlog') !== -1) {
                Story.current_state = 'unstarted';
            }

            if (board.indexOf('Working') !== -1) {
                Story.current_state = 'started';
            }

            if (board.indexOf('Done') !== -1) {
                Story.current_state = 'accepted';
            }

            pivotTrakerService.story.update({ id: item.id }, Story).$promise.then(function (response) {
                $scope.stories.push(response);
            });
        };

    }
})();