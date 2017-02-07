Class.subclass('App', {
    SPRITES: {
        'wall-horizontal': [2, 1],
        'wall-vertical': [3, 1],
        'wall-corner': [4, 1]
    },

    start: function () {
        // Do any final class-level setup
        Class.classesLoaded();

        // Create out app instance
        var app = new App();

        // Load resources
        Crafty.load([
            '/assets/images/sprites.png'
        ], function () {
            app.setup();
        });

        // All done, return reference
        return app;
    }
}, {
    setup: function () {
        Crafty.init(64 * 8, 64 * 8);  // Width, Height
        Crafty.canvas.init();

        // Setup libraries and resources
        this.setupOverlay();
        this.setupSettings();
        this.setupSprites();
        this.setupControls();

        this.overlay.displayPage('start');
    },

    setupOverlay: function () {
        this.overlay = new Overlay();
    },

    setupSettings: function () {
        this.settings = Settings;
    },

    setupSprites: function () {
        Crafty.sprite(64, '/assets/images/sprites.png', App.SPRITES);
    },

    setupControls: function () {
        var self = this;

        $('#program').val('');

        $('#help-button').click(function () {
            self.overlay.displayPage('help');
        });

        $('#run-button').click(function () {
            self.runProgram();
        });

        $('#reset-button').click(function () {
            if (confirm('Reset all progress?')) {
                self.settings.deleteAll();
                self.overlay.displayPage('start');
            }
        });
    },

    loadLevel: function (levelId) {
        this.overlay.hide();
        if (this.level) {
            this.level.unload();
        }

        this.level = Level.load(levelId);
        this.map = this.level.map;
        this.program = this.level.program;
    },

    resetLevel: function () {
        if (this.level) {
            this.loadLevel(this.level.id);
        }
    },

    runProgram: function () {
        if (!this.level) { return; }
        this.program.run();
    }
});