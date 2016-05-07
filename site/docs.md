---
layout: default
title: Documentation
permalink: /docs/
---

## Classes

<dl>
<dt><a href="#App">App</a></dt>
<dd><p>The entry point and hub of the entire application</p>
</dd>
<dt><a href="#Component">Component</a></dt>
<dd><p>Components are objects stored inside of <a href="#Tile">Tiles</a> that contain
arbitrary data, be it plant data, creature data, tile coordinates, etc.</p>
</dd>
<dt><a href="#Coord">Coord</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>A two dimensional coordinate of x and y</p>
</dd>
<dt><a href="#Plant">Plant</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>An edible plant containing energy</p>
</dd>
<dt><a href="#HexGrid">HexGrid</a></dt>
<dd><p>A 2D, hexagonal grid implementation with axial coordinate system.
Implementation details can be found <a href="http://goo.gl/nLO6sN">here</a>.</p>
</dd>
<dt><a href="#Tile">Tile</a></dt>
<dd><p>A Tile is a collection of named <a href="Components">Components</a> (data) representing
the state at a specific place in a grid</p>
</dd>
<dt><a href="#TileComponentIndex">TileComponentIndex</a></dt>
<dd><p>Builds an index of <a href="Tiles">Tiles</a> for fast lookup by component</p>
</dd>
<dt><a href="#Hexagon">Hexagon</a> ⇐ <code><a href="#IShape">IShape</a></code></dt>
<dd><p>A flat-topped, regular hexagon. Implementation details can be found
<a href="http://www.redblobgames.com/grids/hexagons/">here</a>.</p>
</dd>
<dt><a href="#IShape">IShape</a></dt>
<dd><p>An abstract class representing 2D geometric shapes that have a center, a width,
and a height</p>
</dd>
<dt><a href="#Point">Point</a></dt>
<dd><p>A 2D point in space. Contains (x, y) coordinates.</p>
</dd>
<dt><a href="#ISystem">ISystem</a></dt>
<dd><p>Interface for defining new systems. A system in Genetic Sandbox is a class
containing initialize() and update() functions that operate in some way on
<a href="#Tile">Tiles</a> within the <a href="#HexGrid">HexGrid</a>.</p>
</dd>
<dt><a href="#PlantGenerator">PlantGenerator</a> ⇐ <code><a href="#ISystem">ISystem</a></code></dt>
<dd><p>Generates initial plant life, placing Plant components into Tiles</p>
</dd>
<dt><a href="#BackgroundRenderer">BackgroundRenderer</a> ⇐ <code><a href="#ISystem">ISystem</a></code></dt>
<dd><p>Renders the background</p>
</dd>
<dt><a href="#GridRenderer">GridRenderer</a> ⇐ <code><a href="#ISystem">ISystem</a></code></dt>
<dd><p>Used to draw a hexagonal border around all tiles in the grid</p>
</dd>
<dt><a href="#PlantRenderer">PlantRenderer</a> ⇐ <code><a href="#ISystem">ISystem</a></code></dt>
<dd><p>Renders plants for all tiles that contain a Plant component</p>
</dd>
<dt><a href="#MultiStringHashMap">MultiStringHashMap</a></dt>
<dd><p>A key/value store where keys can be a single string, or an array of strings</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#ElementalTheme">ElementalTheme</a></dt>
<dd><p>An elemental inspired theme</p>
</dd>
<dt><a href="#Theme">Theme</a></dt>
<dd><p>The hub of all styling. Used to set the current theme, and retrieve styling
values like color, stroke thickness, etc.</p>
</dd>
</dl>

<a name="App"></a>

## App
The entry point and hub of the entire application

**Kind**: global class  
**See**

