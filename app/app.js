define([
        'crafty',
        'router',
        'game/config',
        'game/viewport'
    ],
    function(Crafty, router, gameConfig, viewport) {
        var initialize = function() {
            Crafty.init(viewport.width, viewport.height);

            viewport.initialize();
            router.initialize();
        };

        return {
            initialize: initialize
        };
    });