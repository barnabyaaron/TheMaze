define([
        'crafty',
        'game/viewport',
        'store',
        'collections/scenes',
        'collections/levels'
    ],
    function(Crafty, viewport, store, scenes, levels) {

        Crafty.c("MenuItem",
        {
            init: function() {
                this.addComponent("2D, DOM, Mouse");
                this.attr({
                    w: 240,
                    h: 54,
                    x: 237
                });

                this.css("background", "url(assets/images/menu-sprites.png)");
                this.css("z-index", "0");
                this.css("cursor", "pointer");
            }
        });

        Crafty.c("GameTitle", {
            init: function () {
                this.addComponent("2D, DOM, Text");
                this.attr({
                    w: viewport.width,
                    x: 0,
                    y: 175
                });
                this.text("The Maze");
                this.textFont({ family: 'Finger Paint', size: '52px' });
                this.css({
                    'text-shadow': '0 0 1px #000, 0 0 1px #000',
                    'color': '#FFF',
                    'text-align': 'center',
                    'cursor': 'default'
                });
            }
        });

        Crafty.c("NewGameMenuItem", {
            init: function () {
                this.addComponent("MenuItem");
                this.attr({
                    y: 316
                });
                this.css("background-position", "-240px 0");
                this.bind("MouseOver", function () {
                    this.css("background-position", "0 0");
                });
                this.bind("MouseOut", function () {
                    this.css("background-position", "-240px 0");
                });
                this.bind("Click", function () {
                    this.css("background-position", "-480px 0");
                    store.set("level", 1);

                    console.log("Loading Level: " + store.get('level'));
                    scenes.findByName("level").load({ level: levels.get(store.get('level')) });
                });
            }
        });

        Crafty.c("ContinueMenuItem", {
            init: function () {
                this.addComponent("MenuItem");
                this.attr({
                    y: 370
                });
                this.css("background-position", "-240px 54px");
                this.bind("MouseOver", function () {
                    this.css("background-position", "0 54px");
                });
                this.bind("MouseOut", function () {
                    this.css("background-position", "-240px 54px");
                });
                this.bind("Click", function () {
                    this.css("background-position", "-480px 54px");

                    console.log("Loading Level: " + store.get('level'));
                    scenes.findByName("level").load({ level: levels.get(store.get('level')) });
                });
            }
        });

        Crafty.c("AttachSprite", {
            init: function () {
                this.bind("EnterFrame", function () {
                    if (this._spriteComponent !== undefined) {
                        this._spriteComponent.attr({
                            x: this.x - this._spriteComponent._mainComponentAttr.x,
                            y: this.y - this._spriteComponent._mainComponentAttr.y
                        });
                    }
                });
            },
            attachSprite: function (spriteComponent) {
                this._spriteComponent = spriteComponent;
                if (this._zIndex) {
                    this._spriteComponent.attr({
                        z: this._zIndex
                    });
                }
                this.trigger("SpriteAttached");
            }
        });

        Crafty.c("Clouds", {
            init: function () {
                this.addComponent("2D, DOM");
                this._backgroundPos = 0;
                this.attr({
                    w: viewport.width,
                    h: 114,
                    x: 0,
                    y: 0
                });
                this.css("background", "url(assets/images/clouds.png)");
                this.css("z-index", "0");
                this.bind("EnterFrame", function () {
                    this._backgroundPos += 0.5;
                    this.css("background-position", Math.ceil(this._backgroundPos) + "px 0");
                });
            }
        });

    });