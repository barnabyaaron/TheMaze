define([
        'underscore',
        'game/keyboard',
        'store'
    ],
    function(_, keyboard, store) {
        if (_.isUndefined(store.get('keybinds'))) {
            store.set("keybinds", keyboard.keybinds.AZERTY);
        }

        return {};
    });