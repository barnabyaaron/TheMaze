define([
        'underscore',
        'crafty',
        'collections/scenes'
    ],
    function(_, Crafty, scenes) {
        var player;

        return {
            create: function (character) {
                player = Crafty.e("2D, DOM, PlayableCharacter, PlayerMove, " + character);
                return player;
            },
            get: function() {
                return player;
            }
        };
    });