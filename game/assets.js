define(function() {
    
    return [
        {
            scenes: ["menu"],
            data: {
                "images": ["images/background.png", "images/clouds.png", "images/floor.png", "images/menu-sprites.png"]
            }
        },
        {
            scenes: ["level"],
            data: {
                "sprites": {
                    "sprites/char/lily_64.png": {
                        tile: 64,
                        tileh: 64,
                        map: {
                            lily: [0, 2]
                        }
                    },
                    "sprites/char/archie_64.png": {
                        tile: 64,
                        tileh: 64,
                        map: {
                            archie: [0, 2]
                        }
                    },
                    "sprites/tilesets/terrain.png": {
                        tile: 32,
                        tileh: 32,
                        map: {
                            bush: [11, 11]
                        }
                    }
                }
            }
        }
    ];
});