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
<dt><a href="#Sequencer">Sequencer</a></dt>
<dd><p>Reads in a <a href="#Strand">Strand</a> and produces a
<a href="http://synaptic.juancazala.com/#/">Synaptic neural network</a></p>
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
<dt><a href="#Component">Component</a></dt>
<dd><p>Components are objects stored inside of <a href="#Tile">Tiles</a> that contain
arbitrary data, be it plant data, creature data, tile coordinates, etc.</p>
</dd>
<dt><a href="#Plugin">Plugin</a></dt>
<dd><p>A toggleable plugin containing an array of <a href="#System">Systems</a> and
configuration options</p>
</dd>
<dt><a href="#System">System</a></dt>
<dd><p>Interface for defining new systems. A system in Genetic Sandbox is a class
containing logic that operates in some way on <a href="#Tile">Tiles</a> within the
<a href="#HexGrid">HexGrid</a>.</p>
</dd>
<dt><a href="#Brain">Brain</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>A neural network that receives sense input from the environment and produces
actions on the behalf of a creature</p>
</dd>
<dt><a href="#Coord">Coord</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>A two dimensional coordinate of x and y</p>
</dd>
<dt><a href="#ConnectionGene">ConnectionGene</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>Genetic representation of a connection between two neurons in a neural
network</p>
</dd>
<dt><a href="#DNA">DNA</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>Genetic encoding of a creature heavily inspired by the
<a href="http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf">NEAT algorithm</a></p>
</dd>
<dt><a href="#NodeGene">NodeGene</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>Genetic representation of a neuron in a neural network</p>
</dd>
<dt><a href="#Strand">Strand</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>Genetic representation of a neural network</p>
</dd>
<dt><a href="#BackgroundRenderer">BackgroundRenderer</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Renders the background</p>
</dd>
<dt><a href="#GridRenderer">GridRenderer</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Renders a hexagonal border around all tiles in the grid</p>
</dd>
<dt><a href="#Plant">Plant</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>An edible plant containing energy</p>
</dd>
<dt><a href="#PlantGenerator">PlantGenerator</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Generates initial plant life, placing Plant components into Tiles</p>
</dd>
<dt><a href="#PlantRenderer">PlantRenderer</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Renders plants for all tiles that contain a Plant component</p>
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
and a height</p>
</dd>
<dt><a href="#MultiStringHashMap">MultiStringHashMap</a></dt>
<dd><p>A key/value store where keys can be a single string, or an array of strings</p>
</dd>
<dt><a href="#Serializable">Serializable</a></dt>
<dd><p>An interface for recursively serializing and deserializing objects to and from
JSON.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#config">config</a> : <code>Object</code></dt>
<dd><p>An aggregation of all plugin configuration options, and the main interface
for tweaking them.</p>
</dd>
<dt><a href="#core">core</a> : <code>Object</code></dt>
<dd><p>Core configuration options</p>
</dd>
<dt><a href="#plants">plants</a> : <code>Object</code></dt>
<dd><p>Plant configuration options</p>
</dd>
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
- [Plugin](#Plugin)


* [App](#App)
    * [new App(grid, plugins, paperScope, [seed])](#new_App_new)
    * [.grid](#App+grid) : <code>[HexGrid](#HexGrid)</code>
    * [.plugins](#App+plugins) : <code>[Array.&lt;Plugin&gt;](#Plugin)</code>
    * [.paper](#App+paper) : <code>PaperScope</code>
    * [.random](#App+random)
    * [.initialize()](#App+initialize)
    * [.tick()](#App+tick)
    * [.run()](#App+run)
    * [.stop()](#App+stop)

<a name="new_App_new"></a>

### new App(grid, plugins, paperScope, [seed])
Prepares a Genetic Sandbox application for bootstrapping.


| Param | Type | Description |
| --- | --- | --- |
| grid | <code>[HexGrid](#HexGrid)</code> | hex grid to use as the stage |
| plugins | <code>[Array.&lt;Plugin&gt;](#Plugin)</code> | the plugins to be included in the main processing loop |
| paperScope | <code>PaperScope</code> | Paper.js graphics context |
| [seed] | <code>number</code> | the seed for the random number generator |

<a name="App+grid"></a>

### app.grid : <code>[HexGrid](#HexGrid)</code>
A grid of tiles serving as the main stage of the simulation

**Kind**: instance property of <code>[App](#App)</code>  
<a name="App+plugins"></a>

### app.plugins : <code>[Array.&lt;Plugin&gt;](#Plugin)</code>
Array of plugins included in the main processing loop

**Kind**: instance property of <code>[App](#App)</code>  
<a name="App+paper"></a>

### app.paper : <code>PaperScope</code>
Paper.js graphics context used for rendering vector graphics to a
canvas element

**Kind**: instance property of <code>[App](#App)</code>  
<a name="App+random"></a>

### app.random
An seeded instance of the random-js Mersenne Twister engine for
generating random numbers

**Kind**: instance property of <code>[App](#App)</code>  
<a name="App+initialize"></a>

### app.initialize()
Initializes all enabled plugins by calling *reserve()* and *initialize()*
on their constituent systems

**Kind**: instance method of <code>[App](#App)</code>  
<a name="App+tick"></a>

### app.tick()
Ticks the simulation forward by one full iteration

**Kind**: instance method of <code>[App](#App)</code>  
<a name="App+run"></a>

### app.run()
Kicks off the processing loop to continously update all systems

**Kind**: instance method of <code>[App](#App)</code>  
<a name="App+stop"></a>

### app.stop()
Stops the processing loop, essentially pausing the entire simulation

**Kind**: instance method of <code>[App](#App)</code>  
<a name="Sequencer"></a>

## Sequencer
Reads in a [Strand](#Strand) and produces a
[Synaptic neural network](http://synaptic.juancazala.com/#/)

**Kind**: global class  
**See**: [Strand](#Strand)  
<a name="Sequencer+read"></a>

### sequencer.read(strand) ⇒ <code>Network</code>
Reads in a Strand and outputs a Synaptic neural network

**Kind**: instance method of <code>[Sequencer](#Sequencer)</code>  
**Returns**: <code>Network</code> - a Synaptic Network instance  

| Param | Type | Description |
| --- | --- | --- |
| strand | <code>[Strand](#Strand)</code> | strand of node and connection genes |

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
<a name="Component"></a>

## Component
Components are objects stored inside of [Tiles](#Tile) that contain
arbitrary data, be it plant data, creature data, tile coordinates, etc.

**Kind**: global class  
**See**: [Tile](#Tile)  
<a name="new_Component_new"></a>

### new Component()
Component isn't instantiable directly, but should be extended by a
concrete subclass.

<a name="Plugin"></a>

## Plugin
A toggleable plugin containing an array of [Systems](#System) and
configuration options

**Kind**: global class  

* [Plugin](#Plugin)
    * [new Plugin(name, systems, config, [enabled])](#new_Plugin_new)
    * [.name](#Plugin+name) : <code>string</code>
    * [.systems](#Plugin+systems) : <code>[Array.&lt;System&gt;](#System)</code>
    * [.config](#Plugin+config) : <code>Object</code>
    * [.enabled](#Plugin+enabled) : <code>boolean</code>

<a name="new_Plugin_new"></a>

### new Plugin(name, systems, config, [enabled])
Constructs a new plugin


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | name of the plugin |
| systems | <code>[Array.&lt;System&gt;](#System)</code> |  | the systems that this plugin includes |
| config | <code>Object</code> |  | configuration options that this plugin exposes |
| [enabled] | <code>boolean</code> | <code>true</code> | whether this plugin is enabled or not |

**Example**  

```js
import MySystem from "./systems/MySystem";
import MyOtherSystem from "./systems/MyOtherSystem";
const systems = [ new MySystem(), new MyOtherSystem() ];
const config = { someSetting: 10 };
const myPlugin = new Plugin("mine", systems, config);

// Assuming myPlugin is registered in `config.js`, in some other file
// we can do:
import config from "../config";
config.mine.someSetting = 12; // someSetting has been exposed via config global
```
<a name="Plugin+name"></a>

### plugin.name : <code>string</code>
Name of the plugin

**Kind**: instance property of <code>[Plugin](#Plugin)</code>  
<a name="Plugin+systems"></a>

### plugin.systems : <code>[Array.&lt;System&gt;](#System)</code>
The array of systems that this plugin includes

**Kind**: instance property of <code>[Plugin](#Plugin)</code>  
<a name="Plugin+config"></a>

### plugin.config : <code>Object</code>
The configuration options that this plugin exposes

**Kind**: instance property of <code>[Plugin](#Plugin)</code>  
<a name="Plugin+enabled"></a>

### plugin.enabled : <code>boolean</code>
True if this plugin is enabled, false otherwise. A disabled plugin
will be excluded from the processing loop.

**Kind**: instance property of <code>[Plugin](#Plugin)</code>  
<a name="System"></a>

## *System*
Interface for defining new systems. A system in Genetic Sandbox is a class
containing logic that operates in some way on [Tiles](#Tile) within the
[HexGrid](#HexGrid).

**Kind**: global abstract class  

* *[System](#System)*
    * *[new System(tag)](#new_System_new)*
    * *[.tag](#System+tag) : <code>string</code>*
    * *[.reserve(app)](#System+reserve)*
    * *[.initialize(app)](#System+initialize)*
    * *[.update(app)](#System+update)*
    * *[.draw(app)](#System+draw)*
    * *[.sense(app)](#System+sense)*
    * *[.attempt(app)](#System+attempt)*

<a name="new_System_new"></a>

### *new System(tag)*
System can not be instantiated directly, but instead should be extended
and its instance methods overridden.


| Param | Type | Description |
| --- | --- | --- |
| tag | <code>string</code> | one of "renderer", "generator", or "processor" |

<a name="System+tag"></a>

### *system.tag : <code>string</code>*
Defines the overall role of this system. One of "renderer", "generator",
or "processor".

**Kind**: instance property of <code>[System](#System)</code>  
<a name="System+reserve"></a>

### *system.reserve(app)*
Hook for reserving input and ouput neurons in the Brain

**Kind**: instance method of <code>[System](#System)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+initialize"></a>

### *system.initialize(app)*
Initializes this system allowing it to perform one-time preparation logic

**Kind**: instance method of <code>[System](#System)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+update"></a>

### *system.update(app)*
Hook for updating the state of the world

**Kind**: instance method of <code>[System](#System)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+draw"></a>

### *system.draw(app)*
Called once per frame to perform drawing logic

**Kind**: instance method of <code>[System](#System)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+sense"></a>

### *system.sense(app)*
Hook for inputting sense data into the brain

**Kind**: instance method of <code>[System](#System)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+attempt"></a>

### *system.attempt(app)*
Hook for reading output data from the brain and attempting actions

**Kind**: instance method of <code>[System](#System)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="Brain"></a>

## Brain ⇐ <code>[Component](#Component)</code>
A neural network that receives sense input from the environment and produces
actions on the behalf of a creature

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  

* [Brain](#Brain) ⇐ <code>[Component](#Component)</code>
    * [new Brain(dna, sequencer)](#new_Brain_new)
    * _instance_
        * [.input(id, value)](#Brain+input)
        * [.output(id)](#Brain+output)
        * [.activate()](#Brain+activate)
    * _static_
        * [.reserveInput()](#Brain.reserveInput) ⇒ <code>number</code>
        * [.reserveOutput()](#Brain.reserveOutput) ⇒ <code>number</code>

<a name="new_Brain_new"></a>

### new Brain(dna, sequencer)
Constructs a new brain resulting from reading the given [DNA](#DNA) with
the supplied [Sequencer](#Sequencer)


| Param | Type | Description |
| --- | --- | --- |
| dna | <code>[DNA](#DNA)</code> | creature DNA |
| sequencer | <code>[Sequencer](#Sequencer)</code> | the sequencer to use to read the brain strand from the DNA |

<a name="Brain+input"></a>

### brain.input(id, value)
Inputs the given sense value to the specified neuron

**Kind**: instance method of <code>[Brain](#Brain)</code>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id of neuron |
| value | <code>number</code> | value to input between 0 and 1 inclusive |

**Example**  

```js
// Called in the System#reserve() method
const mySenseID = Brain.reserveInput();
// ...
myBrain.input(mySenseID, 0.5);
```
<a name="Brain+output"></a>

### brain.output(id)
Fetches the output value of the given neuron

**Kind**: instance method of <code>[Brain](#Brain)</code>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id of neuron |

**Example**  

```js
// Called in the System#reserve() method
const myOutputID = Brain.reserveOutput();
// ...
const outputValue = myBrain.output(myOutputID);
```
<a name="Brain+activate"></a>

### brain.activate()
Activates the brain on the inputs entered thus far

**Kind**: instance method of <code>[Brain](#Brain)</code>  
<a name="Brain.reserveInput"></a>

### Brain.reserveInput() ⇒ <code>number</code>
Reserves a single input neuron. This function is expected to be called only
once in the reservation step by systems that will be feeding sense data into
the brain.

**Kind**: static method of <code>[Brain](#Brain)</code>  
**Returns**: <code>number</code> - the ID of the reserved input neuron  
**Example**  

```js
const senseID = Brain.reserveInput();
```
<a name="Brain.reserveOutput"></a>

### Brain.reserveOutput() ⇒ <code>number</code>
Reserves a single output neuron. This function is expected to be called only
once in the reservation step by systems that will be feeding sense data into
the brain.

**Kind**: static method of <code>[Brain](#Brain)</code>  
**Returns**: <code>number</code> - the ID of the reserved output neuron  
**Example**  

```js
const actionID = Brain.reserveOutput();
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
<a name="ConnectionGene"></a>

## ConnectionGene ⇐ <code>[Component](#Component)</code>
Genetic representation of a connection between two neurons in a neural
network

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  
**See**: {NodeGene}  

* [ConnectionGene](#ConnectionGene) ⇐ <code>[Component](#Component)</code>
    * [new ConnectionGene(inID, outID, weight, enabled)](#new_ConnectionGene_new)
    * _instance_
        * [.in](#ConnectionGene+in) : <code>number</code>
        * [.out](#ConnectionGene+out) : <code>number</code>
        * [.weight](#ConnectionGene+weight) : <code>number</code>
        * [.enabled](#ConnectionGene+enabled) : <code>boolean</code>
        * [.innovationNumber](#ConnectionGene+innovationNumber) : <code>number</code>
    * _static_
        * [.resetInnovations()](#ConnectionGene.resetInnovations)

<a name="new_ConnectionGene_new"></a>

### new ConnectionGene(inID, outID, weight, enabled)
Constructs a new ConnectionGene


| Param | Type | Description |
| --- | --- | --- |
| inID | <code>number</code> | id of the source node |
| outID | <code>number</code> | id of the destination node |
| weight | <code>number</code> | the weight of the connection as a value between 0 and 1 inclusive |
| enabled | <code>boolean</code> | whether this gene is expressed or not |

**Example**  

```js
const node1 = new NodeGene(1, "input");
const node2 = new NodeGene(2, "output");
const conn = new ConnectionGene(node1.id, node2.id, 0.2, true);
```
<a name="ConnectionGene+in"></a>

### connectionGene.in : <code>number</code>
ID of the source node for this connection

**Kind**: instance property of <code>[ConnectionGene](#ConnectionGene)</code>  
<a name="ConnectionGene+out"></a>

### connectionGene.out : <code>number</code>
ID of the destination node for this connection

**Kind**: instance property of <code>[ConnectionGene](#ConnectionGene)</code>  
<a name="ConnectionGene+weight"></a>

### connectionGene.weight : <code>number</code>
The weight of this connection as a value between 0 and 1 inclusive

**Kind**: instance property of <code>[ConnectionGene](#ConnectionGene)</code>  
<a name="ConnectionGene+enabled"></a>

### connectionGene.enabled : <code>boolean</code>
True if this gene is expressed, false otherwise. A connection gene
that is not expressed is given a weight of zero in the resulting
neural network.

**Kind**: instance property of <code>[ConnectionGene](#ConnectionGene)</code>  
<a name="ConnectionGene+innovationNumber"></a>

### connectionGene.innovationNumber : <code>number</code>
ID of the historical origin, or "innovation number" of this connection
gene

**Kind**: instance property of <code>[ConnectionGene](#ConnectionGene)</code>  
<a name="ConnectionGene.resetInnovations"></a>

### ConnectionGene.resetInnovations()
Resets the innovation history

**Kind**: static method of <code>[ConnectionGene](#ConnectionGene)</code>  
<a name="DNA"></a>

## DNA ⇐ <code>[Component](#Component)</code>
Genetic encoding of a creature heavily inspired by the
[NEAT algorithm](http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf)

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  

* [DNA](#DNA) ⇐ <code>[Component](#Component)</code>
    * [new DNA(inputCount, outputCount, random)](#new_DNA_new)
    * [.brainStrand](#DNA+brainStrand) : <code>[Strand](#Strand)</code>
    * [.traitStrand](#DNA+traitStrand) : <code>[Strand](#Strand)</code>

<a name="new_DNA_new"></a>

### new DNA(inputCount, outputCount, random)
Constructs the DNA for a brand new creature with base traits and the
simplest possible brain: one with only one enabled connection between
a random input neuron and a random output neuron.


| Param | Type | Description |
| --- | --- | --- |
| inputCount | <code>number</code> | the total number of possible inputs (senses) to a creature's brain |
| outputCount | <code>number</code> | the total number of possible outputs (actions) from a creature's brain |
| random | <code>Object</code> | an instance of a random-js engine |

**Example**  

```js
// Creates DNA for a creature that has 3 brain inputs, and 4 brain outputs
const myDNA = new DNA(3, 4, random);
```
<a name="DNA+brainStrand"></a>

### dnA.brainStrand : <code>[Strand](#Strand)</code>
Strand of genes describing a creature's brain

**Kind**: instance property of <code>[DNA](#DNA)</code>  
<a name="DNA+traitStrand"></a>

### dnA.traitStrand : <code>[Strand](#Strand)</code>
Strand of genes describing the trait function (TF)

**Kind**: instance property of <code>[DNA](#DNA)</code>  
<a name="NodeGene"></a>

## NodeGene ⇐ <code>[Component](#Component)</code>
Genetic representation of a neuron in a neural network

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  

* [NodeGene](#NodeGene) ⇐ <code>[Component](#Component)</code>
    * [new NodeGene([id], [type])](#new_NodeGene_new)
    * [.id](#NodeGene+id) : <code>number</code>
    * [.type](#NodeGene+type) : <code>string</code>

<a name="new_NodeGene_new"></a>

### new NodeGene([id], [type])
Constructs a new NodeGene


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>number</code> | <code>0</code> | the id of the neuron |
| [type] | <code>string</code> | <code>&quot;hidden&quot;</code> | one of "input", "hidden", or "output" |

**Example**  

```js
const node1 = new NodeGene(1, "input");
const node2 = new NodeGene(2, "output");
const node3 = new NodeGene(3, "hidden");
```
<a name="NodeGene+id"></a>

### nodeGene.id : <code>number</code>
The id of the neuron

**Kind**: instance property of <code>[NodeGene](#NodeGene)</code>  
<a name="NodeGene+type"></a>

### nodeGene.type : <code>string</code>
Type of neuron. One of "input", "hidden", or "output".

**Kind**: instance property of <code>[NodeGene](#NodeGene)</code>  
<a name="Strand"></a>

## Strand ⇐ <code>[Component](#Component)</code>
Genetic representation of a neural network

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  
**See**

- {NodeGene}
- {ConnectionGene}


* [Strand](#Strand) ⇐ <code>[Component](#Component)</code>
    * [new Strand(inputCount, outputCount, enabled, random)](#new_Strand_new)
    * [.nodeGenes](#Strand+nodeGenes) : <code>[Array.&lt;NodeGene&gt;](#NodeGene)</code>
    * [.connectionGenes](#Strand+connectionGenes) : <code>[Array.&lt;ConnectionGene&gt;](#ConnectionGene)</code>

<a name="new_Strand_new"></a>

### new Strand(inputCount, outputCount, enabled, random)
Constructs a new Strand representing a fully connected neural network with
the given number of input/output neurons, zero hidden neurons, and
random weight values


| Param | Type | Description |
| --- | --- | --- |
| inputCount | <code>number</code> | number of input neuron genes |
| outputCount | <code>number</code> | number of output neuron genes |
| enabled | <code>boolean</code> | whether all connection genes are initially enabled (true), or disabled (false) |
| random | <code>Object</code> | an instance of a random-js instance |

**Example**  

```js
// Represents a neural network with 4 input neurons, 5 output neurons,
// and all connection genes enabled.
const strand1 = new Strand(4, 5, true, random);
// Represents a neural network with 2 input neurons, 4 output neurons,
// and all connection genes disabled.
const strand2 = new Strand(2, 4, false, random);
```
<a name="Strand+nodeGenes"></a>

### strand.nodeGenes : <code>[Array.&lt;NodeGene&gt;](#NodeGene)</code>
The list of node genes describing neurons

**Kind**: instance property of <code>[Strand](#Strand)</code>  
<a name="Strand+connectionGenes"></a>

### strand.connectionGenes : <code>[Array.&lt;ConnectionGene&gt;](#ConnectionGene)</code>
The list of connection genes describing connections between neurons

**Kind**: instance property of <code>[Strand](#Strand)</code>  
<a name="BackgroundRenderer"></a>

## BackgroundRenderer ⇐ <code>[System](#System)</code>
Renders the background

**Kind**: global class  
**Extends:** <code>[System](#System)</code>  

* [BackgroundRenderer](#BackgroundRenderer) ⇐ <code>[System](#System)</code>
    * [new BackgroundRenderer()](#new_BackgroundRenderer_new)
    * [.tag](#System+tag) : <code>string</code>
    * [.initialize(app)](#BackgroundRenderer+initialize)
    * [.reserve(app)](#System+reserve)
    * [.update(app)](#System+update)
    * [.draw(app)](#System+draw)
    * [.sense(app)](#System+sense)
    * [.attempt(app)](#System+attempt)

<a name="new_BackgroundRenderer_new"></a>

### new BackgroundRenderer()
Constructs a new BackgroundRenderer

<a name="System+tag"></a>

### backgroundRenderer.tag : <code>string</code>
Defines the overall role of this system. One of "renderer", "generator",
or "processor".

**Kind**: instance property of <code>[BackgroundRenderer](#BackgroundRenderer)</code>  
<a name="BackgroundRenderer+initialize"></a>

### backgroundRenderer.initialize(app)
Renders the background

**Kind**: instance method of <code>[BackgroundRenderer](#BackgroundRenderer)</code>  
**Overrides:** <code>[initialize](#System+initialize)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+reserve"></a>

### backgroundRenderer.reserve(app)
Hook for reserving input and ouput neurons in the Brain

**Kind**: instance method of <code>[BackgroundRenderer](#BackgroundRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+update"></a>

### backgroundRenderer.update(app)
Hook for updating the state of the world

**Kind**: instance method of <code>[BackgroundRenderer](#BackgroundRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+draw"></a>

### backgroundRenderer.draw(app)
Called once per frame to perform drawing logic

**Kind**: instance method of <code>[BackgroundRenderer](#BackgroundRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+sense"></a>

### backgroundRenderer.sense(app)
Hook for inputting sense data into the brain

**Kind**: instance method of <code>[BackgroundRenderer](#BackgroundRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+attempt"></a>

### backgroundRenderer.attempt(app)
Hook for reading output data from the brain and attempting actions

**Kind**: instance method of <code>[BackgroundRenderer](#BackgroundRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="GridRenderer"></a>

## GridRenderer ⇐ <code>[System](#System)</code>
Renders a hexagonal border around all tiles in the grid

**Kind**: global class  
**Extends:** <code>[System](#System)</code>  

* [GridRenderer](#GridRenderer) ⇐ <code>[System](#System)</code>
    * [new GridRenderer()](#new_GridRenderer_new)
    * [.tag](#System+tag) : <code>string</code>
    * [.initialize(app)](#GridRenderer+initialize)
    * [.reserve(app)](#System+reserve)
    * [.update(app)](#System+update)
    * [.draw(app)](#System+draw)
    * [.sense(app)](#System+sense)
    * [.attempt(app)](#System+attempt)

<a name="new_GridRenderer_new"></a>

### new GridRenderer()
Constructs a new GridRenderer

<a name="System+tag"></a>

### gridRenderer.tag : <code>string</code>
Defines the overall role of this system. One of "renderer", "generator",
or "processor".

**Kind**: instance property of <code>[GridRenderer](#GridRenderer)</code>  
<a name="GridRenderer+initialize"></a>

### gridRenderer.initialize(app)
Renders the grid

**Kind**: instance method of <code>[GridRenderer](#GridRenderer)</code>  
**Overrides:** <code>[initialize](#System+initialize)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+reserve"></a>

### gridRenderer.reserve(app)
Hook for reserving input and ouput neurons in the Brain

**Kind**: instance method of <code>[GridRenderer](#GridRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+update"></a>

### gridRenderer.update(app)
Hook for updating the state of the world

**Kind**: instance method of <code>[GridRenderer](#GridRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+draw"></a>

### gridRenderer.draw(app)
Called once per frame to perform drawing logic

**Kind**: instance method of <code>[GridRenderer](#GridRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+sense"></a>

### gridRenderer.sense(app)
Hook for inputting sense data into the brain

**Kind**: instance method of <code>[GridRenderer](#GridRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+attempt"></a>

### gridRenderer.attempt(app)
Hook for reading output data from the brain and attempting actions

**Kind**: instance method of <code>[GridRenderer](#GridRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="Plant"></a>

## Plant ⇐ <code>[Component](#Component)</code>
An edible plant containing energy

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  

* [Plant](#Plant) ⇐ <code>[Component](#Component)</code>
    * [new Plant([energy])](#new_Plant_new)
    * [.energy](#Plant+energy) : <code>number</code>

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
<a name="PlantGenerator"></a>

## PlantGenerator ⇐ <code>[System](#System)</code>
Generates initial plant life, placing Plant components into Tiles

**Kind**: global class  
**Extends:** <code>[System](#System)</code>  
**See**: [Plant](#Plant)  

* [PlantGenerator](#PlantGenerator) ⇐ <code>[System](#System)</code>
    * [new PlantGenerator()](#new_PlantGenerator_new)
    * [.tag](#System+tag) : <code>string</code>
    * [.initialize(app)](#PlantGenerator+initialize)
    * [.reserve(app)](#System+reserve)
    * [.update(app)](#System+update)
    * [.draw(app)](#System+draw)
    * [.sense(app)](#System+sense)
    * [.attempt(app)](#System+attempt)

<a name="new_PlantGenerator_new"></a>

### new PlantGenerator()
Constructs a new PlantGenerator

<a name="System+tag"></a>

### plantGenerator.tag : <code>string</code>
Defines the overall role of this system. One of "renderer", "generator",
or "processor".

**Kind**: instance property of <code>[PlantGenerator](#PlantGenerator)</code>  
<a name="PlantGenerator+initialize"></a>

### plantGenerator.initialize(app)
Seeds the world with plants

**Kind**: instance method of <code>[PlantGenerator](#PlantGenerator)</code>  
**Overrides:** <code>[initialize](#System+initialize)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+reserve"></a>

### plantGenerator.reserve(app)
Hook for reserving input and ouput neurons in the Brain

**Kind**: instance method of <code>[PlantGenerator](#PlantGenerator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+update"></a>

### plantGenerator.update(app)
Hook for updating the state of the world

**Kind**: instance method of <code>[PlantGenerator](#PlantGenerator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+draw"></a>

### plantGenerator.draw(app)
Called once per frame to perform drawing logic

**Kind**: instance method of <code>[PlantGenerator](#PlantGenerator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+sense"></a>

### plantGenerator.sense(app)
Hook for inputting sense data into the brain

**Kind**: instance method of <code>[PlantGenerator](#PlantGenerator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+attempt"></a>

### plantGenerator.attempt(app)
Hook for reading output data from the brain and attempting actions

**Kind**: instance method of <code>[PlantGenerator](#PlantGenerator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="PlantRenderer"></a>

## PlantRenderer ⇐ <code>[System](#System)</code>
Renders plants for all tiles that contain a Plant component

**Kind**: global class  
**Extends:** <code>[System](#System)</code>  

* [PlantRenderer](#PlantRenderer) ⇐ <code>[System](#System)</code>
    * [new PlantRenderer()](#new_PlantRenderer_new)
    * [.tag](#System+tag) : <code>string</code>
    * [.initialize(app)](#PlantRenderer+initialize)
    * [.draw(app)](#PlantRenderer+draw)
    * [.reserve(app)](#System+reserve)
    * [.update(app)](#System+update)
    * [.sense(app)](#System+sense)
    * [.attempt(app)](#System+attempt)

<a name="new_PlantRenderer_new"></a>

### new PlantRenderer()
Constructs a new PlantRenderer

<a name="System+tag"></a>

### plantRenderer.tag : <code>string</code>
Defines the overall role of this system. One of "renderer", "generator",
or "processor".

**Kind**: instance property of <code>[PlantRenderer](#PlantRenderer)</code>  
<a name="PlantRenderer+initialize"></a>

### plantRenderer.initialize(app)
Prepares the system for rendering plant graphics

**Kind**: instance method of <code>[PlantRenderer](#PlantRenderer)</code>  
**Overrides:** <code>[initialize](#System+initialize)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="PlantRenderer+draw"></a>

### plantRenderer.draw(app)
Renders a plant graphic for every tile that contains a Plant component,
and removes plant graphics for tiles that no longer have vegetation

**Kind**: instance method of <code>[PlantRenderer](#PlantRenderer)</code>  
**Overrides:** <code>[draw](#System+draw)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+reserve"></a>

### plantRenderer.reserve(app)
Hook for reserving input and ouput neurons in the Brain

**Kind**: instance method of <code>[PlantRenderer](#PlantRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+update"></a>

### plantRenderer.update(app)
Hook for updating the state of the world

**Kind**: instance method of <code>[PlantRenderer](#PlantRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+sense"></a>

### plantRenderer.sense(app)
Hook for inputting sense data into the brain

**Kind**: instance method of <code>[PlantRenderer](#PlantRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+attempt"></a>

### plantRenderer.attempt(app)
Hook for reading output data from the brain and attempting actions

**Kind**: instance method of <code>[PlantRenderer](#PlantRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="Hexagon"></a>

## Hexagon ⇐ <code>[Shape](#Shape)</code>
A flat-topped, regular hexagon. Implementation details can be found
[here](http://www.redblobgames.com/grids/hexagons/).

**Kind**: global class  
**Extends:** <code>[Shape](#Shape)</code>  

* [Hexagon](#Hexagon) ⇐ <code>[Shape](#Shape)</code>
    * [new Hexagon(center, radius)](#new_Hexagon_new)
    * [.radius](#Hexagon+radius) : <code>number</code>
    * [.width](#Hexagon+width) ⇒ <code>number</code>
    * [.height](#Hexagon+height) ⇒ <code>number</code>
    * [.center](#Shape+center) : <code>[Point](#Point)</code>
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
<a name="Shape"></a>

## *Shape*
An abstract class representing 2D geometric shapes that have a center, a width,
and a height

**Kind**: global abstract class  

* *[Shape](#Shape)*
    * *[new Shape([center])](#new_Shape_new)*
    * *[.center](#Shape+center) : <code>[Point](#Point)</code>*
    * **[.width](#Shape+width) ⇒ <code>number</code>**
    * **[.height](#Shape+height) ⇒ <code>number</code>**

<a name="new_Shape_new"></a>

### *new Shape([center])*
Creates a new shape at given point
Shape should be extended and its members overridden by a concrete subclass.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [center] | <code>[Point](#Point)</code> | <code>new Point(0, 0)</code> | center point of shape |

**Example**  

```js
class Circle extends Shape {
  constructor(point, radius) {
    super(point);
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
<a name="Serializable"></a>

## Serializable
An interface for recursively serializing and deserializing objects to and from
JSON.

**Kind**: global class  

* [Serializable](#Serializable)
    * [new Serializable()](#new_Serializable_new)
    * _instance_
        * [.serialize([blacklist])](#Serializable+serialize) ⇒ <code>string</code>
    * _static_
        * [.register(ctor)](#Serializable.register)
        * [.restore(json)](#Serializable.restore) ⇒ <code>[Serializable](#Serializable)</code>

<a name="new_Serializable_new"></a>

### new Serializable()
Serializable isn't instantiable directly, but should be extended by a
concrete subclass.

<a name="Serializable+serialize"></a>

### serializable.serialize([blacklist]) ⇒ <code>string</code>
Serializes this object to JSON with an optional array of blacklisted
fields that will not be included in the output. This function will be
called recursively for nested Serializable objects.

**Kind**: instance method of <code>[Serializable](#Serializable)</code>  
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
<a name="Serializable.register"></a>

### Serializable.register(ctor)
Registers the given constructor so that it can later be properly restored
from JSON using Serializable.restore()

**Kind**: static method of <code>[Serializable](#Serializable)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ctor | <code>function</code> | constructor function for a subclass of Serializable |

<a name="Serializable.restore"></a>

### Serializable.restore(json) ⇒ <code>[Serializable](#Serializable)</code>
Restores a Serializable object from its JSON string, obtained by originally
calling serialize() on that object. Also restores nested Serializable
objects..

**Kind**: static method of <code>[Serializable](#Serializable)</code>  
**Returns**: <code>[Serializable](#Serializable)</code> - the restored Serializable object as it existed at
its time of serialization  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>string</code> | object's JSON string |

**Example**  

```js
const coord = new Coord(5, 6);
const restored = Serializable.restore(coord.serialize());
coord.x === restored.x; // true
coord.y === restored.y; // true
```
<a name="config"></a>

## config : <code>Object</code>
An aggregation of all plugin configuration options, and the main interface
for tweaking them.

**Kind**: global constant  
**Example**  

```js
import config from "../config";
// Change the vegetation rate
config.plants.vegetationRate = 0.2;
// Change the size of the world
config.core.gridRadius = 35;
```
<a name="core"></a>

## core : <code>Object</code>
Core configuration options

**Kind**: global constant  

* [core](#core) : <code>Object</code>
    * [.gridRadius](#core.gridRadius) : <code>number</code>
    * [.hexRadius](#core.hexRadius) : <code>number</code>

<a name="core.gridRadius"></a>

### core.gridRadius : <code>number</code>
The radius in hexagons of the world

**Kind**: static property of <code>[core](#core)</code>  
<a name="core.hexRadius"></a>

### core.hexRadius : <code>number</code>
The radius in pixels of a hexagon within the grid

**Kind**: static property of <code>[core](#core)</code>  
<a name="plants"></a>

## plants : <code>Object</code>
Plant configuration options

**Kind**: global constant  
<a name="plants.vegetationRate"></a>

### plants.vegetationRate : <code>number</code>
The percentage of the grid that will be covered in vegetation

**Kind**: static property of <code>[plants](#plants)</code>  
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
