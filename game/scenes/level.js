define([
        'underscore',
        'jquery',
        'crafty',
        'game/entities/player',
        'game/viewport',
        'collections/scenes'
    ],
    function(_, $, Crafty, PlayerEntity, viewport, scenes) {
        return {
            name: "level",
            init: function (options) {
                // Load Map ?
                var TiledMap = Crafty.e("2D, DOM, TiledMapBuilder").setMapDataSource(options.level.get("data"));
                TiledMap.createWorld(function (map) {

                    // Obstacles
                    for (var obstacle = 0; obstacle < map.getEntitiesInLayer('objects').length; obstacle++) {
                        map.getEntitiesInLayer('objects')[obstacle]
							.addComponent("Collision")
							.collision();
                    }

                    // Setup Archie Blocker
                    var archieBlocker = Crafty.e("2D, DOM, bush, objects, Collision")
                        .attr({ x: 28 * 32, y: 17 * 32, w: 32, h: 32, z: 39 })
                        .collision();

                    // Setup Lily Exit
                    var lilyExit = map.getEntitiesInLayer('lily_exit')[0];
                    lilyExit.addComponent("Collision").collision(new Crafty.polygon([15, 15, 17, 17]));

                    // Setup Archie Exit
                    var archieExit = map.getEntitiesInLayer('archie_exit')[0];
                    archieExit.addComponent("Collision").collision(new Crafty.polygon([15, 15, 17, 17]));

                    var lily = PlayerEntity.create("Lily");
                    lily.attr({ x: 8 * 32, y: 24 * 32, w: 64, h: 64, z: 40 });

                    lily.bind("Moved",
                        function (from) {
                            if (this.hit('lily_exit')) {
                                // move control or end?
                                this.changeScene("menu"); // YOU WIN, TEMP GO BACK TO MENU
                            }
                        });

                    var archie = Crafty.e("2D, DOM, Archie");
                    archie.attr({ x: 30 * 32, y: 13 * 32, w: 64, h: 64, z: 40 });

                    Crafty.viewport.follow(lily, 0, 0);
                });
            },
            uninit: function() { }
        };
    });