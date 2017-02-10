﻿// ----------------------------- \\
// THE MAZE
// @author aaron.barnaby
// @date Febuary 2017
// ----------------------------- \\

requirejs.config({
    paths: {
        underscore: '../libs/underscore/underscore',
        backbone: '../libs/backbone/backbone-min',
        crafty: '../libs/crafty/crafty',
        caman: '../libs/caman/caman-min',
        mouseTrap: '../libs/mousetrap/mousetrap-min',
        store: '../libs/store/store-min',
        eventEmitter: '../libs/eventemitter2/eventemitter2',
        burst: '../libs/burst/burst',
        templates: '../templates',
        game: '../game',
        libs: '../libs'
    },
    shim: {
        underscore: { exports: '_' },
        caman: { exports: "Caman" },
        crafty: { exports: "Crafty" },
        mouseTrap: { exports: "Mousetrap" },
        backbone: {
            deps: ['underscore'],
            exports: "Backbone"
        }
    }
});

requirejs(['app', 'game/components'], function (App) { App.initialize(); });