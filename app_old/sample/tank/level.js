Class.subclass('Level', {
    load: function (levelId) {
        var level = new Level(levelId);
        return level;
    },

    getState: function (key) {
        var state = app.settings.get('level-' + key);
        if (!state) {
            state = {};
        }

        return state;
    },

    setState: function (key, state) {
        app.settings.set('level-' + key, state);
    },

    isCompleted: function (key) {
        var state = this.getState(key);
        return state.completed;
    },

    complete: function (key) {
        var state = this.getState(key);
        state.completed = true;
        this.setState(key, state);
    },

    key: function (levelId) {
        var info = App.LEVELS[levelId];
        if (info) {
            return info.key;
        } else {
            return null;
        }
    }
}, {
    init: function (levelId) {
        this.id = levelId;
        this.loadData();
    },

    loadData: function () {
        var data = App.LEVELS[this.id];
        this.key = data.key;
        this.name = data.name;
        this.map = new Map(data.map);
        this.program = new Program(this);

        $('#title').html('Level: ' + this.name);
    },

    unload: function () {
        this.map.destroy();
    },

    win: function () {
        this.program.running = false;
        Level.complete(this.key);

        setTimeout(function () {
            app.overlay.displayPage('win');
        }, 1000);
    },

    lose: function () {
        this.program.running = false;

        setTimeout(function () {
            app.overlay.displayPage('lose');
        }, 1000);
    }
});

App.LEVELS = {
    0: {
        key: 'level-0',
        name: 'Baby Maze',
        map: [
            '...|E|..',
            '...|.|..',
            '...|.|..',
            '...|.|..',
            '...|.|..',
            '...|^|..',
            '...+-+..',
            '........'
        ]
    }
};
