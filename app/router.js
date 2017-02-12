define([
        'jquery',
        'underscore',
        'backbone',
        'views/home/show',
        'views/levels/show'
    ],
    function($, _, Backbone, home) {
        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'home',
                'levels/:id': 'level'
            },
            home: function() {
                home.render();
            },
            level: function(id) {
                level.render(id);
            }
        });

        var router;

        return {
            initialize: function() {
                router = new AppRouter;
                Backbone.history.start();
            },

            go: function(to) {
                router.navigate(to, { trigger: true, replace: true });
            }
        };
    });