Class.subclass('Game', {
    init: function() {
        this.loadComponents();
    },

    loadComponents: function() {
        Crafty.c('Ape',
        {
            faceLeft: function () {
                this.stop();
                this.sprite(0, 1 * 4);
            },
            faceRight: function () {
                this.stop();
                this.sprite(0, 3 * 4);
            },
            faceUp: function () {
                this.stop();
                this.sprite(0, 0 * 4);
            },
            faceDown: function () {
                this.stop();
                this.sprite(0, 2 * 4);
            },

            init: function () {
                this.requires('SpriteAnimation, Collision, Grid')
                    .attr({ animationSpeed: 5 })
                    .animate('walk_up', 1, 0, 8)
                    .animate('walk_left', 1, 1, 8)
                    .animate('walk_down', 1, 2, 8)
                    .animate('walk_right', 1, 3, 8)
                    .bind('NewDirection',
                        function (dir) {
                            this.attr('myDirection', dir);

                            if (!App.STORY_MODE) {
                                if (Math.abs(dir.x) > Math.abs(dir.y)) {
                                    if (dir.x < 0) {
                                        if (!this.isPlaying('walk_left'))
                                            this.stop().animate('walk_left', this.animationSpeed, -1);
                                    } else if (dir.x > 0) {
                                        if (!this.isPlaying('walk_right'))
                                            this.stop().animate('walk_right', this.animationSpeed, -1);
                                    }
                                } else {
                                    if (dir.y < 0) {
                                        if (!this.isPlaying('walk_up'))
                                            this.stop().animate('walk_up', this.animationSpeed, -1);
                                    } else if (dir.y > 0) {
                                        if (!this.isPlaying('walk_down'))
                                            this.stop().animate('walk_down', this.animationSpeed, -1);
                                    }
                                }

                                if (!dir.x && !dir.y) {
                                    if (this.isPlaying('walk_left')) this.faceLeft();
                                    else if (this.isPlaying('walk_right')) this.faceRight();
                                    else if (this.isPlaying('walk_up')) this.faceUp();
                                    else if (this.isPlaying('walk_down')) this.faceDown();
                                }
                            }
                        });
                return this;
            }
        });

        Crafty.c('Jumper', {
            init: function () {
                this.attr('jumpState', 'IDLE')
                .attr('currentJump', 0)
                .bind('EnterFrame', function () {
                    //jumping action
                    if (this.jumpState === 'JUMP_UP') {
                        this.y -= 5;
                        this.currentJump += 5;
                        if (this.currentJump >= 15) this.attr('jumpState', 'JUMP_DOWN');

                        /*           if(this.hit('Obstacle'))
                                  {
                                    this.y += 5;
                                    this.jumpSate = 'IDLE';
                                  } */
                    }
                    else if (this.jumpState === 'JUMP_DOWN') {
                        this.y += 5;
                        this.currentJump -= 5;
                        if (this.currentJump <= 0) {
                            this.attr('jumpState', 'IDLE');

                            if (this.hit('Obstacle')) {
                                this.y -= 5;
                                this.jumpSate = 'IDLE';
                            }
                        }
                    }
                })
                .bind('Jump', function () {
                    this.attr({ jumpState: 'JUMP_UP', currentJump: 0 });
                });

                return this;
            }
        });
    }
});