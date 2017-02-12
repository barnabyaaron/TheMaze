define([
        'crafty',
        'game/config',
        'game/viewport',
        'collections/scenes'
    ],
    function (Crafty, gameConfig, viewport, scenes) {
        var initialize = function() {
            Crafty.init(viewport.width, viewport.height, "wrapper");
            Crafty.paths({ images: "assets/" });

            viewport.initialize();

            // Start
            scenes.findByName("menu").load();
        };

        return {
            initialize: initialize
        };
    });