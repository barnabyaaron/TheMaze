define([
        'jquery',
        'underscore',
        'backbone',
        'collections/scenes',
        'collections/levels',
        'text!templates/levels/show.html'
    ],
    function($, _, Backbone, scenes, levels, _show) {
        var Show = Backbone.View.extend({
            el: $("#wrapper"),
            render: function(id) {
                $("#inner_background").html("");
                scenes.findByName("blank").load();
                this.$el.html(_.templates(_show));

                $("#ig_menu button").click(function() {
                    window.location.replace("#");
                });

                scenes.findByName("level").load({ level: levels.get(id) });
            }
        });

        return new Show;
    });