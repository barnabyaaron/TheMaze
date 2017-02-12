define([
        'underscore',
        'crafty'
    ],
    function(_, Crafty) {
        Crafty.c("PlayerMove",
        {
            init: function() {
                this.addComponent("Keyboard, Fourway");

                this.fourway(2 * 32);

                this.bind("Moved",
                    function(from) {
                        if (this.hit('objects')) {
                            if (from.axis === 'x') {
                                this.attr({ x: from.oldValue });
                            } else if (from.axis === 'y') {
                                this.attr({ y: from.oldValue });
                            }
                        }
                    });

                this.bind("NewDirection",
                    function(direction) {
                        if (direction.x < 0) {
                            if (!this.isPlaying("walk_left"))
                                this.pauseAnimation().animate("walk_left", 10, -1);
                        }
                        if (direction.x > 0) {
                            if (!this.isPlaying("walk_right"))
                                this.pauseAnimation().animate("walk_right", 10, -1);
                        }
                        if (direction.y < 0) {
                            if (!this.isPlaying("walk_up"))
                                this.pauseAnimation().animate("walk_up", 10, -1);
                        }
                        if (direction.y > 0) {
                            if (!this.isPlaying("walk_down"))
                                this.pauseAnimation().animate("walk_down", 10, -1);
                        }
                        if (!direction.x && !direction.y) {
                            this.pauseAnimation();
                        }
                    });
            }
        });
    });