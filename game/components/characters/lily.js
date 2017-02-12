define([
        'underscore',
        'crafty'
    ],
    function(_, Crafty) {
        Crafty.c("Lily",
        {
            init: function() {
                this.addComponent("lily, SpriteAnimation, Collision");

                this.reel("walk_left", 1000, 0, 9, 9);
                this.reel("walk_right", 1000, 0, 11, 9);
                this.reel("walk_up", 1000, 0, 8, 9);
                this.reel("walk_down", 1000, 0, 10, 9);
                
                this.collision(new Crafty.polygon([20, 50, 45, 50, 45, 64, 20, 64]));
            }
        });
    });