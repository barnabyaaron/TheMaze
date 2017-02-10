define([
        'jquery',
        'underscore',
        'backbone',
        'views/home/show'
    ],
    function($, _, Backbone, home) {
        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'home'
            },
            home: function() {
                home.render();
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