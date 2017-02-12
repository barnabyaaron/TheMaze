define([
        'crafty',
        'game/viewport',
        'store'
    ], function (Crafty, viewport, store) {
    return {
        name: "menu",
        init: function(options) {
            
            // Background
            Crafty.e("2D, DOM").attr({
                w: viewport.width,
                h: viewport.height,
                x: 0,
                y: 0
            }).css("background", "url(assets/images/background.png)").css("z-index", "0");

            // Clouds
            Crafty.e("Clouds");

            // Floor
            Crafty.e("2D, DOM").attr({
                w: viewport.width,
                h: 309,
                x: 0,
                y: viewport.height - 309
            }).css("background", "url(assets/images/floor.png)").css("z-index", "0");

            // Menu links
            Crafty.e("GameTitle");
            Crafty.e("NewGameMenuItem");
            if (store.get("level") > 1) {
                Crafty.e("ContinueMenuItem");
            }
        },
        uninit: function () { }
    };
});