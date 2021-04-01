import {Record, List, Map, fromJS} from 'immutable';
import {MODE_IDLE} from './constants';
import {SNAP_MASK} from './utils/snap';

let safeLoadMapList = (mapList, Model, defaultMap) => {
  return mapList
    ? new Map(mapList).map(m => new Model(m)).toMap()
    : (defaultMap || new Map());
};


export class Grid extends Record({
  id: '',
  type: '',
  properties: Map()
}, 'Grid') {
  constructor(json = {}) {
    super({
      ...json,
      properties: fromJS(json.properties || {})
    });
  }
}

export const DefaultGrids = new Map({
  'h1': new Grid({
    id: 'h1',
    type: 'horizontal-streak',
    properties: {
      step: 20,
      colors: ['#808080', '#ddd', '#ddd', '#ddd', '#ddd']
    }
  }),
  'v1': new Grid({
    id: 'v1',
    type: 'vertical-streak',
    properties: {
      step: 20,
      colors: ['#808080', '#ddd', '#ddd', '#ddd', '#ddd']
    }
  })
});


export class ElementsSet extends Record({
  vertices: new List(),
  lines: new List(),
  holes: new List(),
  areas: new List(),
  items: new List(),
}, 'ElementsSet') {
  constructor(json = {}) {
    super({
      vertices: new List(json.vertices || []),
      lines: new List(json.lines || []),
      holes: new List(json.holes || []),
      areas: new List(json.areas || []),
      items: new List(json.items || [])
    });
  }
}

const sharedAttributes =
{
  id: '',
  type: '',
  prototype: '',
  name: '',
  misc: new Map(),
  selected: false,
  properties: new Map(),
  visible: true
};

export class Vertex extends Record({
  ...sharedAttributes,
  x: -1,
  y: -1,
  prototype: 'vertices',
  lines: new List(),
  areas: new List()
}, 'Vertex') {
  constructor(json = {}) {
    super({
      ...json,
      lines: new List(json.lines || []),
      areas: new List(json.areas || [])
    });
  }
}

export class Line extends Record({
  ...sharedAttributes,
  prototype: 'lines',
  vertices: new List(),
  holes: new List()
}, 'Line') {
  constructor(json = {}) {
    super({
      ...json,
      properties: fromJS(json.properties || {}),
      vertices: new List(json.vertices || []),
      holes: new List(json.holes || []),
    });
  }
}

export class Hole extends Record({
  ...sharedAttributes,
  prototype: 'holes',
  offset: -1,
  line: ''
}, 'Hole') {
  constructor(json = {}) {
    super({
      ...json,
      properties: fromJS(json.properties || {})
    });
  }
}

export class Area extends Record({
  ...sharedAttributes,
  prototype: 'areas',
  vertices: new List(),
  holes: new List()
}, 'Area') {
  constructor(json = {}) {
    super({
      ...json,
      properties: fromJS(json.properties || {}),
      vertices: new List(json.vertices || [])
    });
  }
}

export class Item extends Record({
  ...sharedAttributes,
  prototype: 'items',
  x: 0,
  y: 0,
  rotation: 0
}, 'Item') {
  constructor(json = {}) {
    super({
      ...json,
      properties: fromJS(json.properties || {})
    });
  }
}

export class Layer extends Record({
  id: '',
  altitude: 0,
  order: 0,
  opacity: 1,
  name: '',
  visible: true,
  vertices: new Map(),
  lines: new Map(),
  holes: new Map(),
  areas: new Map(),
  items: new Map(),
  selected: new ElementsSet(),
}, 'Layer') {
  constructor(json = {}) {
    super({
      ...json,
      vertices: safeLoadMapList(json.vertices, Vertex),
      lines: safeLoadMapList(json.lines, Line),
      holes: safeLoadMapList(json.holes, Hole),
      areas: safeLoadMapList(json.areas, Area),
      items: safeLoadMapList(json.items, Item),
      selected: new ElementsSet(json.selected)
    });
  }
}

