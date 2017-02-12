define([
        'game/map/level1'
    ], function(levelData) {
    return [
    {
        id: 1,
        name: levelData.name,
        data: levelData.data
    }];
});