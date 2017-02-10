Class.subclass('Levels', {
    CURRENT_MAP: null,

    init: function () {
        // No Function
    },

    loadScenes: function() {
        // Load all scenes
        for (var i = 0; i < Levels.MAPS.length; i++) {
            var mapData = Levels.MAPS[i];

            Crafty.scene(mapData.name,
                function () {
                    Crafty.background('black');

                    app.levels.generateMap(mapData);

                    // @TODO Move to a class
                    this.player = Crafty.e('2D, DOM, Player, lily, Multiway, SpriteAnimation, Collision, Jumper')
                        .attr({ x: 5 * 32, y: 2 * 32, w: 64, h: 64, z: 40 })
                        .reel("walk_left", 1000, 0, 9, 9)
                        .reel("walk_right", 1000, 0, 11, 9)
			            .reel("walk_up", 1000, 0, 8, 9)
			            .reel("walk_down", 1000, 0, 10, 9)
                        .multiway(32, { W: -90, S: 90, D: 0, A: 180 })
                        .bind('EnterFrame', function () {
                            if (this.isDown("LEFT_ARROW") || this.isDown("A")) {
                                if (!this.isPlaying("walk_left")) {
                                    this.animate("walk_left", -1);
                                }
                            } else if (this.isDown("RIGHT_ARROW") || this.isDown("D")) {
                                if (!this.isPlaying("walk_right")) {
                                    this.animate("walk_right", -1);
                                }
                            } else if (this.isDown("UP_ARROW") || this.isDown("W")) {
                                if (!this.isPlaying("walk_up")) {
                                    this.animate("walk_up", -1);
                                }
                            } else if (this.isDown("DOWN_ARROW") || this.isDown("S")) {
                                if (!this.isPlaying("walk_down")) {
                                    this.animate("walk_down", -1);
                                }
                            } else {
                                if (this.isPlaying()) {
                                    this.pauseAnimation();
                                    this.resetAnimation();
                                }
                            }
                        })
                        .bind('Moved', function(from) {
                            if (this.hit('Obstacle')) {
                                this.attr({ x: from.x, y: from.y });
                            }
                        });
                });
        }
    },

    generateMap: function (map) {
        Levels.CURRENT_MAP = map;

        // Place base tiles
        for (var x = 0; x < App.STAGE_WIDTH; x++) {
            for (var y = 0; y < App.STAGE_HEIGHT; y++) {
                groundNumber = Crafty.math.randomInt(1, 20);
                if (groundNumber === 20) groundNumber = 2;
                else if (groundNumber > 17) groundNumber = 3;
                else if (groundNumber > 11) groundNumber = 4;
                else groundNumber = 1;

                Crafty.e('2D, DOM, ' + map.images.baseTile + groundNumber)
                    .attr({ x: x * 32, y: y * 32, w: 32, h: 32, z: 2 });

                if (App.TESTING_GRID) {
                    Crafty.e('2D, DOM, Text')
                        .attr({ x: x * 32, y: y * 32, w: 32, h: 32, z: 2 })
                        .text(x + ', ' + y)
                        .css('font-family', 'arial')
                        .css('font-size', '8px')
                        .css('color', 'black')
                        .css('border', 'black 0.5px dashed');
                }
            }
        }

        // Load Map Tiles
        for (var i = 0; i < map.tiles.length; i++) {
            var tile = map.tiles[i];

            if (tile.type === 'FULL_NAME') {
                var manualZ = 0;
                if (tile.z === '+1') manualZ = 1;

                Crafty.e('2D, DOM, ' + tile.sprite)
                    .attr({ x: tile.x * 32, y: tile.y * 32, z: 100 + (tile.y + manualZ) * 32 });
            } else if (tile.type === 'ABC') {
                var obstacle = Crafty.e('2D, DOM, ' + tile.sprite + ', Obstacle, Collision')
                    .attr({ x: tile.x * 32, y: tile.y * 32, z: 100 + tile.y * 32 });

                if (tile.h) {
                    obstacle.collision(new Crafty.polygon([0, 0], [obstacle.w, 0], [obstacle.w, tile.h], [0, tile.h]));
                }
            } else if (tile.type === 'GROUND') {
                Crafty.e('2D, DOM, ' + tile.sprite)
                    .attr({
                        x: tile.x * 32 + Crafty.math.randomInt(-16, 16),
                        y: tile.y * 32 + Crafty.math.randomInt(-16, 16),
                        z: 11
                    });
            } else if (tile.type === 'GROUND_OBSTACLE') {
                var obstacle = Crafty.e('2D, DOM, ' + tile.sprite + ', Obstacle, Collision')
                    .attr({ x: tile.x * 32, y: tile.y * 32, z: 11 });

                obstacle.collision(new Crafty.polygon([0, -20], [obstacle.w - 10, -20], [obstacle.w - 10, obstacle.h - 30], [0, obstacle.h - 30]));
            } else {
                var obstacle = Crafty.e('2D, DOM, ' + map.images.waterTile + tile.sprite + ', Obstacle, Collision')
                    .attr({ x: tile.x * 32, y: tile.y * 32, z: 10 });

                obstacle.collision(new Crafty.polygon([0, -20], [obstacle.w - 10, -20], [obstacle.w - 10, obstacle.h - 30], [0, obstacle.h - 30]));
            }
        }
    }
});

