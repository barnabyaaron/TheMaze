define([
        'crafty'
    ],
    function(Crafty) {

        Crafty.c("TiledMapBuilder",
        {
            tileMapBuilderSetting: {
                USE_WEB_WORKERS: false,
                PATH_TO_WORKER_SCRIPT: 'lib/mock_module.js',
                RENDER_METHOD_CANVAS: 'Canvas',
                RENDER_METHOD_DOM: 'DOM'
            },

            _renderMethod: null,
            _isometric: null,
            _layers: null,
            _callback: null,

            init: function() {
                this._renderMethod = this.has(this.tileMapBuilderSetting.RENDER_METHOD_CANVAS)
                    ? this.tileMapBuilderSetting.RENDER_METHOD_CANVAS
                    : this.tileMapBuilderSetting.RENDER_METHOD_DOM;

                return this;
            },

            setMapDataSource: function(source) {
                if (!this.isValid(source)) {
                    throw new Error("Source is not valid.");
                }

                this._source = source;

                if (this.isIsometric()) {
                    this.setIsometric(source);
                }

                this.createTiles(source);

                return this;
            },

            createWorld: function(callback) {
                return this.createView(0, 0, this._source.width, this._source.height, callback);
            },

            createView: function(startRow, startColumn, viewWidth, viewHeight, callback) {
                this._callback = callback;

                if (this.tileMapBuilderSetting.USE_WEB_WORKERS && typeof (Worker) !== "undefined") {
                    this.doInBackground({
                        startRow: startRow,
                        startColumn: startColumn,
                        viewWidth: viewWidth,
                        viewHeight: viewHeight,
                        renderMethod: this._renderMethod,
                        source: this._source
                    });
                } else {
                    MockModule.init(startRow, startColumn, viewWidth, viewHeight, this._renderMethod, this._source);
                    this._layers = this.createEntitiesFromMock(MockModule.createMockEntities());
                    this.fireCallback();
                }
            },

            lazyLoadingForEntity: function(entity) {
                throw new Error("Not Supported Exception");
            },

            getEntitiesInLayer: function(layerName) {
                if (!this.isLayer(layerName)) {
                    return null;
                }

                var entities = [];
                for (var idx = 0; idx < this._layers[layerName].length; idx++) {
                    if (this._layers[layerName][idx] != 0) {
                        entities.push(this._layers[layerName][idx]);
                    }
                }

                return entities;
            },

            getTile: function(row, column, layerName) {
                if (!this.isLayer(layerName)) {
                    return null;
                }

                return this._layers[layerName][MockModule
                    .getTileIndex(row, column, this.getLayerFromSource(layerName))];
            },

            getLayers: function() {
                return this._layers;
            },

            getRenderMethod: function() {
                return this._renderMethod;
            },

            getSource: function() {
                return this._source;
            },

            getIsometric: function() {
                return this._isometric;
            },

            isIsometric: function() {
                return this._source.orientation == MockModule.settings.ISOMETRIC_DIAMOND ||
                    this._source.orientation == MockModule.settings.ISOMETRIC_STAGGERED;
            },

            getOrientation: function() {
                return this._source.orientation;
            },

            isValid: function(source) {
                var isValid = true;

                if (!source ||
                    !(source.width && source.height) ||
                    !(source.layers && source.layers.length >= 1) ||
                    !(source.tilesets && source.tilesets.length >= 1)) {
                    isValid = false;
                }

                return isValid;
            },

            createTiles: function(source) {
                for (var idx = 0; idx < source.tilesets.length; idx++) {
                    this.createSprite(source.tilesets[idx]);
                }
            },

            createSprite: function(tileset) {
                return Crafty.sprite(tileset.tilewidth,
                    tileset.tileheight,
                    tileset.image,
                    this.arrangeTiles(tileset),
                    tileset.margin,
                    tileset.margin);
            },

            arrangeTiles: function(tileset) {
                var numberOfColumns = Math.round(tileset.imagewidth / (tileset.tilewidth + tileset.margin));
                var numberOfRows = Math.round(tileset.imageheight / (tileset.tileheight + tileset.margin));

                var tilesMap = {};
                for (var row = 0; row < numberOfRows; row++) {
                    for (var column = 0; column < numberOfColumns; column++) {
                        var name = "Tile" + ((parseInt(tileset.firstgid) + column) + (numberOfColumns * row));
                        tilesMap[name] = [column, row];
                    };
                }

                return tilesMap;
            },

            setIsometric: function(souce) {
                this._isometric = Crafty.isometric.size(source.tilewidth, source.tileheight);
            },

            createEntitiesFromMock: function(mockEntities) {
                var layers = {};

                var isIsometric = this.isIsometric();
                var isometric = this.getIsometric();

                for (var layer in mockEntities) {
                    layers[layer] = [];
                    for (var idx = 0; idx < mockEntities[layer].length; idx++) {
                        var mockEntity = mockEntities[layer][idx];
                        if (mockEntity == 0) {
                            layers[layer].push(0);
                        } else if (mockEntity.type == 'Tile') {
                            var entity = Crafty.e(mockEntity.head).attr({
                                x: mockEntity.x,
                                y: mockEntity.y,
                                properties: mockEntity.properties
                            }).setName('Tile_' + mockEntity.x + "_" + mockEntity.y);

                            if (isIsometric) {
                                isometric.place(entity.x, entity.y, 0, entity);
                            }

                            this.attach(entity);
                            layers[layer].push(entity);
                        } else if (mockEntity.type == 'Object') {
                            var entity = Crafty.e(mockEntity.head).attr({
                                x: mockEntity.x,
                                y: mockEntity.y,
                                w: mockEntity.width,
                                h: mockEntity.height,
                                properties: mockEntity.properties
                            }).setName('MapObject_' + mockEntity.x + "_" + mockEntity.y);

                            if (mockEntity.ellipse) {
                                entity.addComponent('Collision');
                                var radius = Math.min(mockEntity.width, mockEntity.height) / 2;
                                var circle = new Crafty.circle(
                                    radius,
                                    radius,
                                    radius);
                                entity.collision(circle);
                            } else if (mockEntity.polygon) {
                                entity.addComponent('Collision');
                                var points = mockEntity.polygon.map(function(point) {
                                    return [point.x, point.y];
                                });
                                entity.collision.apply(entity, points);
                            } else if (mockEntity.gid) {
                                entity.addComponent('Tile' + mockEntity.gid);
                                entity.addComponent(this._renderMethod);
                                entity.y = entity.y - entity.h;
                                entity.visible = true;
                            } else if (mockEntity.polyline) {
                                console.log("Lines aren't currently supported well by Crafty.");
                            }

                            this.attach(entity);
                            layers[layer].push(entity);
                        }
                    }
                }

                return layers;
            },

            isLayer: function(layerName) {
                return this._layers[layerName] ? true : false;
            },

            getLayerFromSource: function(layerName) {
                for (var idx = 0; idx < this._source.layers.length; idx++) {
                    if (this._source.layers[idx].name == layerName) {
                        return this._source.layers[idx];
                        break;
                    }
                }
                return null;
            },

            doInBackground: function(data) {
                var self = this;
                var worker = new Worker(this.tileMapBuilderSetting.PATH_TO_WORKER_SCRIPT);
                worker.postMessage(data);
                worker.onmessage = function (e) {
                    self._layers = self.createEntitiesFromMock(e.data);
                    self.fireCallback();
                };

                worker.onerror = function (error) {
                    throw error;
                };
            },

            fireCallback: function() {
                if (typeof this._callback != 'undefined') {
                    this._callback.call(this, this);
                }
            }

        });

    });