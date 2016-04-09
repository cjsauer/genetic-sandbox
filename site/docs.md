---
layout: default
title: Documentation
permalink: /docs/
---

## Classes

<dl>
<dt><a href="#App">App</a></dt>
<dd><p>The entry point of the entire application</p>
</dd>
<dt><a href="#Grid">Grid</a></dt>
<dd><p>An abstract class modeling a generic grid of <a href="#Tile">Tiles</a> that
makes up the &quot;playing surface&quot; in Genetic Sandbox.</p>
</dd>
<dt><a href="#HexGrid">HexGrid</a> ⇐ <code><a href="#Grid">Grid</a></code></dt>
<dd><p>A 2D, hexagonal grid implementation with axial coordinate system.
Implementation details can be found <a href="http://goo.gl/nLO6sN">here</a>.</p>
</dd>
<dt><a href="#Tile">Tile</a></dt>
<dd><p>A Tile is nothing more than a <a href="https://goo.gl/sOhi4X">map</a> of key/value
pairs representing the state at a discrete location within a <a href="#Grid">Grid</a>.</p>
</dd>
<dt><a href="#Hexagon">Hexagon</a> ⇐ <code><a href="#Shape">Shape</a></code></dt>
<dd><p>A flat-topped, regular hexagon. Implementation details can be found
<a href="http://www.redblobgames.com/grids/hexagons/">here</a>.</p>
</dd>
<dt><a href="#Point">Point</a></dt>
<dd><p>A 2D point in space. Contains (x, y) coordinates.</p>
</dd>
<dt><a href="#Shape">Shape</a></dt>
<dd><p>An abstract class representing 2D geometric shapes that have a center, a width,
and a height.</p>
</dd>
</dl>

<a name="App"></a>

## App
The entry point of the entire application

**Kind**: global class  
<a name="Grid"></a>

