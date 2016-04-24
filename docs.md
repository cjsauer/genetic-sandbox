---
layout: default
title: Documentation
permalink: /docs/
---

## Classes

<dl>
<dt><a href="#App">App</a></dt>
<dd><p>The entry point of the entire application. App contains references to the
grid, an array of systems, and a reference to a
<a href="http://paperjs.org">Paper</a> context.</p>
</dd>
<dt><a href="#HexGrid">HexGrid</a></dt>
<dd><p>A 2D, hexagonal grid implementation with axial coordinate system.
Implementation details can be found <a href="http://goo.gl/nLO6sN">here</a>.</p>
</dd>
<dt><a href="#Tile">Tile</a></dt>
<dd><p>A Tile is a collection of components (data) representing the state at a
specific place in a grid</p>
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
and a height.</p>
</dd>
<dt><a href="#Point">Point</a></dt>
<dd><p>A 2D point in space. Contains (x, y) coordinates.</p>
</dd>
<dt><a href="#DefaultGridRenderSystem">DefaultGridRenderSystem</a></dt>
<dd><p>The default renderer of all tiles in the grid.</p>
</dd>
<dt><a href="#ISystem">ISystem</a></dt>
<dd><p>Interface for defining new systems. A system in Genetic Sandbox is a class
containing initialize() and update() functions that operate in some way on
<a href="#Tile">Tiles</a> within the <a href="#HexGrid">HexGrid</a>.</p>
</dd>
<dt><a href="#MultiStringHashMap">MultiStringHashMap</a></dt>
<dd><p>A key/value store where keys can be a single string, or an array of strings.</p>
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
The entry point of the entire application. App contains references to the
grid, an array of systems, and a reference to a
[Paper](http://paperjs.org) context.

**Kind**: global class  
**See**

- {HexGrid}
- {ISystem}


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
| systems | <code>Array.ISystem</code> | the systems to be included in the main processing loop |
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
<a name="HexGrid"></a>

## HexGrid
A 2D, hexagonal grid implementation with axial coordinate system.
Implementation details can be found [here](http://goo.gl/nLO6sN).

**Kind**: global class  
**See**: [Tile](#Tile)  

* [HexGrid](#HexGrid)
    * [new HexGrid(radius, [defaultTileComponents])](#new_HexGrid_new)
    * [.getTile(q, r)](#HexGrid+getTile) ⇒ <code>[Tile](#Tile)</code>
    * [.getTiles()](#HexGrid+getTiles) ⇒ <code>Array.Tile</code>
    * [.getTilesByComponent(names)](#HexGrid+getTilesByComponent) ⇒ <code>Array.Tile</code>
    * [.neighborsOf(q, r)](#HexGrid+neighborsOf) ⇒ <code>Array.Tile</code>
    * [.distanceBetween(q1, r1, q2, r2)](#HexGrid+distanceBetween) ⇒ <code>number</code>

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

### hexGrid.getTile(q, r) ⇒ <code>[Tile](#Tile)</code>
Returns the Tile at axial coordinates (q, r). q can be read as "column",
and r can be read as "row".

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>[Tile](#Tile)</code> - The tile at the provided coordinates  

| Param | Type | Description |
| --- | --- | --- |
| q | <code>number</code> | q coordinate of Tile to fetch |
| r | <code>number</code> | r coordinate of Tile to fetch |

**Example**  

```js
let originTile = myGrid.getTile(0, 0);
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

### hexGrid.neighborsOf(q, r) ⇒ <code>Array.Tile</code>
Returns the Tiles that are adjacent to the Tile at the provided (q, r) coordinates.

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>Array.Tile</code> - The array of neighboring Tiles  

| Param | Type | Description |
| --- | --- | --- |
| q | <code>number</code> | q coordinate of Tile for which to fetch neighbors |
| r | <code>number</code> | r coordinate of Tile for which to fetch neighbors |

**Example**  

```js
let neighborsOfOrigin = myGrid.neighborsOf(0, 0);
neighborsOfOrigin.forEach((tile) => {
  tile.set("bordersOrigin", true);
});
```
<a name="HexGrid+distanceBetween"></a>

### hexGrid.distanceBetween(q1, r1, q2, r2) ⇒ <code>number</code>
Calculates the distance between two (q, r) coordinates in tiles

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>number</code> - The distance between the provided coordinates in tiles  

| Param | Type | Description |
| --- | --- | --- |
| q1 | <code>number</code> | q coordinate of first tile |
| r1 | <code>number</code> | r coordinate of first tile |
| q2 | <code>number</code> | q coordinate of second tile |
| r2 | <code>number</code> | r coordinate of second tile |

**Example**  

```js
let myGrid = new HexGrid(2);
let distanceFromCenterToEdge = myGrid.distanceBetween(0, 0, 2, -2); // 2
```
<a name="Tile"></a>

## Tile
A Tile is a collection of components (data) representing the state at a
specific place in a grid

**Kind**: global class  

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
    * [.onTileComponentAdded(e)](#TileComponentIndex+onTileComponentAdded)
    * [.onTileComponentDeleted(e)](#TileComponentIndex+onTileComponentDeleted)

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
<a name="TileComponentIndex+onTileComponentAdded"></a>

### tileComponentIndex.onTileComponentAdded(e)
Event handler called when a component is added to a tile to keep the
relevant indices up to date

**Kind**: instance method of <code>[TileComponentIndex](#TileComponentIndex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | the event object |
| e.tile | <code>[Tile](#Tile)</code> | the tile that is being updated |
| e.name | <code>string</code> | the name of the component that was added |

<a name="TileComponentIndex+onTileComponentDeleted"></a>

### tileComponentIndex.onTileComponentDeleted(e)
Event handler called when a name is deleted from a tile to keep the
relevant indices up to date

**Kind**: instance method of <code>[TileComponentIndex](#TileComponentIndex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | the event object |
| e.tile | <code>[Tile](#Tile)</code> | the tile that is being updated |
| e.name | <code>string</code> | the name of the component that was deleted |

<a name="Hexagon"></a>

## Hexagon ⇐ <code>[IShape](#IShape)</code>
A flat-topped, regular hexagon. Implementation details can be found
[here](http://www.redblobgames.com/grids/hexagons/).

**Kind**: global class  
**Extends:** <code>[IShape](#IShape)</code>  

* [Hexagon](#Hexagon) ⇐ <code>[IShape](#IShape)</code>
    * [new Hexagon(x, y, radius)](#new_Hexagon_new)
    * [.radius](#Hexagon+radius) : <code>number</code>
    * [.width](#Hexagon+width) ⇒ <code>number</code>
    * [.height](#Hexagon+height) ⇒ <code>number</code>
    * [.center](#IShape+center) : <code>[Point](#Point)</code>
    * [.cornerAt(i)](#Hexagon+cornerAt) ⇒ <code>[Point](#Point)</code>

<a name="new_Hexagon_new"></a>

### new Hexagon(x, y, radius)
Creates a new Hexagon given the (x, y) position and a radius


| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | x position of the hex center |
| y | <code>number</code> | y position of the hex center |
| radius | <code>number</code> | distance from the center to the corners |

**Example**  

```js
let hex = new Hexagon(0, 0, 100);
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
and a height.

**Kind**: global abstract class  

* *[IShape](#IShape)*
    * *[new IShape([x], [y])](#new_IShape_new)*
    * *[.center](#IShape+center) : <code>[Point](#Point)</code>*
    * **[.width](#IShape+width) ⇒ <code>number</code>**
    * **[.height](#IShape+height) ⇒ <code>number</code>**

<a name="new_IShape_new"></a>

### *new IShape([x], [y])*
Creates a new shape at position (x, y).
IShape should be extended and its members overridden by a concrete subclass.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [x] | <code>number</code> | <code>0</code> | The x position of the center of this shape |
| [y] | <code>number</code> | <code>0</code> | The y position of the center of this shape |

**Example**  

```js
class Circle extends IShape {
  constructor(x, y, radius) {
    super(x, y);
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
| [x] | <code>number</code> | <code>0</code> | The x coordinate |
| [y] | <code>number</code> | <code>0</code> | The y coordinate |

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
<a name="DefaultGridRenderSystem"></a>

## DefaultGridRenderSystem
The default renderer of all tiles in the grid.

**Kind**: global class  

* [DefaultGridRenderSystem](#DefaultGridRenderSystem)
    * [.initialize(app)](#DefaultGridRenderSystem+initialize)
    * [.update(app)](#DefaultGridRenderSystem+update)

<a name="DefaultGridRenderSystem+initialize"></a>

### defaultGridRenderSystem.initialize(app)
Prepares the system for rendering

**Kind**: instance method of <code>[DefaultGridRenderSystem](#DefaultGridRenderSystem)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="DefaultGridRenderSystem+update"></a>

### defaultGridRenderSystem.update(app)
Draws all tiles in the app's grid

**Kind**: instance method of <code>[DefaultGridRenderSystem](#DefaultGridRenderSystem)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="ISystem"></a>

## *ISystem*
Interface for defining new systems. A system in Genetic Sandbox is a class
containing initialize() and update() functions that operate in some way on
[Tiles](#Tile) within the [HexGrid](#HexGrid).

**Kind**: global abstract class  

* *[ISystem](#ISystem)*
    * *[new ISystem()](#new_ISystem_new)*
    * *[.initialize(app)](#ISystem+initialize)*
    * *[.update(app)](#ISystem+update)*

<a name="new_ISystem_new"></a>

### *new ISystem()*
ISystem can not be instantiated directly, but instead should be extended
and its instance methods overridden.

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

<a name="MultiStringHashMap"></a>

## MultiStringHashMap
A key/value store where keys can be a single string, or an array of strings.

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
let pepperoni = new Path.Circle(new Point(0, 0), 30);
pepperoni.style = Theme.current.pepperoniStyle;
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
