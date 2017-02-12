define([
        'underscore',
        'crafty',
        'collections/scenes'
    ],
    function(_, Crafty, scenes) {
        Crafty.c("PlayableCharacter",
        {
            init: function() {
                this.addComponent("Character");
            },
            changeScene: function(name) {
                scenes.findByName(name).load();
            }
        });
    });