- [HexGrid](#HexGrid)
- [ISystem](#ISystem)


* [App](#App)
    * [new App(grid, systems, paperScope)](#new_App_new)
    * [.grid](#App+grid) : <code>[HexGrid](#HexGrid)</code>
    * [.systems](#App+systems) : <code>Array.ISystem</code>
    * [.paper](#App+paper) : <code>PaperScope</code>
    * [.initialize()](#App+initialize)
    * [.update()](#App+update)
    * [.run()](#App+run)
    * [.stop()](#App+stop)

<a name="new_App_new"></a>

### new App(grid, systems, paperScope)
Prepares a Genetic Sandbox application for bootstrapping.


| Param | Type | Description |
| --- | --- | --- |
| grid | <code>[HexGrid](#HexGrid)</code> | hex grid to use as the stage |
| systems | <code>[Array.&lt;ISystem&gt;](#ISystem)</code> | the systems to be included in the main processing loop |
| paperScope | <code>PaperScope</code> | Paper.js graphics context |

<a name="App+grid"></a>

### app.grid : <code>[HexGrid](#HexGrid)</code>
A grid of tiles serving as the main stage of the simulation

**Kind**: instance property of <code>[App](#App)</code>  
<a name="App+systems"></a>

### app.systems : <code>Array.ISystem</code>
Array of systems included in the main processing loop

**Kind**: instance property of <code>[App](#App)</code>  
<a name="App+paper"></a>

### app.paper : <code>PaperScope</code>
Paper.js graphics context used for rendering vector graphics to a
canvas element

**Kind**: instance property of <code>[App](#App)</code>  
<a name="App+initialize"></a>

### app.initialize()
Initializes every System in the systems array

**Kind**: instance method of <code>[App](#App)</code>  
<a name="App+update"></a>

### app.update()
Updates every System in the systems array

**Kind**: instance method of <code>[App](#App)</code>  
<a name="App+run"></a>

### app.run()
Kicks off the processing loop to continously update all systems

**Kind**: instance method of <code>[App](#App)</code>  
<a name="App+stop"></a>

### app.stop()
Stops the processing loop, essentially pausing the entire simulation

**Kind**: instance method of <code>[App](#App)</code>  
<a name="Component"></a>

## Component
Components are objects stored inside of [Tiles](#Tile) that contain
arbitrary data, be it plant data, creature data, tile coordinates, etc.

**Kind**: global class  
**See**: [Tile](#Tile)  

* [Component](#Component)
    * [new Component()](#new_Component_new)
    * _instance_
        * [.serialize([blacklist])](#Component+serialize) ⇒ <code>string</code>
    * _static_
        * [.register(ctor)](#Component.register)
        * [.restore(json)](#Component.restore) ⇒ <code>[Component](#Component)</code>

<a name="new_Component_new"></a>

### new Component()
Component isn't instantiable directly, but should be extended by a
concrete subclass.

<a name="Component+serialize"></a>

### component.serialize([blacklist]) ⇒ <code>string</code>
Serializes this component to JSON with an optional array of blacklisted
fields that will not be included in the output. This function will be
called recursively for nested component instances.

**Kind**: instance method of <code>[Component](#Component)</code>  
**Returns**: <code>string</code> - JSON string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [blacklist] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | keys in this list will be excluded from the JSON string |

**Example**  

```js
let coord = new Coord(1, 2);
coord.serialize() // '{"ctor":"Coord","data":{"x":1,"y":2}}'
coord.serialize(["y"]) // '{"ctor":"Coord","data":{"x":1}}'
```
<a name="Component.register"></a>

### Component.register(ctor)
Registers the given constructor so that it can later be properly restored
from JSON using Component.restore()

**Kind**: static method of <code>[Component](#Component)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ctor | <code>function</code> | constructor function for a subclass of Component |

<a name="Component.restore"></a>

### Component.restore(json) ⇒ <code>[Component](#Component)</code>
Restores a component object from its JSON string, obtained by originally
calling serialize() on that component. Also restores nested components.

**Kind**: static method of <code>[Component](#Component)</code>  
**Returns**: <code>[Component](#Component)</code> - the restored Component object as it existed at
its time of serialization  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>string</code> | component's JSON string |

**Example**  

```js
const coord = new Coord(5, 6);
const restored = Component.restore(coord.serialize());
coord.x === restored.x; // true
coord.y === restored.y; // true
```
<a name="Coord"></a>

## Coord ⇐ <code>[Component](#Component)</code>
A two dimensional coordinate of x and y

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  

* [Coord](#Coord) ⇐ <code>[Component](#Component)</code>
    * [new Coord([x], [y])](#new_Coord_new)
    * [.x](#Coord+x) : <code>number</code>
    * [.y](#Coord+y) : <code>number</code>
    * [.serialize([blacklist])](#Component+serialize) ⇒ <code>string</code>

<a name="new_Coord_new"></a>

### new Coord([x], [y])
Constructs a new Coord with coordinates (x,y)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [x] | <code>number</code> | <code>0</code> | x value |
| [y] | <code>number</code> | <code>0</code> | y value |

**Example**  

```js
let myCoord = new Coord(-5, 10);
myCoord.x = 0;
myCoord.y = 0;
```
<a name="Coord+x"></a>

### coord.x : <code>number</code>
x value

**Kind**: instance property of <code>[Coord](#Coord)</code>  
**Default**: <code>0</code>  
<a name="Coord+y"></a>

### coord.y : <code>number</code>
y value

**Kind**: instance property of <code>[Coord](#Coord)</code>  
**Default**: <code>0</code>  
<a name="Component+serialize"></a>

### coord.serialize([blacklist]) ⇒ <code>string</code>
Serializes this component to JSON with an optional array of blacklisted
fields that will not be included in the output. This function will be
called recursively for nested component instances.

**Kind**: instance method of <code>[Coord](#Coord)</code>  
**Returns**: <code>string</code> - JSON string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [blacklist] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | keys in this list will be excluded from the JSON string |

**Example**  

```js
let coord = new Coord(1, 2);
coord.serialize() // '{"ctor":"Coord","data":{"x":1,"y":2}}'
coord.serialize(["y"]) // '{"ctor":"Coord","data":{"x":1}}'
```
<a name="Plant"></a>

## Plant ⇐ <code>[Component](#Component)</code>
An edible plant containing energy

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  

* [Plant](#Plant) ⇐ <code>[Component](#Component)</code>
    * [new Plant([energy])](#new_Plant_new)
    * [.energy](#Plant+energy) : <code>number</code>
    * [.serialize([blacklist])](#Component+serialize) ⇒ <code>string</code>

<a name="new_Plant_new"></a>

### new Plant([energy])
Creates a new plant with the given energy amount


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [energy] | <code>number</code> | <code>0</code> | initial energy stored in this plant |

<a name="Plant+energy"></a>

### plant.energy : <code>number</code>
Energy stored in this plant

**Kind**: instance property of <code>[Plant](#Plant)</code>  
**Default**: <code>0</code>  
<a name="Component+serialize"></a>

### plant.serialize([blacklist]) ⇒ <code>string</code>
Serializes this component to JSON with an optional array of blacklisted
fields that will not be included in the output. This function will be
called recursively for nested component instances.

**Kind**: instance method of <code>[Plant](#Plant)</code>  
**Returns**: <code>string</code> - JSON string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [blacklist] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | keys in this list will be excluded from the JSON string |

**Example**  

```js
let coord = new Coord(1, 2);
coord.serialize() // '{"ctor":"Coord","data":{"x":1,"y":2}}'
coord.serialize(["y"]) // '{"ctor":"Coord","data":{"x":1}}'
```
<a name="HexGrid"></a>

## HexGrid
A 2D, hexagonal grid implementation with axial coordinate system.
Implementation details can be found [here](http://goo.gl/nLO6sN).

**Kind**: global class  
**See**

- [Tile](#Tile)
- [Coord](#Coord)


* [HexGrid](#HexGrid)
    * [new HexGrid(radius, [defaultTileComponents])](#new_HexGrid_new)
    * _instance_
        * [.getTile(coord)](#HexGrid+getTile) ⇒ <code>[Tile](#Tile)</code>
        * [.getTiles()](#HexGrid+getTiles) ⇒ <code>Array.Tile</code>
        * [.getTilesByComponent(names)](#HexGrid+getTilesByComponent) ⇒ <code>Array.Tile</code>
        * [.neighborsOf(coord)](#HexGrid+neighborsOf) ⇒ <code>Array.Tile</code>
        * [.distanceBetween(coord1, coord2)](#HexGrid+distanceBetween) ⇒ <code>number</code>
    * _static_
        * [.coordToPixel(coord, radius)](#HexGrid.coordToPixel) ⇒ <code>[Point](#Point)</code>

<a name="new_HexGrid_new"></a>

### new HexGrid(radius, [defaultTileComponents])
Constructs a new HexGrid of given radius. The pattern of tiles within the
grid will then form a hexagon itself with (0,0) being the center.
A grid of radius 0 is just a single hexagon, radius 1 is a single hexagon
surrounded by 1 layer of hexagons, and so on...


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| radius | <code>number</code> |  | Number of tiles from center of grid to the edge, not counting the center tile |
| [defaultTileComponents] | <code>Object</code> | <code>{}</code> | Default components that all Tiles will be initialized with |

**Example**  

```js
let myGrid = new HexGrid(10, {
   biome: "desert"
});
```
<a name="HexGrid+getTile"></a>

### hexGrid.getTile(coord) ⇒ <code>[Tile](#Tile)</code>
Returns the Tile at coordinates (x, y)

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>[Tile](#Tile)</code> - The tile at the provided coordinates  

| Param | Type | Description |
| --- | --- | --- |
| coord | <code>[Coord](#Coord)</code> | coordinate of tile to fetch |

**Example**  

```js
let originTile = myGrid.getTile(new Coord(0, 0));
```
<a name="HexGrid+getTiles"></a>

### hexGrid.getTiles() ⇒ <code>Array.Tile</code>
Returns an array of all tiles in the HexGrid

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>Array.Tile</code> - Array of all tiles in this HexGrid  
**Example**  

```js
let tiles = myGrid.getTiles();
tiles.forEach((tile) => {
  tile.set("temperature", 75).set("forecast", "sunny");
});
```
<a name="HexGrid+getTilesByComponent"></a>

### hexGrid.getTilesByComponent(names) ⇒ <code>Array.Tile</code>
Returns all tiles that posess the given component or components

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>Array.Tile</code> - the tiles that include all of the given
components  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>string</code> &#124; <code>Array.string</code> | the names of the components this tile must posess to be included in the result |

**Example**  

```js
// Returns all tiles that have "biome" and "temperature" components
let habitatTiles = grid.getTilesByComponent(["biome", "temperature"]);
```
<a name="HexGrid+neighborsOf"></a>

### hexGrid.neighborsOf(coord) ⇒ <code>Array.Tile</code>
Returns the Tiles that are adjacent to the Tile at the provided (x, y) coordinates.

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>Array.Tile</code> - The array of neighboring Tiles  

| Param | Type | Description |
| --- | --- | --- |
| coord | <code>[Coord](#Coord)</code> | coordinates of tile for which to calculate neighbors |

**Example**  

```js
let neighborsOfOrigin = myGrid.neighborsOf(new Coord(0, 0));
neighborsOfOrigin.forEach((tile) => {
  tile.set("bordersOrigin", true);
});
```
<a name="HexGrid+distanceBetween"></a>

### hexGrid.distanceBetween(coord1, coord2) ⇒ <code>number</code>
Calculates the distance between two (x, y) coordinates in tiles

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>number</code> - The distance between the provided coordinates in tiles  

| Param | Type | Description |
| --- | --- | --- |
| coord1 | <code>[Coord](#Coord)</code> | coordinates of first tile |
| coord2 | <code>[Coord](#Coord)</code> | coordinates of second tile |

**Example**  

```js
let myGrid = new HexGrid(2);
let distanceFromCenterToEdge = myGrid.distanceBetween(new Coord(0, 0), new Coord(2, -2)); // 2
```
<a name="HexGrid.coordToPixel"></a>

### HexGrid.coordToPixel(coord, radius) ⇒ <code>[Point](#Point)</code>
Converts a tile's coordinates to its pixel coordinates

**Kind**: static method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>[Point](#Point)</code> - pixel coordinates of center of tile  

| Param | Type | Description |
| --- | --- | --- |
| coord | <code>[Coord](#Coord)</code> | tile coordinates |
| radius | <code>number</code> | radius of hexagons (for correct spacing) |

<a name="Tile"></a>

## Tile
A Tile is a collection of named [Components](Components) (data) representing
the state at a specific place in a grid

**Kind**: global class  
**See**: [Component](#Component)  

* [Tile](#Tile)
    * [new Tile([initialComponents])](#new_Tile_new)
    * [.get(name)](#Tile+get) ⇒ <code>\*</code>
    * [.hasComponent(name)](#Tile+hasComponent) ⇒ <code>boolean</code>
    * [.set(name, component)](#Tile+set) ⇒ <code>[Tile](#Tile)</code>
    * [.delete(name)](#Tile+delete) ⇒ <code>boolean</code>
    * ["componentAdded"](#Tile+event_componentAdded)
    * ["componentDeleted"](#Tile+event_componentDeleted)

<a name="new_Tile_new"></a>

### new Tile([initialComponents])
Creates a new tile with initial components. Note that the given initial
components object will be copied *by value* into each tile. What this means
is that inner objects of the component are *not* deep copied.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [initialComponents] | <code>Object</code> | <code>{}</code> | Initial components of the Tile |

**Example**  

```js
const hotTile = new Tile({
  temperature: 110,
  biome: "desert"
  vegetation: [
    { type: "tree", edible: false },
    { type: "berries", edible: true}
  ]
});
```
<a name="Tile+get"></a>

### tile.get(name) ⇒ <code>\*</code>
Returns the specified component

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>\*</code> - component data, or undefined if component not found  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the component |

**Example**  

```js
let temperature = hotTile.get("temperature");
```
<a name="Tile+hasComponent"></a>

### tile.hasComponent(name) ⇒ <code>boolean</code>
Returns true if this Tile has the given component, false otherwise

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>boolean</code> - True if the Tile has the given component, false
otherwise  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the component to check for |

<a name="Tile+set"></a>

### tile.set(name, component) ⇒ <code>[Tile](#Tile)</code>
Sets the specified component

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>[Tile](#Tile)</code> - The Tile object  
**Emits**: <code>[componentAdded](#Tile+event_componentAdded)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the component to set |
| component | <code>\*</code> | the component data |

**Example**  

```js
hotTile.set("vegetation", [
  { type: "tree", edible: false }
]);
//Chaining
hotTile.set("one", 1).set("two", 2).set("three", 3);
```
<a name="Tile+delete"></a>

### tile.delete(name) ⇒ <code>boolean</code>
Deletes the specified component, removing it from the Tile completely

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>boolean</code> - True if an item was actually deleted, false otherwise  
**Emits**: <code>[componentDeleted](#Tile+event_componentDeleted)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the component to delete |

**Example**  

```js
let didDeleteSomething = hotTile.delete("temperature");
```
<a name="Tile+event_componentAdded"></a>

### "componentAdded"
Fired when a new component is added to a tile. It is NOT fired when
a component is solely modified.

**Kind**: event emitted by <code>[Tile](#Tile)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tile | <code>[Tile](#Tile)</code> | the tile that was modified |
| name | <code>string</code> | the name of the component that was added |

<a name="Tile+event_componentDeleted"></a>

### "componentDeleted"
Fired when a component is deleted from a tile

**Kind**: event emitted by <code>[Tile](#Tile)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tile | <code>[Tile](#Tile)</code> | the tile that was modified |
| name | <code>string</code> | name of the component that was deleted |

<a name="TileComponentIndex"></a>

## TileComponentIndex
Builds an index of [Tiles](Tiles) for fast lookup by component

**Kind**: global class  

* [TileComponentIndex](#TileComponentIndex)
    * [new TileComponentIndex(tiles)](#new_TileComponentIndex_new)
    * [.getTilesByComponent(names)](#TileComponentIndex+getTilesByComponent) ⇒ <code>Array.Tile</code>

<a name="new_TileComponentIndex_new"></a>

### new TileComponentIndex(tiles)
Creates a new TileComponentIndex with the given array of tiles.
Note: the index is built on demand. Constructing a new TileComponentIndex
does not actually build a complete index (which would be expensive),
but instead the indices are built as needed.


| Param | Type | Description |
| --- | --- | --- |
| tiles | <code>Array.Tile</code> | the array of tiles for which to build an index by tile component |

**Example**  

```js
const tiles = [
  new Tile(),
  new Tile(),
  new Tile()
];
const tileIndex = new TileComponentIndex(tileIndex);
```
<a name="TileComponentIndex+getTilesByComponent"></a>

### tileComponentIndex.getTilesByComponent(names) ⇒ <code>Array.Tile</code>
Returns all tiles that posess the given component

**Kind**: instance method of <code>[TileComponentIndex](#TileComponentIndex)</code>  
**Returns**: <code>Array.Tile</code> - the tiles that include all of the given
components  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>string</code> &#124; <code>Array.string</code> | the names of the components a Tile must posess to be included in the result |

**Example**  

```js
// Returns all tiles that have "biome" and "temperature" components
let habitatTiles = tileIndex.getTilesByComponent(["biome", "temperature"]);
```
<a name="Hexagon"></a>

## Hexagon ⇐ <code>[IShape](#IShape)</code>
A flat-topped, regular hexagon. Implementation details can be found
[here](http://www.redblobgames.com/grids/hexagons/).

**Kind**: global class  
**Extends:** <code>[IShape](#IShape)</code>  

* [Hexagon](#Hexagon) ⇐ <code>[IShape](#IShape)</code>
    * [new Hexagon(center, radius)](#new_Hexagon_new)
    * [.radius](#Hexagon+radius) : <code>number</code>
    * [.width](#Hexagon+width) ⇒ <code>number</code>
    * [.height](#Hexagon+height) ⇒ <code>number</code>
    * [.center](#IShape+center) : <code>[Point](#Point)</code>
    * [.cornerAt(i)](#Hexagon+cornerAt) ⇒ <code>[Point](#Point)</code>

<a name="new_Hexagon_new"></a>

### new Hexagon(center, radius)
Creates a new Hexagon with center at point and a given radius


| Param | Type | Description |
| --- | --- | --- |
| center | <code>[Point](#Point)</code> | center position of Hexagon |
| radius | <code>number</code> | distance from the center to the corners |

**Example**  

```js
let hex = new Hexagon(new Point(0, 0), 100);
```
<a name="Hexagon+radius"></a>

### hexagon.radius : <code>number</code>
Distance from the center to the corners

**Kind**: instance property of <code>[Hexagon](#Hexagon)</code>  
<a name="Hexagon+width"></a>

### hexagon.width ⇒ <code>number</code>
The width of the bounding box of the hexagon

**Kind**: instance property of <code>[Hexagon](#Hexagon)</code>  
**Overrides:** <code>[width](#IShape+width)</code>  
**Returns**: <code>number</code> - The width of the bounding box of the hexagon  
**Example**  

```js
let w = hex.width;
```
<a name="Hexagon+height"></a>

### hexagon.height ⇒ <code>number</code>
The height of the bounding box of the hexagon

**Kind**: instance property of <code>[Hexagon](#Hexagon)</code>  
**Overrides:** <code>[height](#IShape+height)</code>  
**Returns**: <code>number</code> - The height of the bounding box of the hexagon  
**Example**  

```js
let h = hex.height;
```
<a name="IShape+center"></a>

### hexagon.center : <code>[Point](#Point)</code>
The center position of this shape

**Kind**: instance property of <code>[Hexagon](#Hexagon)</code>  
<a name="Hexagon+cornerAt"></a>

### hexagon.cornerAt(i) ⇒ <code>[Point](#Point)</code>
Returns the position as a Point of the *ith* corner.
There are six corners on a hexagon (0-5) which are indexed in clockwise
order starting from the right-most.

**Kind**: instance method of <code>[Hexagon](#Hexagon)</code>  
**Returns**: <code>[Point](#Point)</code> - Position of ith corner  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>number</code> | Index of the corner for which to calculate the position. |

<a name="IShape"></a>

## *IShape*
An abstract class representing 2D geometric shapes that have a center, a width,
and a height

**Kind**: global abstract class  

* *[IShape](#IShape)*
    * *[new IShape([center])](#new_IShape_new)*
    * *[.center](#IShape+center) : <code>[Point](#Point)</code>*
    * **[.width](#IShape+width) ⇒ <code>number</code>**
    * **[.height](#IShape+height) ⇒ <code>number</code>**

<a name="new_IShape_new"></a>

### *new IShape([center])*
Creates a new shape at given point
IShape should be extended and its members overridden by a concrete subclass.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [center] | <code>[Point](#Point)</code> | <code>new Point(0, 0)</code> | center point of shape |

**Example**  

```js
class Circle extends IShape {
  constructor(point, radius) {
    super(point);
    this.r = radius;
  }
  get width() { return this.radius * 2; }
  get height() { return this.width; }
}
```
<a name="IShape+center"></a>

### *iShape.center : <code>[Point](#Point)</code>*
The center position of this shape

**Kind**: instance property of <code>[IShape](#IShape)</code>  
<a name="IShape+width"></a>

### **iShape.width ⇒ <code>number</code>**
The width of the bounding box containing this shape

**Kind**: instance abstract property of <code>[IShape](#IShape)</code>  
**Returns**: <code>number</code> - The width of the bounding box containing this shape  
<a name="IShape+height"></a>

### **iShape.height ⇒ <code>number</code>**
The height of the bounding box containing this shape

**Kind**: instance abstract property of <code>[IShape](#IShape)</code>  
**Returns**: <code>number</code> - The height of the bounding box containing this shape  
<a name="Point"></a>

## Point
A 2D point in space. Contains (x, y) coordinates.

**Kind**: global class  

* [Point](#Point)
    * [new Point([x], [y])](#new_Point_new)
    * [.x](#Point+x) : <code>number</code>
    * [.y](#Point+y) : <code>number</code>

<a name="new_Point_new"></a>

### new Point([x], [y])
Construct a new Point at coordinate (x,y)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [x] | <code>number</code> | <code>0</code> | x coordinate |
| [y] | <code>number</code> | <code>0</code> | y coordinate |

**Example**  

```js
let myPoint = new Point(100, 200);
myPoint.x = 0;
myPoint.y = 0;
```
<a name="Point+x"></a>

### point.x : <code>number</code>
The x coordinate of this point

**Kind**: instance property of <code>[Point](#Point)</code>  
**Default**: <code>0</code>  
<a name="Point+y"></a>

### point.y : <code>number</code>
The y coordinate of this point

**Kind**: instance property of <code>[Point](#Point)</code>  
**Default**: <code>0</code>  
<a name="ISystem"></a>

## *ISystem*
Interface for defining new systems. A system in Genetic Sandbox is a class
containing initialize() and update() functions that operate in some way on
[Tiles](#Tile) within the [HexGrid](#HexGrid).

**Kind**: global abstract class  

* *[ISystem](#ISystem)*
    * *[new ISystem(tag)](#new_ISystem_new)*
    * *[.tag](#ISystem+tag) : <code>string</code>*
    * *[.initialize(app)](#ISystem+initialize)*
    * *[.update(app)](#ISystem+update)*

<a name="new_ISystem_new"></a>

### *new ISystem(tag)*
ISystem can not be instantiated directly, but instead should be extended
and its instance methods overridden.


| Param | Type | Description |
| --- | --- | --- |
| tag | <code>string</code> | one of "renderer", "generator", or "processor" |

<a name="ISystem+tag"></a>

### *iSystem.tag : <code>string</code>*
Defines the role of this system. One of "renderer", "generator", or
"processor".

**Kind**: instance property of <code>[ISystem](#ISystem)</code>  
<a name="ISystem+initialize"></a>

### *iSystem.initialize(app)*
Initializes this system allowing it to perform one-time preparation logic

**Kind**: instance method of <code>[ISystem](#ISystem)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="ISystem+update"></a>

### *iSystem.update(app)*
Called once per tick to update the simulation

**Kind**: instance method of <code>[ISystem](#ISystem)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="PlantGenerator"></a>

## PlantGenerator ⇐ <code>[ISystem](#ISystem)</code>
Generates initial plant life, placing Plant components into Tiles

**Kind**: global class  
**Extends:** <code>[ISystem](#ISystem)</code>  
**See**: [Plant](#Plant)  

* [PlantGenerator](#PlantGenerator) ⇐ <code>[ISystem](#ISystem)</code>
    * [new PlantGenerator()](#new_PlantGenerator_new)
    * [.tag](#ISystem+tag) : <code>string</code>
    * [.initialize(app)](#PlantGenerator+initialize)
    * [.update(app)](#PlantGenerator+update)

<a name="new_PlantGenerator_new"></a>

### new PlantGenerator()
Constructs a new PlantGenerator

<a name="ISystem+tag"></a>

### plantGenerator.tag : <code>string</code>
Defines the role of this system. One of "renderer", "generator", or
"processor".

**Kind**: instance property of <code>[PlantGenerator](#PlantGenerator)</code>  
<a name="PlantGenerator+initialize"></a>

### plantGenerator.initialize(app)
Seeds the world with plants

**Kind**: instance method of <code>[PlantGenerator](#PlantGenerator)</code>  
**Overrides:** <code>[initialize](#ISystem+initialize)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="PlantGenerator+update"></a>

### plantGenerator.update(app)
A no-op for generators

**Kind**: instance method of <code>[PlantGenerator](#PlantGenerator)</code>  
**Overrides:** <code>[update](#ISystem+update)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="BackgroundRenderer"></a>

## BackgroundRenderer ⇐ <code>[ISystem](#ISystem)</code>
Renders the background

**Kind**: global class  
**Extends:** <code>[ISystem](#ISystem)</code>  

* [BackgroundRenderer](#BackgroundRenderer) ⇐ <code>[ISystem](#ISystem)</code>
    * [new BackgroundRenderer()](#new_BackgroundRenderer_new)
    * [.tag](#ISystem+tag) : <code>string</code>
    * [.initialize(app)](#BackgroundRenderer+initialize)
    * [.update(app)](#BackgroundRenderer+update)

<a name="new_BackgroundRenderer_new"></a>

### new BackgroundRenderer()
Constructs a new BackgroundRenderer

<a name="ISystem+tag"></a>

### backgroundRenderer.tag : <code>string</code>
Defines the role of this system. One of "renderer", "generator", or
"processor".

**Kind**: instance property of <code>[BackgroundRenderer](#BackgroundRenderer)</code>  
<a name="BackgroundRenderer+initialize"></a>

### backgroundRenderer.initialize(app)
Renders the background

**Kind**: instance method of <code>[BackgroundRenderer](#BackgroundRenderer)</code>  
**Overrides:** <code>[initialize](#ISystem+initialize)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="BackgroundRenderer+update"></a>

### backgroundRenderer.update(app)
Called once per tick. No-op for BackgroundRenderer.

**Kind**: instance method of <code>[BackgroundRenderer](#BackgroundRenderer)</code>  
**Overrides:** <code>[update](#ISystem+update)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="GridRenderer"></a>

## GridRenderer ⇐ <code>[ISystem](#ISystem)</code>
Used to draw a hexagonal border around all tiles in the grid

**Kind**: global class  
**Extends:** <code>[ISystem](#ISystem)</code>  

* [GridRenderer](#GridRenderer) ⇐ <code>[ISystem](#ISystem)</code>
    * [new GridRenderer()](#new_GridRenderer_new)
    * [.tag](#ISystem+tag) : <code>string</code>
    * [.initialize(app)](#GridRenderer+initialize)
    * [.update(app)](#GridRenderer+update)

<a name="new_GridRenderer_new"></a>

### new GridRenderer()
Constructs a new GridRenderer

<a name="ISystem+tag"></a>

### gridRenderer.tag : <code>string</code>
Defines the role of this system. One of "renderer", "generator", or
"processor".

**Kind**: instance property of <code>[GridRenderer](#GridRenderer)</code>  
<a name="GridRenderer+initialize"></a>

### gridRenderer.initialize(app)
Renders the grid

**Kind**: instance method of <code>[GridRenderer](#GridRenderer)</code>  
**Overrides:** <code>[initialize](#ISystem+initialize)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="GridRenderer+update"></a>

### gridRenderer.update(app)
Called once per tick. No-op for GridRenderer.

**Kind**: instance method of <code>[GridRenderer](#GridRenderer)</code>  
**Overrides:** <code>[update](#ISystem+update)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="PlantRenderer"></a>

## PlantRenderer ⇐ <code>[ISystem](#ISystem)</code>
Renders plants for all tiles that contain a Plant component

**Kind**: global class  
**Extends:** <code>[ISystem](#ISystem)</code>  

* [PlantRenderer](#PlantRenderer) ⇐ <code>[ISystem](#ISystem)</code>
    * [new PlantRenderer()](#new_PlantRenderer_new)
    * [.tag](#ISystem+tag) : <code>string</code>
    * [.initialize(app)](#PlantRenderer+initialize)
    * [.update(app)](#PlantRenderer+update)

<a name="new_PlantRenderer_new"></a>

### new PlantRenderer()
Constructs a new PlantRenderer

<a name="ISystem+tag"></a>

### plantRenderer.tag : <code>string</code>
Defines the role of this system. One of "renderer", "generator", or
"processor".

**Kind**: instance property of <code>[PlantRenderer](#PlantRenderer)</code>  
<a name="PlantRenderer+initialize"></a>

### plantRenderer.initialize(app)
Prepares the system for rendering plant graphics

**Kind**: instance method of <code>[PlantRenderer](#PlantRenderer)</code>  
**Overrides:** <code>[initialize](#ISystem+initialize)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="PlantRenderer+update"></a>

### plantRenderer.update(app)
Renders a plant graphic for every tile that contains a Plant component,
and removes plant graphics for tiles that no longer have vegetation

**Kind**: instance method of <code>[PlantRenderer](#PlantRenderer)</code>  
**Overrides:** <code>[update](#ISystem+update)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="MultiStringHashMap"></a>

## MultiStringHashMap
A key/value store where keys can be a single string, or an array of strings

**Kind**: global class  

* [MultiStringHashMap](#MultiStringHashMap)
    * [new MultiStringHashMap()](#new_MultiStringHashMap_new)
    * [.get(key)](#MultiStringHashMap+get) ⇒ <code>\*</code>
    * [.hasKey(key)](#MultiStringHashMap+hasKey) ⇒ <code>boolean</code>
    * [.keys()](#MultiStringHashMap+keys) ⇒ <code>Array</code>
    * [.set(key, value)](#MultiStringHashMap+set) ⇒
    * [.delete(key)](#MultiStringHashMap+delete) ⇒ <code>boolean</code>

<a name="new_MultiStringHashMap_new"></a>

### new MultiStringHashMap()
Constructs a new, empty MultiStringHashMap

<a name="MultiStringHashMap+get"></a>

### multiStringHashMap.get(key) ⇒ <code>\*</code>
Returns the value stored at the given key

**Kind**: instance method of <code>[MultiStringHashMap](#MultiStringHashMap)</code>  
**Returns**: <code>\*</code> - Value at the given key  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> &#124; <code>Array.string</code> | key to lookup |

**Example**  

```js
const shinyMetallicWeapons = myHash.get(["shiny", "metallic", "sharp"]);
```
<a name="MultiStringHashMap+hasKey"></a>

### multiStringHashMap.hasKey(key) ⇒ <code>boolean</code>
Returns true if the given key exists in the map, false otherwise

**Kind**: instance method of <code>[MultiStringHashMap](#MultiStringHashMap)</code>  
**Returns**: <code>boolean</code> - True if key exists, false otherwise  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> &#124; <code>Array.string</code> | key for which to check existence |

**Example**  

```js
myHash.set(["tiny", "spherical"], ["marbles", "peas"]);
myHash.hasKey(["tiny", "spherical"]); // true
```
<a name="MultiStringHashMap+keys"></a>

### multiStringHashMap.keys() ⇒ <code>Array</code>
Returns an array of all keys in the hash map

**Kind**: instance method of <code>[MultiStringHashMap](#MultiStringHashMap)</code>  
**Returns**: <code>Array</code> - the array of keys  
**Example**  

```js
const myHash = new MultiStringHashMap();
myHash.set(["one", "two", "three"], [1, 2, 3]);
myHash.set("four", 4);
let keys = myHash.keys(); // [ ["one", "two", "three"], "four" ]
```
<a name="MultiStringHashMap+set"></a>

### multiStringHashMap.set(key, value) ⇒
Sets a value at the given key, or creates and sets the value at the given
key if it does not exist

**Kind**: instance method of <code>[MultiStringHashMap](#MultiStringHashMap)</code>  
**Returns**: The MultiStringHashMap  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> &#124; <code>Array.string</code> | key to store the value at |
| value | <code>\*</code> | the value to store |

**Example**  

```js
const myHash = new MultiStringHashMap();
myHash.set(["shiny", "metallic", "sharp"], ["sword", "knife", "dagger"]);
```
<a name="MultiStringHashMap+delete"></a>

### multiStringHashMap.delete(key) ⇒ <code>boolean</code>
Deletes the given key

**Kind**: instance method of <code>[MultiStringHashMap](#MultiStringHashMap)</code>  
**Returns**: <code>boolean</code> - True if a key was actually deleted, false otherwise  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> &#124; <code>Array.string</code> | key to delete |

**Example**  

```js
let wasDeleted = myHash.delete(["no", "longer", "needed"]);
// myHash.get(["no", "longer", "needed"]) === undefined
```
<a name="ElementalTheme"></a>

## ElementalTheme
An elemental inspired theme

**Kind**: global constant  
<a name="Theme"></a>

## Theme
The hub of all styling. Used to set the current theme, and retrieve styling
values like color, stroke thickness, etc.

**Kind**: global constant  

* [Theme](#Theme)
    * [.current](#Theme.current) : <code>object</code>
    * [.setTheme(name)](#Theme.setTheme)

<a name="Theme.current"></a>

### Theme.current : <code>object</code>
The currently selected theme from which you can get styling values

**Kind**: static property of <code>[Theme](#Theme)</code>  
**Example**  

```js
let circle = new Path.Circle(new Point(0, 0), 30);
circle.style = Theme.current.backgroundStyle;
```
<a name="Theme.setTheme"></a>

### Theme.setTheme(name)
Sets the current theme

**Kind**: static method of <code>[Theme](#Theme)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the theme to use |

**Example**  

```js
Theme.setTheme("elemental");
```
