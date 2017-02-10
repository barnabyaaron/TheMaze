Class.subclass('App',
{
    ASSETS: {
        "sprites": {
            "assets/images/archie_64.png": {
                "tile": 64,
                "tileh": 64,
                "map": {
                    "archie": [0, 2]
                }
            },
            "assets/images/lily_64.png": {
                "tile": 64,
                "tileh": 64,
                "map": {
                    "lily": [0, 2]
                }
            }
        }
    },

    start: function () {
        Class.classesLoaded();

        var app = new App();

        Crafty.load(App.ASSETS, function () {
            // When Loaded
            app.setup();
        }, function (e) {
            // Progress   
        }, function (e) {
            // Error Loading   
        });
    }
}, {
    setup: function () {
        var WIDTH = 50;
        var HEIGHT = 50;
        var TILE_SIZE = 16;

        Crafty.init(WIDTH * TILE_SIZE, HEIGHT * TILE_SIZE);
        Crafty.scene("Load", function () {
            Crafty.background("#000");
            Crafty.e("2D, DOM, Text").attr({ w: WIDTH*TILE_SIZE, h: 20*TILE_SIZE, x: 0, y: HEIGHT / 2 })
                    .text("Loading...")
                    .css({ "text-align": "center", "color": "white" });

            //Preload sprites first
            Crafty.load(App.ASSETS, function () {
                // When Loaded
                Crafty.scene("Main");
            }, function (e) {
                // Progress   
            }, function (e) {
                // Error Loading   
            });
        });
        Crafty.scene("Load");

        Crafty.scene("Main", function () {
            archie = Crafty.e("2D, Canvas, lily, Multiway, SpriteAnimation, Collision")
			    .attr({ x: 160, y: 220, z: 1 })
                .reel("walk_left", 1000, 0, 9, 9)
                .reel("walk_right", 1000, 0, 11, 9)
			    .reel("walk_up", 1000, 0, 8, 9)
			    .reel("walk_down", 1000, 0, 10, 9)
                .multiway(24, { W: -90, S: 90, D: 0, A: 180 })
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
                .collision()

            archie = Crafty.e("2D, Canvas, archie, Multiway, SpriteAnimation, Collision")
			    .attr({ x: 160, y: 144, z: 1 })
                .reel("walk_left", 1000, 0, 9, 9)
                .reel("walk_right", 1000, 0, 11, 9)
			    .reel("walk_up", 1000, 0, 8, 9)
			    .reel("walk_down", 1000, 0, 10, 9)
                .multiway(24, { W: -90, S: 90, D: 0, A: 180 })
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
                .collision()
        });
    }
});