export class Group extends Record({
  ...sharedAttributes,
  prototype: 'groups',
  x: 0,
  y: 0,
  rotation: 0,
  elements: new Map()
}, 'Group') {
  constructor(json = {}) {
    super({
      ...json,
      properties: fromJS(json.properties || {}),
      elements: fromJS(json.elements || {})
    });
  }
}


export const DefaultLayers = new Map({
  'layer-1': new Layer({
    "id":"layer-1",
    "altitude":0,
    "order":0,
    "opacity":1,
    "name":"default",
    "visible":true,
    "vertices":{
      "GCOtiQAEEg":{
        "id":"GCOtiQAEEg",
        "type":"",
        "prototype":"vertices",
        "name":"Vertex",
        "misc":{},
        "selected":false,
        "properties":{},
        "visible":true,
        "x":402.0996994708357,
        "y":1588.9729746481496,
        "lines":["HsTNbdaKi","30El3O4kBY"],
        "areas":[]
      },
      "jk2ezSwhUg":{
        "id":"jk2ezSwhUg",
        "type":"","prototype":"vertices","name":"Vertex","misc":{},
        "selected":false,"properties":{},"visible":true,"x":2594.23216890789,"y":1588.9729746481496,
        "lines":["HsTNbdaKi","hbT3tQx-ur"],"areas":[]
      },
      "RzXDQxdR9y":{
        "id":"RzXDQxdR9y","type":"","prototype":"vertices","name":"Vertex","misc":{},"selected":false,"properties":{},
        "visible":true,"x":2594.23216890789,"y":411.313547174972,
        "lines":["hbT3tQx-ur","7tON3TkCb"],"areas":[]
      },
      "ag8MY38tMJ":{
        "id":"ag8MY38tMJ","type":"","prototype":"vertices","name":"Vertex","misc":{},"selected":false,"properties":{},
        "visible":true,"x":402.0996994708357,"y":411.313547174972,
        "lines":["7tON3TkCb","30El3O4kBY"],"areas":[]
      }
    },
    "lines":{
      "HsTNbdaKi":{
        "id":"HsTNbdaKi","type":"wall","prototype":"lines","name":"Wall","misc":{},"selected":false,
        "properties":{
          "height":{"length":300},
          "thickness":{"length":20},
          "textureA":"bricks",
          "textureB":"bricks"
        },
        "visible":true,
        "vertices":["GCOtiQAEEg","jk2ezSwhUg"],
        "holes":[]
      },
      "hbT3tQx-ur":{
        "id":"hbT3tQx-ur","type":"wall","prototype":"lines","name":"Wall","misc":{},"selected":false,
        "properties":{"height":{"length":300},"thickness":{"length":20},"textureA":"bricks","textureB":"bricks"},
        "visible":true,
        "vertices":["RzXDQxdR9y","jk2ezSwhUg"],
        "holes":[]
      },
      "7tON3TkCb":{
        "id":"7tON3TkCb","type":"wall","prototype":"lines","name":"Wall","misc":{},"selected":false,
        "properties":{"height":{"length":300},"thickness":{"length":20},"textureA":"bricks","textureB":"bricks"},
        "visible":true,"vertices":["ag8MY38tMJ","RzXDQxdR9y"],"holes":[]
      },
      "30El3O4kBY":{
        "id":"30El3O4kBY","type":"wall","prototype":"lines","name":"Wall","misc":{},"selected":false,
        "properties":{"height":{"length":300},"thickness":{"length":20},"textureA":"bricks","textureB":"bricks"},
        "visible":true,"vertices":["ag8MY38tMJ","GCOtiQAEEg"],"holes":[]}
      },
      "holes":{},
      "areas":{
        "AJucasYz9y":{
          "id":"AJucasYz9y",
          "type":"area",
          "prototype":"areas",
          "name":"Area",
          "misc":{},
          "selected":false,
          "properties":{
            "patternColor":"#F5F4F4",
            "thickness":{"length":0},
            "texture":"none"
          },
          "visible":true,
          "vertices":["GCOtiQAEEg","ag8MY38tMJ","RzXDQxdR9y","jk2ezSwhUg"],
          "holes":[]
        }
      },
      "items":{},
      "selected":{
        "vertices":[],"lines":[],"holes":[],"areas":[],"items":[]
      }
    })
});


