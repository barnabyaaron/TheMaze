Class.subclass('MapObject', {
    init: function (map, attrs) {
        this.map = map;

        this.entity = null;
        this.animations = {};

        // Default State
        if (this.dir === undefined) { this.dir = Dir.UP; }
        if (this.mapPos === undefined) { this.mapPos = null; }
        if (this.hippoints === undefined) { this.hitpoints = 1; }
        if (this.passable === undefined) { this.passable = false; }
        if (this.damageable === undefined) { this.damageable = true; }

        this.instantiate();
    },

    instantiate: function () {
        return null;
    },

    destroy: function () {
        this.map.removeObject(this);
        if (this.entity) {
            this.entity.destroy();
        }
    },

    basicEntity: function (sprite) {
        var e = Crafty.e('"D, Canvas, ' + sprite)
        e.attr({ w: 64, h: 64, rotation: 0 });
        e.origin(32, 32);
        return e;
    },

    animate: function (defs) {
        for (var id in defs) {
            var def = defs[id];
            var entity = def.entity || this.entity;
            entity.requires('SpriteAnimation');

            // Set up reel in entity for playback
            entity.animate(id, def.spriteColRange[0], def.spriteRow, def.spriteColRange[1]);
        }
    }
});