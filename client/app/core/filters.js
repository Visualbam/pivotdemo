(function () {
    angular
        .module('app')
        .filter('filterState', function () {
            return function (stories, states) {
                var items = {
                    states: states,
                    out: []
                };

                angular.forEach(stories, function (value) {
                    angular.forEach(states, function (state) {
                        if (state === value.current_state) {
                            this.out.push(value);
                        }
                    }, items);
                });

                return items.out;
            };
        });
})();