## *Grid*
An abstract class modeling a generic grid of [Tiles](#Tile) that
makes up the "playing surface" in Genetic Sandbox.

**Kind**: global abstract class  
**Summary**: Grid cannot be instantiated directly, but instead serves as an
interface for implementing new types of grids (hexagonal, cartesian, etc).
Subclasses of Grid will have to implement their own method for storing Tiles,
which will ultimately define the grid's coordinate system. For example, a 2D,
cartesian grid could be implemented using a two dimensional array of Tiles,
and then the below methods (e.g. getTile()) would be overridden to
take (x,y) as arguments.  
**See**

- [Tile](#Tile)
- HexGrid


* *[Grid](#Grid)*
    * *[new Grid()](#new_Grid_new)*
    * **[.getTile()](#Grid+getTile) ⇒ <code>[Tile](#Tile)</code>**
    * **[.getTiles()](#Grid+getTiles) ⇒ <code>Array.Tile</code>**
    * **[.neighborsOf()](#Grid+neighborsOf) ⇒ <code>Array.Tile</code>**
    * **[.distanceBetween()](#Grid+distanceBetween) ⇒ <code>number</code>**

<a name="new_Grid_new"></a>

### *new Grid()*
Grid can not be instantiated directly, but instead should be extended
by a concrete grid implementation.

**Example**  

```js
class SimpleGrid extends Grid {
  constructor() {
    super();
    this.tiles = [0, 1, 2, 3, 4, 5];
  }

  getTile(i) {
    return this.tiles[i];
  }

  neighborsOf(i) {
    return [
      this.tiles[(i - 1) % this.tiles.length],
      this.tiles[(i + 1) % this.tiles.length]
    ];
  }

  distanceBetween(i1, i2) {
    return Math.abs(i1 - i2);
  }
}
```
<a name="Grid+getTile"></a>

### **grid.getTile() ⇒ <code>[Tile](#Tile)</code>**
Returns the Tile at the provided coordinates.

**Kind**: instance abstract method of <code>[Grid](#Grid)</code>  
**Returns**: <code>[Tile](#Tile)</code> - The tile at the provided coordinates  
<a name="Grid+getTiles"></a>

### **grid.getTiles() ⇒ <code>Array.Tile</code>**
Returns an array of all tiles in the Grid

**Kind**: instance abstract method of <code>[Grid](#Grid)</code>  
**Returns**: <code>Array.Tile</code> - Array of all tiles in this Grid  
<a name="Grid+neighborsOf"></a>

### **grid.neighborsOf() ⇒ <code>Array.Tile</code>**
Returns the Tiles that are adjacent to the Tile at the provided coordinates.

**Kind**: instance abstract method of <code>[Grid](#Grid)</code>  
**Returns**: <code>Array.Tile</code> - The array of neighboring Tiles  
<a name="Grid+distanceBetween"></a>

### **grid.distanceBetween() ⇒ <code>number</code>**
Calculates the distance between two grid coordinates in tiles

**Kind**: instance abstract method of <code>[Grid](#Grid)</code>  
**Returns**: <code>number</code> - The distance between the provided coordinates in tiles  
<a name="HexGrid"></a>

## HexGrid ⇐ <code>[Grid](#Grid)</code>
A 2D, hexagonal grid implementation with axial coordinate system.
Implementation details can be found [here](http://goo.gl/nLO6sN).

**Kind**: global class  
**Extends:** <code>[Grid](#Grid)</code>  
**See**

- [Grid](#Grid)
- [Tile](#Tile)


* [HexGrid](#HexGrid) ⇐ <code>[Grid](#Grid)</code>
    * [new HexGrid(radius, [defaultTileProps])](#new_HexGrid_new)
    * [.getTile(q, r)](#HexGrid+getTile) ⇒ <code>[Tile](#Tile)</code>
    * [.getTiles()](#HexGrid+getTiles) ⇒ <code>Array.Tile</code>
    * [.neighborsOf(q, r)](#HexGrid+neighborsOf) ⇒ <code>Array.Tile</code>
    * [.distanceBetween(q1, r1, q2, r2)](#HexGrid+distanceBetween) ⇒ <code>number</code>

<a name="new_HexGrid_new"></a>

### new HexGrid(radius, [defaultTileProps])
Constructs a new HexGrid of given radius. The pattern of tiles within the
grid will then form a hexagon itself with (0,0) being the center.
A grid of radius 0 is just a single hexagon, radius 1 is a single hexagon
surrounded by 1 layer of hexagons, and so on...


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| radius | <code>number</code> |  | Number of tiles from center of grid to the edge, not counting the center tile |
| [defaultTileProps] | <code>Object</code> | <code>{}</code> | Default properties that all Tiles will be initialized with |

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
**Overrides:** <code>[getTile](#Grid+getTile)</code>  
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
Returns an array of all tiles in the Grid

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Overrides:** <code>[getTiles](#Grid+getTiles)</code>  
**Returns**: <code>Array.Tile</code> - Array of all tiles in this Grid  
**Example**  

```js
let tiles = myGrid.getTiles();
tiles.forEach((tile) => {
  tile.set("temperature", 75).set("forecast", "sunny");
});
```
<a name="HexGrid+neighborsOf"></a>

### hexGrid.neighborsOf(q, r) ⇒ <code>Array.Tile</code>
Returns the Tiles that are adjacent to the Tile at the provided (q, r) coordinates.

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Overrides:** <code>[neighborsOf](#Grid+neighborsOf)</code>  
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
**Overrides:** <code>[distanceBetween](#Grid+distanceBetween)</code>  
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
A Tile is nothing more than a [map](https://goo.gl/sOhi4X) of key/value
pairs representing the state at a discrete location within a [Grid](#Grid).

**Kind**: global class  

* [Tile](#Tile)
    * [new Tile([initialProperties])](#new_Tile_new)
    * [.get(key)](#Tile+get) ⇒ <code>\*</code>
    * [.set(key, value)](#Tile+set) ⇒ <code>[Tile](#Tile)</code>
    * [.delete(key)](#Tile+delete) ⇒ <code>Boolean</code>

<a name="new_Tile_new"></a>

### new Tile([initialProperties])
Creates a new tile with initial properties


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [initialProperties] | <code>Object</code> | <code>{}</code> | Initial properties of the Tile |

**Example**  

```js
const hotTile = new Tile({
  temperature: 110,
  biome: "desert"
});
```
<a name="Tile+get"></a>

### tile.get(key) ⇒ <code>\*</code>
Returns the specified property's value

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>\*</code> - Value of property at `key`  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>key</code> | Name of the property |

**Example**  

```js
let temperature = hotTile.get("temperature");
```
<a name="Tile+set"></a>

### tile.set(key, value) ⇒ <code>[Tile](#Tile)</code>
Sets the specified property's value, or creates and sets the property if it
does not yet exist.

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>[Tile](#Tile)</code> - The Tile object  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>key</code> | Name of the property to set/create |
| value | <code>\*</code> | Value of the property |

**Example**  

```js
hotTile.set("vegetation", ["cactus", "tumbleweed", "wildflowers"]);
//Chaining
hotTile.set("one", 1).set("two", 2).set("three", 3);
```
<a name="Tile+delete"></a>

### tile.delete(key) ⇒ <code>Boolean</code>
Deletes the specified property, removing it from the Tile completely

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>Boolean</code> - True if an item was actually deleted, false otherwise  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>key</code> | Name of the property to delete |

**Example**  

```js
let didDeleteSomething = hotTile.delete("temperature");
```
<a name="Hexagon"></a>

## Hexagon ⇐ <code>[Shape](#Shape)</code>
A flat-topped, regular hexagon. Implementation details can be found
[here](http://www.redblobgames.com/grids/hexagons/).

**Kind**: global class  
**Extends:** <code>[Shape](#Shape)</code>  

* [Hexagon](#Hexagon) ⇐ <code>[Shape](#Shape)</code>
    * [new Hexagon(x, y, radius)](#new_Hexagon_new)
    * [.radius](#Hexagon+radius) : <code>number</code>
    * [.width](#Hexagon+width) ⇒ <code>number</code>
    * [.height](#Hexagon+height) ⇒ <code>number</code>
    * [.center](#Shape+center) : <code>[Point](#Point)</code>
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
**Overrides:** <code>[width](#Shape+width)</code>  
**Returns**: <code>number</code> - The width of the bounding box of the hexagon  
**Example**  

```js
let w = hex.width;
```
<a name="Hexagon+height"></a>

### hexagon.height ⇒ <code>number</code>
The height of the bounding box of the hexagon

**Kind**: instance property of <code>[Hexagon](#Hexagon)</code>  
**Overrides:** <code>[height](#Shape+height)</code>  
**Returns**: <code>number</code> - The height of the bounding box of the hexagon  
**Example**  

```js
let h = hex.height;
```
<a name="Shape+center"></a>

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
<a name="Shape"></a>

## *Shape*
An abstract class representing 2D geometric shapes that have a center, a width,
and a height.

**Kind**: global abstract class  

* *[Shape](#Shape)*
    * *[new Shape([x], [y])](#new_Shape_new)*
    * *[.center](#Shape+center) : <code>[Point](#Point)</code>*
    * **[.width](#Shape+width) ⇒ <code>number</code>**
    * **[.height](#Shape+height) ⇒ <code>number</code>**

<a name="new_Shape_new"></a>

### *new Shape([x], [y])*
Creates a new shape at position (x, y).
Shapes cannot be instantiated directly. Instead, Shape should be extended
and its members overridden by a concrete subclass.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [x] | <code>number</code> | <code>0</code> | The x position of the center of this shape |
| [y] | <code>number</code> | <code>0</code> | The y position of the center of this shape |

**Example**  

```js
class Circle extends Shape {
  constructor(x, y, radius) {
    super(x, y);
    this.r = radius;
  }
  get width() { return this.radius * 2; }
  get height() { return this.width; }
}
```
<a name="Shape+center"></a>

### *shape.center : <code>[Point](#Point)</code>*
The center position of this shape

**Kind**: instance property of <code>[Shape](#Shape)</code>  
<a name="Shape+width"></a>

### **shape.width ⇒ <code>number</code>**
The width of the bounding box containing this shape

**Kind**: instance abstract property of <code>[Shape](#Shape)</code>  
**Returns**: <code>number</code> - The width of the bounding box containing this shape  
<a name="Shape+height"></a>

### **shape.height ⇒ <code>number</code>**
The height of the bounding box containing this shape

**Kind**: instance abstract property of <code>[Shape](#Shape)</code>  
**Returns**: <code>number</code> - The height of the bounding box containing this shape  
