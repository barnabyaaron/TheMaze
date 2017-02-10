Class.subclass('Assets',
{
    init: function() {
        // Nothing to do here.
    }
});

Assets.FILES = {
    "sprites": {
        "assets/images/ground/dirt.png": {
            tile: 32,
            tileh: 32,
            map: {
                dirt1: [1, 3],
                dirt2: [0, 5],
                dirt3: [1, 5],
                dirt4: [2, 5],
                dirt_overlay1: [0, 0],
                dirt_overlay2: [0, 1]
            }
        },
        "assets/images/ground/grass.png": {
            tile: 32,
            tileh: 32,
            map: {
                grass1: [1, 3],
                grass2: [0, 5],
                grass3: [1, 5],
                grass4: [2, 5],
                grass_overlay1: [0, 0],
                grass_overlay2: [0, 1]
            }
        },
        "assets/images/ground/sand.png": {
            tile: 32,
            tileh: 32,
            map: {
                sand1: [1, 3],
                sand2: [0, 5],
                sand3: [1, 5],
                sand4: [2, 5],
                sand_overlay1: [0, 0],
                sand_overlay2: [0, 1]
            }
        },
        "assets/images/ground/lavarock.png": {
            tile: 32,
            tileh: 32,
            map: {
                lavarock1: [1, 3],
                lavarock2: [0, 5],
                lavarock3: [1, 5],
                lavarock4: [2, 5],
                lavarock_overlay1: [0, 0],
                lavarock_overlay2: [0, 1]
            }
        },
        "assets/images/ground/water.png": {
            tile: 32,
            tileh: 32,
            map: {
                water_top_left: [0, 2],
                water_center_left: [0, 3],
                water_bottom_left: [0, 4],
                water_top_center: [1, 2],
                water_center_center: [1, 3],
                water_bottom_center: [1, 4],
                water_top_right: [2, 2],
                water_center_right: [2, 3],
                water_bottom_right: [2, 4],
                water_inset_bottom_right: [1, 0],
                water_inset_top_right: [1, 1],
                water_center_center_2: [0, 5],
                water_center_center_3: [1, 5],
                water_center_center_4: [2, 5],
                water_hole1: [0, 0],
                water_hold2: [0, 1]
            }
        },
        "assets/images/ground/lava.png": {
            tile: 32,
            tileh: 32,
            map: {
                lava_top_left: [0, 2],
                lava_center_left: [0, 3],
                lava_bottom_left: [0, 4],
                lava_top_center: [1, 2],
                lava_center_center: [1, 3],
                lava_bottom_center: [1, 4],
                lava_top_right: [2, 2],
                lava_center_right: [2, 3],
                lava_bottom_right: [2, 4],
                lava_inset_bottom_right: [1, 0],
                lava_inset_top_right: [1, 1],
                lava_center_center_2: [0, 5],
                lava_center_center_3: [1, 5],
                lava_center_center_4: [2, 5],
                lava_hole1: [0, 0],
                lava_hold2: [0, 1]
            }
        },
        "assets/images/char/lily_64.png": {
            tile: 64,
            tileh: 64,
            map: {
                lily: [0, 0]
            }
        },
        "assets/images/char/archie_64.png": {
            tile: 64,
            tileh: 64,
            map: {
                archie: [0, 0]
            }
        }
    }
};