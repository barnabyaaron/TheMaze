define([
        'backbone',
        'models/scene',
        'game/scene'
    ],
    function(Backbone, Scene, scenesData) {
        var Scenes = Backbone.Collection.extend({
            model: Scene,
            findByName: function(name) {
                return this.where({ name: name })[0];
            }
        });

        return new Scenes(scenesData);
    });