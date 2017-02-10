Class.subclass('App',
{
    TESTING_MODE: false,
    TESTING_GRID: false,
    CHEAT_MODE: false,

    LOG_ELEMENT: null,

    /**********************/
    STAGE_WIDTH: 16,
    STAGE_HEIGHT: 16,
    TILE_SIZE: 32,
    
    start: function () {
        Class.classesLoaded();

        var app = new App();
        app.setup();

        return app;
    },

    log: function(message) {
        if (App.TESTING_MODE) {
            if (App.LOG_ELEMENT === null) {
                var element = document.createElement('div');
                element.id = 'log';
                element.innerHTML = "<br />";
                document.body.appendChild(element);

                App.LOG_ELEMENT = element;
            }

            App.LOG_ELEMENT.innerHTML += message + "<br />";
        }
    },

    clearLog: function() {
        if (App.TESTING_MODE) {
            document.getElementById('log').innerHTML = "";
        }
    }
}, {
    setup: function () {
        Crafty.init(App.STAGE_WIDTH * App.TILE_SIZE, App.STAGE_HEIGHT * App.TILE_SIZE);

        this.setupGame();
        this.setupAssets();

        this.browserFix();

        this.loadAssets();
        this.loadLevels();
    },

    loadAssets: function () {
        Crafty.scene('loading',
            function() {
                Crafty.background('rgb(30,30,30)');
                Crafty.e('2D, DOM, Text')
                    .attr({ w: 480, h: 20, x: 0, y: 20 })
                    .text('Loading...')
                    .css({ 'text-align': 'center' });

                Crafty.load(Assets.FILES, function() {
                        // On Load Complete
                        Crafty.scene('intro');
                    }, function (e) {
                        // Progress
                    }, function(e) {
                        // Error  
                    });
            });
        Crafty.scene('loading');
    },

    loadLevels: function () {
        this.levels = new Levels();
        this.levels.loadScenes();
    },

    setupGame: function() {
        this.game = new Game();
    },

    setupAssets: function() {
        this.assets = new Assets();
    },

    browserFix: function() {
        //firefox does not support css' zoom, so I had to use scale in it
        //It behaves a bit different than zoom, thus the following adjustments were required
        var FIREFOX = /Firefox/i.test(navigator.userAgent);
        if (FIREFOX && !nozoom) {
            var craftyDiv = document.getElementById("cr-stage");
            craftyDiv.style.height = '338px';
            craftyDiv.style.marginTop = '150px';
        }
    }
});