Levels.MAPS = [
    {
        "name": "intro",
        "settings": {},
        "images": {
            "baseTile": "lavarock",
            "waterTile": "lava"
        },
        "tiles": [
            { 'x': 7, 'y': 0, 'sprite': '_center_left' },
            { 'x': 7, 'y': 1, 'sprite': '_center_left' },
            { 'x': 7, 'y': 2, 'sprite': '_center_left' },
            { 'x': 7, 'y': 3, 'sprite': '_center_left' },
            { 'x': 7, 'y': 4, 'sprite': '_center_left' },
            { 'x': 7, 'y': 5, 'sprite': '_center_left' },
            { 'x': 7, 'y': 6, 'sprite': '_center_left' },
            { 'x': 7, 'y': 7, 'sprite': '_center_left' },
            { 'x': 7, 'y': 8, 'sprite': '_center_left' },
            { 'x': 7, 'y': 9, 'sprite': '_center_left' },
            { 'x': 7, 'y': 10, 'sprite': '_center_left' },
            { 'x': 7, 'y': 11, 'sprite': '_center_left' },
            { 'x': 7, 'y': 12, 'sprite': '_center_left' },
            { 'x': 7, 'y': 13, 'sprite': '_center_left' },
            { 'x': 7, 'y': 14, 'sprite': '_center_left' },
            { 'x': 7, 'y': 15, 'sprite': '_center_left' },

            { 'x': 8, 'y': 0, 'sprite': '_center_right' },
            { 'x': 8, 'y': 1, 'sprite': '_center_right' },
            { 'x': 8, 'y': 2, 'sprite': '_center_right' },
            { 'x': 8, 'y': 3, 'sprite': '_center_right' },
            { 'x': 8, 'y': 4, 'sprite': '_center_right' },
            { 'x': 8, 'y': 5, 'sprite': '_center_right' },
            { 'x': 8, 'y': 6, 'sprite': '_center_right' },
            { 'x': 8, 'y': 7, 'sprite': '_center_right' },
            { 'x': 8, 'y': 8, 'sprite': '_center_right' },
            { 'x': 8, 'y': 9, 'sprite': '_center_right' },
            { 'x': 8, 'y': 10, 'sprite': '_center_right' },
            { 'x': 8, 'y': 11, 'sprite': '_center_right' },
            { 'x': 8, 'y': 12, 'sprite': '_center_right' },
            { 'x': 8, 'y': 13, 'sprite': '_center_right' },
            { 'x': 8, 'y': 14, 'sprite': '_center_right' },
            { 'x': 8, 'y': 15, 'sprite': '_center_right' }
        ]
    }
];