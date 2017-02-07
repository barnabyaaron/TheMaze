Class.subclass('Overlay', {
    init: function () {
        this.bgNode = $('#overlay');
        this.contentNode = $('#overlay-contents');
    },

    display: function (html, stack) {
        this.contentNode.html(html);
        this.show();
    },

    show: function () {
        this.bgNode.show();
        this.contentNode.show();
    },

    hide: function () {
        this.contentNode.hide();
        this.bgNode.hide();
    },

    displayPage: function (name) {
        var builder = new OverlayBuilder();
        Overlay.PAGES[name].call(this, builder);
        var html = builder.render();
        this.display(html);
    }
});

Class.subclass('OverlayBuilder', {
    init: function () {
        this.buffer = '';
    },

    render: function () {
        return this.buffer;
    },

    h1: function (txt) {
        return this.html("<h1>" + txt + "</h1>\n");
    },

    p: function (txt) {
        return this.html("<p>" + txt + "</p>\n");
    },

    indent: function (txt) {
        return this.html('<p style="margin-left: 20px;">' + txt + '</p>\n')
    },

    textInput: function (name, value) {
        var html = '<input type="text" id="' + name + '" name="' + name + '"';
        if (value) { html + ' value="' + value + '"'; }
        html += '></input>';

        return this.html(html);
    },

    button: function (name, onclick, icon) {
        return this.html('<button onclick="' + onclick + '">' + name + '</button>');
    },

    html: function (txt) {
        this.buffer += txt;
        return this;
    }
});

Overlay.PAGES = {
    'start': function (p) {
        p.h1('The Maze!')
         .p('In this game, you will command a *** using simple commands to navigate and exit the maze.')
         .p('You can learn about the commands you can use at any time by clicking the help button.')
         .p('Once you have written your commands (one per line) click Execute to run them.')
         .button('Start Adventure', "app.loadLevel(0)");
    },
    'help': function (p) {
        p.h1('Help')
         .p('The follow commands can be used to move your ***.')
         .indent('<b>forward</b>: moves the *** forward.')
         .p('Commands can be repeated multiple times by adding a count like so: <b>forward(2)</b>')
         .button('Close', "app.overlay.hide()");
    },
    'win': function (p) {
        p.h1('WIN!');
    },
    'lose': function (p) {
        p.h1('LOSE!');
    }
};