export class Scene extends Record({
  unit: 'cm',
  layers: new Map(),
  grids: new Map(),
  selectedLayer: null,
  groups: new Map(),
  width: 3000,
  height: 2000,
  meta: new Map(),   //additional info
  guides: new Map()
}, 'Scene') {
  constructor(json = {}) {
    let layers = safeLoadMapList(json.layers, Layer, DefaultLayers);
    super({
      ...json,
      grids: safeLoadMapList(json.grids, Grid, DefaultGrids),
      layers,
      selectedLayer: layers.first().id,
      groups: safeLoadMapList(json.groups || {}, Group),
      meta: json.meta ? fromJS(json.meta) : new Map(),
      guides: json.guides ? fromJS(json.guides) : new Map({ horizontal: new Map(), vertical: new Map(), circular: new Map() })
    });
  }
}

export class CatalogElement extends Record({
  name: '',
  prototype: '',
  info: new Map(),
  properties: new Map(),
}, 'CatalogElement') {
  constructor(json = {}) {
    super({
      ...json,
      info: fromJS(json.info),
      properties: fromJS(json.properties)
    });
  }
}

export class Catalog extends Record({
  ready: false,
  page: 'root',
  path: new List(),
  elements: new Map(),
}, 'Catalog') {
  constructor(json = {}) {
    let elements = safeLoadMapList(json.elements, CatalogElement);
    super({
      elements,
      ready: !elements.isEmpty()
    });
  }

  factoryElement(type, options, initialProperties) {
    if (!this.elements.has(type)) {
      let catList = this.elements.map(element => element.name).toArray();
      throw new Error(`Element ${type} does not exist in catalog ${catList}`);
    }

    let element = this.elements.get(type);
    let properties = element.properties.map((value, key) => initialProperties && initialProperties.has(key) ? initialProperties.get(key) : value.get('defaultValue'));

    switch (element.prototype) {
      case 'lines':
        return new Line(options).merge({properties});

      case 'holes':
        return new Hole(options).merge({properties});

      case 'areas':
        return new Area(options).merge({properties});

      case 'items':
        return new Item(options).merge({properties});

      default:
        throw new Error('prototype not valid');
    }
  }
}

export class HistoryStructure extends Record({
  list: new List(),
  first: null,
  last: null
}, 'HistoryStructure' ){
  constructor( json = {} ){
    super({
      list: fromJS( json.list || [] ),
      first: new Scene( json.scene ),
      last: new Scene( json.last || json.scene )
    });
  }
}

export class State extends Record({
  mode: MODE_IDLE,
  scene: new Scene(),
  sceneHistory: new HistoryStructure(),
  catalog: new Catalog(),
  viewer2D: new Map(),
  mouse: new Map({x: 0, y: 0}),
  zoom: 0,
  snapMask: SNAP_MASK,
  snapElements: new List(),
  activeSnapElement: null,
  drawingSupport: new Map(),
  draggingSupport: new Map(),
  rotatingSupport: new Map(),
  errors: new List(),
  warnings: new List(),
  clipboardProperties: new Map(),
  selectedElementsHistory: new List(),
  misc: new Map(),   //additional info
  alterate: false,
  toolBarSelected: 1
}, 'State') {
  constructor(json = {}) {
    super({
      ...json,
      scene: new Scene(json.scene),
      sceneHistory: new HistoryStructure(json),
      catalog: new Catalog(json.catalog || {}),
      viewer2D: new Map(json.viewer2D || {}),
      drawingSupport: new Map(json.drawingSupport || {}),
      draggingSupport: new Map(json.draggingSupport || {}),
      rotatingSupport: new Map(json.rotatingSupport || {}),
      misc: json.misc ? fromJS(json.misc) : new Map()
    });
  }
}



