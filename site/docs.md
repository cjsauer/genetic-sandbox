---
layout: default
title: Documentation
permalink: /docs/
---

## Classes

<dl>
<dt><a href="#App">App</a></dt>
<dd><p>The context and heartbeat of the Genetic Sandbox simulation</p>
</dd>
<dt><a href="#Component">Component</a></dt>
<dd><p>Components are bags of properties that entities possess. They may also
contain helper methods.</p>
</dd>
<dt><a href="#Entity">Entity</a></dt>
<dd><p>An entity is a container of Components, and represents all &quot;things&quot; in the
world</p>
</dd>
<dt><a href="#Family">Family</a></dt>
<dd><p>A collection of entities containing all of the specified components</p>
</dd>
<dt><a href="#System">System</a></dt>
<dd><p>Interface for defining new systems. A system in Genetic Sandbox is a class
containing logic that operates in some way on <a href="#Tile">Tiles</a> within the
<a href="#HexGrid">HexGrid</a>.</p>
</dd>
<dt><a href="#World">World</a></dt>
<dd><p>World is a container of all entities in existence, and provides super fast
lookup of entities by component</p>
</dd>
<dt><a href="#ConnectionGene">ConnectionGene</a> ⇐ <code><a href="#Serializable">Serializable</a></code></dt>
<dd><p>Genetic representation of a connection between two neurons in a neural
network</p>
</dd>
<dt><a href="#NodeGene">NodeGene</a> ⇐ <code><a href="#Serializable">Serializable</a></code></dt>
<dd><p>Genetic representation of a neuron in a neural network</p>
</dd>
<dt><a href="#Sequencer">Sequencer</a></dt>
<dd><p>Reads in a <a href="#Strand">Strand</a> and produces a
<a href="http://synaptic.juancazala.com/#/">Synaptic neural network</a></p>
</dd>
<dt><a href="#Strand">Strand</a> ⇐ <code><a href="#Serializable">Serializable</a></code></dt>
<dd><p>Genetic representation of a neural network</p>
</dd>
<dt><a href="#HexGrid">HexGrid</a> ⇐ <code><a href="#CoordEntityIndex">CoordEntityIndex</a></code></dt>
<dd><p>A 2D, hexagonal grid implementation with axial coordinate system. Provides
methods for building an array of tile entities, fast lookup of entities by
coordinate, as well as other useful grid-related tasks.
Implementation details can be found <a href="http://goo.gl/nLO6sN">here</a>.</p>
</dd>
<dt><a href="#Plugin">Plugin</a></dt>
<dd><p>A toggleable plugin containing an array of <a href="#System">Systems</a> and
configuration options</p>
</dd>
<dt><a href="#Coord">Coord</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>A two dimensional coordinate of x and y</p>
</dd>
<dt><a href="#Energy">Energy</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>Energy is the currency of existence</p>
</dd>
<dt><a href="#Sprite">Sprite</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>Graphical representation of an entity</p>
</dd>
<dt><a href="#Tile">Tile</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>Tile is a location in the world that an entity can exist at</p>
</dd>
<dt><a href="#BackgroundRenderer">BackgroundRenderer</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Renders the background</p>
</dd>
<dt><a href="#SpriteRenderer">SpriteRenderer</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Renders all entities with Coord and Sprite components to the screen</p>
</dd>
<dt><a href="#Brain">Brain</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>A neural network that receives sense input from the environment and produces
actions on the behalf of a creature</p>
</dd>
<dt><a href="#Creature">Creature</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>Intelligent organism with the capability to evolve</p>
</dd>
<dt><a href="#DNA">DNA</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>Genetic encoding of a creature heavily inspired by the
<a href="http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf">NEAT algorithm</a></p>
</dd>
<dt><a href="#AgingProcessor">AgingProcessor</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Saps energy from creatures every tick</p>
</dd>
<dt><a href="#BrainProcessor">BrainProcessor</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Activates the brains of all creatures</p>
</dd>
<dt><a href="#CreatureGenerator">CreatureGenerator</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Generates initial creatures with random DNA</p>
</dd>
<dt><a href="#EatingProcessor">EatingProcessor</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Processes the eating of plants by creatures</p>
</dd>
<dt><a href="#MovementProcessor">MovementProcessor</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Processes locomotion for creatures</p>
</dd>
<dt><a href="#TouchProcessor">TouchProcessor</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Inputs touch sense data into the brains of creatures</p>
</dd>
<dt><a href="#Plant">Plant</a> ⇐ <code><a href="#Component">Component</a></code></dt>
<dd><p>An edible plant</p>
</dd>
<dt><a href="#PlantGenerator">PlantGenerator</a> ⇐ <code><a href="#System">System</a></code></dt>
<dd><p>Generates initial plant life, placing Plant components into Tiles</p>
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
<dt><a href="#CoordEntityIndex">CoordEntityIndex</a></dt>
<dd><p>An index providing fast lookup of Entities by their coordinate position</p>
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
<dt><a href="#creatures">creatures</a> : <code>Object</code></dt>
<dd><p>Creature configuration options</p>
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

## Functions

<dl>
<dt><a href="#buildTile">buildTile(coord)</a> ⇒ <code><a href="#Entity">Entity</a></code></dt>
<dd><p>Builds a tile entity</p>
</dd>
<dt><a href="#buildCreature">buildCreature(dna, coord)</a> ⇒ <code><a href="#Entity">Entity</a></code></dt>
<dd><p>Builds a creature entity with the given DNA at the given position</p>
</dd>
<dt><a href="#buildDefaultCreature">buildDefaultCreature(coord, random)</a> ⇒ <code><a href="#Entity">Entity</a></code></dt>
<dd><p>Builds a creature entity with the default initial DNA at the given position</p>
</dd>
<dt><a href="#buildPlant">buildPlant(energyLevel, coord)</a></dt>
<dd><p>Builds a plant entity with the given energy level at the given position</p>
</dd>
</dl>

<a name="App"></a>

## App
The context and heartbeat of the Genetic Sandbox simulation

**Kind**: global class  
**See**

- [World](#World)
- [HexGrid](#HexGrid)
- [Plugin](#Plugin)


* [App](#App)
    * [new App(world, grid, paperScope)](#new_App_new)
    * [.world](#App+world) : <code>[World](#World)</code>
    * [.grid](#App+grid) : <code>[HexGrid](#HexGrid)</code>
    * [.paper](#App+paper) : <code>PaperScope</code>
    * [.plugins](#App+plugins) : <code>[Array.&lt;Plugin&gt;](#Plugin)</code>
    * [.random](#App+random)
    * [.initialize(plugins, [seed])](#App+initialize)
    * [.tick()](#App+tick)
    * [.run()](#App+run)
    * [.stop()](#App+stop)

<a name="new_App_new"></a>

### new App(world, grid, paperScope)
Creates a new App, setting up the context for the rest of the simulation


| Param | Type | Description |
| --- | --- | --- |
| world | <code>[World](#World)</code> | world instance |
| grid | <code>[HexGrid](#HexGrid)</code> | grid implementation to use for grid-related computation |
| paperScope | <code>PaperScope</code> | Paper.js graphics context |

<a name="App+world"></a>

### app.world : <code>[World](#World)</code>
The World, or manager of all entities

**Kind**: instance property of <code>[App](#App)</code>  
<a name="App+grid"></a>

### app.grid : <code>[HexGrid](#HexGrid)</code>
Grid implementation to use for grid-related computation

**Kind**: instance property of <code>[App](#App)</code>  
<a name="App+paper"></a>

### app.paper : <code>PaperScope</code>
Paper.js graphics context used for rendering vector graphics to a
canvas element

**Kind**: instance property of <code>[App](#App)</code>  
<a name="App+plugins"></a>

### app.plugins : <code>[Array.&lt;Plugin&gt;](#Plugin)</code>
Array of plugins included in the main processing loop

**Kind**: instance property of <code>[App](#App)</code>  
<a name="App+random"></a>

### app.random
A seeded instance of the random-js Mersenne Twister engine for
generating random numbers

**Kind**: instance property of <code>[App](#App)</code>  
<a name="App+initialize"></a>

### app.initialize(plugins, [seed])
Initializes all enabled plugins passed by calling *reserve()* and
*initialize()* on their constituent systems. Can optionally be passed a
seed to prime the random number generator with for this simulation.

**Kind**: instance method of <code>[App](#App)</code>  

| Param | Type | Description |
| --- | --- | --- |
| plugins | <code>[Array.&lt;Plugin&gt;](#Plugin)</code> | the plugins to be included in the main processing loop |
| [seed] | <code>number</code> | the seed for the random number generator |

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
<a name="Component"></a>

## Component
Components are bags of properties that entities possess. They may also
contain helper methods.

**Kind**: global class  

* [Component](#Component)
    * [new Component(name)](#new_Component_new)
    * [.name](#Component+name) : <code>string</code>

<a name="new_Component_new"></a>

### new Component(name)
Component isn't instantiable directly, but should be extended by a
concrete subclass.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the component |

<a name="Component+name"></a>

### component.name : <code>string</code>
Name of the component. Expected to be unique among Components.

**Kind**: instance property of <code>[Component](#Component)</code>  
<a name="Entity"></a>

## Entity
An entity is a container of Components, and represents all "things" in the
world

**Kind**: global class  
**See**: [Component](#Component)  

* [Entity](#Entity)
    * [new Entity()](#new_Entity_new)
    * [.id](#Entity+id) : <code>number</code>
    * [.getComponent(name)](#Entity+getComponent) ⇒ <code>[Component](#Component)</code>
    * [.hasComponent(name)](#Entity+hasComponent) ⇒ <code>boolean</code>
    * [.addComponent(component)](#Entity+addComponent)
    * [.removeComponent(name)](#Entity+removeComponent)
    * ["componentAdded"](#Entity+event_componentAdded)
    * ["componentDeleted"](#Entity+event_componentDeleted)

<a name="new_Entity_new"></a>

### new Entity()
Creates a new, empty Entity

**Example**  

```js
const myEntity = new Entity();
```
<a name="Entity+id"></a>

### entity.id : <code>number</code>
Unique ID of this entity

**Kind**: instance property of <code>[Entity](#Entity)</code>  
<a name="Entity+getComponent"></a>

### entity.getComponent(name) ⇒ <code>[Component](#Component)</code>
Returns the component with the given name, or null if it does not exist

**Kind**: instance method of <code>[Entity](#Entity)</code>  
**Returns**: <code>[Component](#Component)</code> - the component, or null if it does not exist  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the component |

**Example**  

```js
let plant = myEntity.getComponent("plant");
```
<a name="Entity+hasComponent"></a>

### entity.hasComponent(name) ⇒ <code>boolean</code>
Returns true if this entity has the given component, false otherwise

**Kind**: instance method of <code>[Entity](#Entity)</code>  
**Returns**: <code>boolean</code> - True if the entity has the given component, false
otherwise  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the component to check for |

<a name="Entity+addComponent"></a>

### entity.addComponent(component)
Adds the given component to this entity

**Kind**: instance method of <code>[Entity](#Entity)</code>  
**Emits**: <code>[componentAdded](#Entity+event_componentAdded)</code>  

| Param | Type | Description |
| --- | --- | --- |
| component | <code>[Component](#Component)</code> | the component instance to add |

**Example**  

```js
myEntity.addComponent(new Plant(10));
```
<a name="Entity+removeComponent"></a>

### entity.removeComponent(name)
Removes the specified component from this entity

**Kind**: instance method of <code>[Entity](#Entity)</code>  
**Emits**: <code>[componentDeleted](#Entity+event_componentDeleted)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the component to delete |

**Example**  

```js
myEntity.addComponent(new Plant(10));
myEntity.removeComponent("plant");
```
<a name="Entity+event_componentAdded"></a>

### "componentAdded"
Fired when a new component is added to an entity

**Kind**: event emitted by <code>[Entity](#Entity)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| entity | <code>[Entity](#Entity)</code> | the entity that was modified |
| name | <code>string</code> | the name of the component that was added |

<a name="Entity+event_componentDeleted"></a>

### "componentDeleted"
Fired when a component is deleted from a entity

**Kind**: event emitted by <code>[Entity](#Entity)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| entity | <code>[Entity](#Entity)</code> | the entity that was modified |
| name | <code>string</code> | name of the component that was deleted |

<a name="Family"></a>

## Family
A collection of entities containing all of the specified components

**Kind**: global class  
**See**

- {Entity}
- {Component}


* [Family](#Family)
    * [new Family(componentNames)](#new_Family_new)
    * _instance_
        * [.hash](#Family+hash) : <code>string</code>
        * [.addEntityIfMatch(entity)](#Family+addEntityIfMatch)
        * [.removeEntity(entity)](#Family+removeEntity)
        * [.getEntities()](#Family+getEntities) ⇒ <code>[Array.&lt;Entity&gt;](#Entity)</code>
        * [.onComponentRemoved(event)](#Family+onComponentRemoved)
    * _static_
        * [.hashComponentNames(componentNames)](#Family.hashComponentNames) ⇒ <code>string</code>

<a name="new_Family_new"></a>

### new Family(componentNames)
Creates a new family matching entities containing all of the given
components


| Param | Type | Description |
| --- | --- | --- |
| componentNames | <code>Array.&lt;string&gt;</code> | the names of the components that an entity must contain all of to be included in this family |

**Example**  

```js
const family = new Family(["creature", "plant"]);
```
<a name="Family+hash"></a>

### family.hash : <code>string</code>
Hash key representation of this family. Two families that require
the same components of their entities will hash to the same value.

**Kind**: instance property of <code>[Family](#Family)</code>  
<a name="Family+addEntityIfMatch"></a>

### family.addEntityIfMatch(entity)
Adds the given entity to this family if it contains all of its specified
components

**Kind**: instance method of <code>[Family](#Family)</code>  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>[Entity](#Entity)</code> | the entity to add |

**Example**  

```js
const myEntity = new Entity();
myEntity.addComponent(new Plant(10));
const family = new Family(["plant"]);
family.addEntityIfMatch(myEntity);
```
<a name="Family+removeEntity"></a>

### family.removeEntity(entity)
Removes the given entity from this family

**Kind**: instance method of <code>[Family](#Family)</code>  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>[Entity](#Entity)</code> | the entity to remove |

**Example**  

```js
const myEntity = new Entity();
myEntity.addComponent(new Plant(10));
const family = new Family(["plant"]);
family.addEntityIfMatch(myEntity);
family.removeEntity(myEntity);
```
<a name="Family+getEntities"></a>

### family.getEntities() ⇒ <code>[Array.&lt;Entity&gt;](#Entity)</code>
Returns an array of all entities currently in this family

**Kind**: instance method of <code>[Family](#Family)</code>  
**Returns**: <code>[Array.&lt;Entity&gt;](#Entity)</code> - array of all entities in this family  
**Example**  

```js
family.getEntities().forEach((entity) => {
  // Do something with each entity
});
```
<a name="Family+onComponentRemoved"></a>

### family.onComponentRemoved(event)
Event handler to be called when a component is removed from an entity.
If the component removed was required to qualify for this family,
the entity is removed from the family.

**Kind**: instance method of <code>[Family](#Family)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | event object |
| event.entity | <code>[Entity](#Entity)</code> | the entity from which the component was removed |
| event.component | <code>[Component](#Component)</code> | the component that was removed |

**Example**  

```js
myEntity.addListener("componentRemoved", family.onComponentRemoved.bind(family));
```
<a name="Family.hashComponentNames"></a>

### Family.hashComponentNames(componentNames) ⇒ <code>string</code>
Hash key representation of an array of component names

**Kind**: static method of <code>[Family](#Family)</code>  
**Returns**: <code>string</code> - hash key representation of the passed array of component
names  

| Param | Type | Description |
| --- | --- | --- |
| componentNames | <code>Array.&lt;string&gt;</code> | array of component names |

**Example**  

```js
Family.hashComponentNames(["a", "b", "c"]); // "$a,b,c"
```
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

<a name="World"></a>

## World
World is a container of all entities in existence, and provides super fast
lookup of entities by component

**Kind**: global class  
**See**

- {Entity}
- {System}


* [World](#World)
    * [new World()](#new_World_new)
    * [.addEntity(entity)](#World+addEntity)
    * [.addEntities(entities)](#World+addEntities)
    * [.getEntities()](#World+getEntities) ⇒ <code>[Array.&lt;Entity&gt;](#Entity)</code>
    * [.getEntitiesWith(...componentNames)](#World+getEntitiesWith) ⇒ <code>[Array.&lt;Entity&gt;](#Entity)</code>

<a name="new_World_new"></a>

### new World()
And on the seventh day...

<a name="World+addEntity"></a>

### world.addEntity(entity)
Adds the given entity to this world, or does nothing if that entity
is already in the world

**Kind**: instance method of <code>[World](#World)</code>  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>[Entity](#Entity)</code> | the entity to add |

<a name="World+addEntities"></a>

### world.addEntities(entities)
Adds the given array of entities to this world, skipping entities that
have already been added.

**Kind**: instance method of <code>[World](#World)</code>  

| Param | Type | Description |
| --- | --- | --- |
| entities | <code>[Array.&lt;Entity&gt;](#Entity)</code> | array of entities to add to this world |

<a name="World+getEntities"></a>

### world.getEntities() ⇒ <code>[Array.&lt;Entity&gt;](#Entity)</code>
Retrieves all entities currently in the world

**Kind**: instance method of <code>[World](#World)</code>  
**Returns**: <code>[Array.&lt;Entity&gt;](#Entity)</code> - array of all entities in the world  
<a name="World+getEntitiesWith"></a>

### world.getEntitiesWith(...componentNames) ⇒ <code>[Array.&lt;Entity&gt;](#Entity)</code>
Retrieves an array of all entities that contain ALL of the given components

**Kind**: instance method of <code>[World](#World)</code>  
**Returns**: <code>[Array.&lt;Entity&gt;](#Entity)</code> - the array of entities  

| Param | Type | Description |
| --- | --- | --- |
| ...componentNames | <code>string</code> | The name of a component |

<a name="ConnectionGene"></a>

## ConnectionGene ⇐ <code>[Serializable](#Serializable)</code>
Genetic representation of a connection between two neurons in a neural
network

**Kind**: global class  
**Extends:** <code>[Serializable](#Serializable)</code>  
**See**: {NodeGene}  

* [ConnectionGene](#ConnectionGene) ⇐ <code>[Serializable](#Serializable)</code>
    * [new ConnectionGene(inID, outID, weight, enabled)](#new_ConnectionGene_new)
    * _instance_
        * [.in](#ConnectionGene+in) : <code>number</code>
        * [.out](#ConnectionGene+out) : <code>number</code>
        * [.weight](#ConnectionGene+weight) : <code>number</code>
        * [.enabled](#ConnectionGene+enabled) : <code>boolean</code>
        * [.innovationNumber](#ConnectionGene+innovationNumber) : <code>number</code>
        * [.serialize([blacklist])](#Serializable+serialize) ⇒ <code>string</code>
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
<a name="Serializable+serialize"></a>

### connectionGene.serialize([blacklist]) ⇒ <code>string</code>
Serializes this object to JSON with an optional array of blacklisted
fields that will not be included in the output. This function will be
called recursively for nested Serializable objects.

**Kind**: instance method of <code>[ConnectionGene](#ConnectionGene)</code>  
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
<a name="ConnectionGene.resetInnovations"></a>

### ConnectionGene.resetInnovations()
Resets the innovation history

**Kind**: static method of <code>[ConnectionGene](#ConnectionGene)</code>  
<a name="NodeGene"></a>

## NodeGene ⇐ <code>[Serializable](#Serializable)</code>
Genetic representation of a neuron in a neural network

**Kind**: global class  
**Extends:** <code>[Serializable](#Serializable)</code>  

* [NodeGene](#NodeGene) ⇐ <code>[Serializable](#Serializable)</code>
    * [new NodeGene([id], [type])](#new_NodeGene_new)
    * [.id](#NodeGene+id) : <code>number</code>
    * [.type](#NodeGene+type) : <code>string</code>
    * [.serialize([blacklist])](#Serializable+serialize) ⇒ <code>string</code>

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
<a name="Serializable+serialize"></a>

### nodeGene.serialize([blacklist]) ⇒ <code>string</code>
Serializes this object to JSON with an optional array of blacklisted
fields that will not be included in the output. This function will be
called recursively for nested Serializable objects.

**Kind**: instance method of <code>[NodeGene](#NodeGene)</code>  
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

<a name="Strand"></a>

## Strand ⇐ <code>[Serializable](#Serializable)</code>
Genetic representation of a neural network

**Kind**: global class  
**Extends:** <code>[Serializable](#Serializable)</code>  
**See**

- {NodeGene}
- {ConnectionGene}


* [Strand](#Strand) ⇐ <code>[Serializable](#Serializable)</code>
    * [new Strand(inputCount, outputCount, enabled, random)](#new_Strand_new)
    * [.nodeGenes](#Strand+nodeGenes) : <code>[Array.&lt;NodeGene&gt;](#NodeGene)</code>
    * [.connectionGenes](#Strand+connectionGenes) : <code>[Array.&lt;ConnectionGene&gt;](#ConnectionGene)</code>
    * [.inputNodeGeneCount](#Strand+inputNodeGeneCount) ⇒ <code>number</code>
    * [.outputNodeGeneCount](#Strand+outputNodeGeneCount) ⇒ <code>number</code>
    * [.hiddenNodeGeneCount](#Strand+hiddenNodeGeneCount) ⇒ <code>number</code>
    * [.serialize([blacklist])](#Serializable+serialize) ⇒ <code>string</code>

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
<a name="Strand+inputNodeGeneCount"></a>

### strand.inputNodeGeneCount ⇒ <code>number</code>
Returns the count of input node genes in this strand

**Kind**: instance property of <code>[Strand](#Strand)</code>  
**Returns**: <code>number</code> - input node gene count  
<a name="Strand+outputNodeGeneCount"></a>

### strand.outputNodeGeneCount ⇒ <code>number</code>
Returns the count of output node genes in this strand

**Kind**: instance property of <code>[Strand](#Strand)</code>  
**Returns**: <code>number</code> - output node gene count  
<a name="Strand+hiddenNodeGeneCount"></a>

### strand.hiddenNodeGeneCount ⇒ <code>number</code>
Returns the count of hidden node genes in this strand

**Kind**: instance property of <code>[Strand](#Strand)</code>  
**Returns**: <code>number</code> - hidden node gene count  
<a name="Serializable+serialize"></a>

### strand.serialize([blacklist]) ⇒ <code>string</code>
Serializes this object to JSON with an optional array of blacklisted
fields that will not be included in the output. This function will be
called recursively for nested Serializable objects.

**Kind**: instance method of <code>[Strand](#Strand)</code>  
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

## HexGrid ⇐ <code>[CoordEntityIndex](#CoordEntityIndex)</code>
A 2D, hexagonal grid implementation with axial coordinate system. Provides
methods for building an array of tile entities, fast lookup of entities by
coordinate, as well as other useful grid-related tasks.
Implementation details can be found [here](http://goo.gl/nLO6sN).

**Kind**: global class  
**Extends:** <code>[CoordEntityIndex](#CoordEntityIndex)</code>  
**See**

- [Entity](#Entity)
- [Coord](#Coord)


* [HexGrid](#HexGrid) ⇐ <code>[CoordEntityIndex](#CoordEntityIndex)</code>
    * [new HexGrid(radius)](#new_HexGrid_new)
    * [.radius](#HexGrid+radius) : <code>number</code>
    * [.length](#CoordEntityIndex+length) ⇒ <code>number</code>
    * [.buildTiles()](#HexGrid+buildTiles) ⇒ <code>[Array.&lt;Entity&gt;](#Entity)</code>
    * [.neighborsOf(coord)](#HexGrid+neighborsOf) ⇒ <code>[Array.&lt;Coord&gt;](#Coord)</code>
    * [.distanceBetween(coord1, coord2)](#HexGrid+distanceBetween) ⇒ <code>number</code>
    * [.coordToPixel(coord, radius)](#HexGrid+coordToPixel) ⇒ <code>[Point](#Point)</code>
    * [.rebuild(entities)](#CoordEntityIndex+rebuild)
    * [.findEntitiesAt(coord)](#CoordEntityIndex+findEntitiesAt) ⇒ <code>[Array.&lt;Entity&gt;](#Entity)</code>

<a name="new_HexGrid_new"></a>

### new HexGrid(radius)
Constructs a new HexGrid of given radius. The pattern of tiles within the
grid will then form a hexagon itself with (0,0) being the center.
A grid of radius 0 is just a single hexagon, radius 1 is a single hexagon
surrounded by 1 layer of hexagons, and so on...


| Param | Type | Description |
| --- | --- | --- |
| radius | <code>number</code> | Number of tiles from center of grid to the edge, not counting the center tile |

**Example**  

```js
let myGrid = new HexGrid(10);
```
<a name="HexGrid+radius"></a>

### hexGrid.radius : <code>number</code>
The radius of this hex grid in tiles

**Kind**: instance property of <code>[HexGrid](#HexGrid)</code>  
<a name="CoordEntityIndex+length"></a>

### hexGrid.length ⇒ <code>number</code>
Returns the current number of entities stored in the index

**Kind**: instance property of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>number</code> - current number of entities stored in the index  
<a name="HexGrid+buildTiles"></a>

### hexGrid.buildTiles() ⇒ <code>[Array.&lt;Entity&gt;](#Entity)</code>
Builds an array of tile entities that represent this hex grid

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>[Array.&lt;Entity&gt;](#Entity)</code> - array of tile entities  
<a name="HexGrid+neighborsOf"></a>

### hexGrid.neighborsOf(coord) ⇒ <code>[Array.&lt;Coord&gt;](#Coord)</code>
Returns the Coords that are adjacent to the given Coord

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>[Array.&lt;Coord&gt;](#Coord)</code> - The array of neighboring Coords  

| Param | Type | Description |
| --- | --- | --- |
| coord | <code>[Coord](#Coord)</code> | coordinates of tile for which to calculate neighbors |

**Example**  

```js
let neighborsOfOrigin = myGrid.neighborsOf(new Coord(0, 0));
```
<a name="HexGrid+distanceBetween"></a>

### hexGrid.distanceBetween(coord1, coord2) ⇒ <code>number</code>
Calculates the distance between two Coords in tiles

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
<a name="HexGrid+coordToPixel"></a>

### hexGrid.coordToPixel(coord, radius) ⇒ <code>[Point](#Point)</code>
Converts a tile's coordinates to its pixel coordinates

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>[Point](#Point)</code> - pixel coordinates of center of tile  

| Param | Type | Description |
| --- | --- | --- |
| coord | <code>[Coord](#Coord)</code> | tile coordinates |
| radius | <code>number</code> | radius of hexagons (for correct spacing) |

<a name="CoordEntityIndex+rebuild"></a>

### hexGrid.rebuild(entities)
Rebuilds the index of the given entities for fast lookup by their coordinate
positions (Coord component). If an entity does not contain a Coord
component, it is not included in the index.

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  

| Param | Type | Description |
| --- | --- | --- |
| entities | <code>[Array.&lt;Entity&gt;](#Entity)</code> | array of entities to build the index for |

<a name="CoordEntityIndex+findEntitiesAt"></a>

### hexGrid.findEntitiesAt(coord) ⇒ <code>[Array.&lt;Entity&gt;](#Entity)</code>
Returns an array of entities that are located at the given coordinate

**Kind**: instance method of <code>[HexGrid](#HexGrid)</code>  
**Returns**: <code>[Array.&lt;Entity&gt;](#Entity)</code> - array of entities with given coordinates  

| Param | Type | Description |
| --- | --- | --- |
| coord | <code>[Coord](#Coord)</code> | coordinate |

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
<a name="Coord"></a>

## Coord ⇐ <code>[Component](#Component)</code>
A two dimensional coordinate of x and y

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  

* [Coord](#Coord) ⇐ <code>[Component](#Component)</code>
    * [new Coord([x], [y])](#new_Coord_new)
    * [.x](#Coord+x) : <code>number</code>
    * [.y](#Coord+y) : <code>number</code>
    * [.name](#Component+name) : <code>string</code>

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
<a name="Component+name"></a>

### coord.name : <code>string</code>
Name of the component. Expected to be unique among Components.

**Kind**: instance property of <code>[Coord](#Coord)</code>  
<a name="Energy"></a>

## Energy ⇐ <code>[Component](#Component)</code>
Energy is the currency of existence

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  

* [Energy](#Energy) ⇐ <code>[Component](#Component)</code>
    * [new Energy(energyLevel)](#new_Energy_new)
    * [.level](#Energy+level) ⇒ <code>number</code>
    * [.name](#Component+name) : <code>string</code>
    * [.gain(amount, the)](#Energy+gain)
    * [.expend(amount)](#Energy+expend) ⇒ <code>number</code>

<a name="new_Energy_new"></a>

### new Energy(energyLevel)
Constructs a new energy component with the given energy level


| Param | Type | Description |
| --- | --- | --- |
| energyLevel | <code>number</code> | level of energy to initiate this component with |

<a name="Energy+level"></a>

### energy.level ⇒ <code>number</code>
The current energy level

**Kind**: instance property of <code>[Energy](#Energy)</code>  
**Returns**: <code>number</code> - current energy level  
<a name="Component+name"></a>

### energy.name : <code>string</code>
Name of the component. Expected to be unique among Components.

**Kind**: instance property of <code>[Energy](#Energy)</code>  
<a name="Energy+gain"></a>

### energy.gain(amount, the)
Increases the current energy level by the given amount

**Kind**: instance method of <code>[Energy](#Energy)</code>  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | amount of energy to gain |
| the | <code>number</code> | updated energy level |

<a name="Energy+expend"></a>

### energy.expend(amount) ⇒ <code>number</code>
Expends the given amount of energy, capped at zero

**Kind**: instance method of <code>[Energy](#Energy)</code>  
**Returns**: <code>number</code> - the updated energy level  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | amount of energy to expend |

<a name="Sprite"></a>

## Sprite ⇐ <code>[Component](#Component)</code>
Graphical representation of an entity

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  

* [Sprite](#Sprite) ⇐ <code>[Component](#Component)</code>
    * [new Sprite(spriteName)](#new_Sprite_new)
    * [.spriteName](#Sprite+spriteName) : <code>string</code>
    * [.name](#Component+name) : <code>string</code>
    * [.getItem(paper)](#Sprite+getItem) ⇒ <code>Item</code>

<a name="new_Sprite_new"></a>

### new Sprite(spriteName)
Constructs a new sprite component with the given graphic defined by the
current theme, or falls back to the "default" graphic if not defined


| Param | Type | Description |
| --- | --- | --- |
| spriteName | <code>string</code> | the name of the graphic as defined by the current theme |

<a name="Sprite+spriteName"></a>

### sprite.spriteName : <code>string</code>
Name of the graphic that this sprite represents as defined by the
current theme

**Kind**: instance property of <code>[Sprite](#Sprite)</code>  
<a name="Component+name"></a>

### sprite.name : <code>string</code>
Name of the component. Expected to be unique among Components.

**Kind**: instance property of <code>[Sprite](#Sprite)</code>  
<a name="Sprite+getItem"></a>

### sprite.getItem(paper) ⇒ <code>Item</code>
Returns a [Paper.js Item](http://paperjs.org/reference/item)
instance representing the vector graphic of this sprite

**Kind**: instance method of <code>[Sprite](#Sprite)</code>  
**Returns**: <code>Item</code> - Paper.js Item instance  

| Param | Type | Description |
| --- | --- | --- |
| paper | <code>PaperScope</code> | an active paper scope |

<a name="Tile"></a>

## Tile ⇐ <code>[Component](#Component)</code>
Tile is a location in the world that an entity can exist at

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  

* [Tile](#Tile) ⇐ <code>[Component](#Component)</code>
    * [new Tile()](#new_Tile_new)
    * [.name](#Component+name) : <code>string</code>

<a name="new_Tile_new"></a>

### new Tile()
Constructs a new tile component

<a name="Component+name"></a>

### tile.name : <code>string</code>
Name of the component. Expected to be unique among Components.

**Kind**: instance property of <code>[Tile](#Tile)</code>  
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

<a name="SpriteRenderer"></a>

## SpriteRenderer ⇐ <code>[System](#System)</code>
Renders all entities with Coord and Sprite components to the screen

**Kind**: global class  
**Extends:** <code>[System](#System)</code>  

* [SpriteRenderer](#SpriteRenderer) ⇐ <code>[System](#System)</code>
    * [new SpriteRenderer()](#new_SpriteRenderer_new)
    * [.tag](#System+tag) : <code>string</code>
    * [.draw(app)](#SpriteRenderer+draw)
    * [.reserve(app)](#System+reserve)
    * [.initialize(app)](#System+initialize)
    * [.update(app)](#System+update)
    * [.sense(app)](#System+sense)
    * [.attempt(app)](#System+attempt)

<a name="new_SpriteRenderer_new"></a>

### new SpriteRenderer()
Constructs a new SpriteRenderer

<a name="System+tag"></a>

### spriteRenderer.tag : <code>string</code>
Defines the overall role of this system. One of "renderer", "generator",
or "processor".

**Kind**: instance property of <code>[SpriteRenderer](#SpriteRenderer)</code>  
<a name="SpriteRenderer+draw"></a>

### spriteRenderer.draw(app)
Called once per frame to perform drawing logic

**Kind**: instance method of <code>[SpriteRenderer](#SpriteRenderer)</code>  
**Overrides:** <code>[draw](#System+draw)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+reserve"></a>

### spriteRenderer.reserve(app)
Hook for reserving input and ouput neurons in the Brain

**Kind**: instance method of <code>[SpriteRenderer](#SpriteRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+initialize"></a>

### spriteRenderer.initialize(app)
Initializes this system allowing it to perform one-time preparation logic

**Kind**: instance method of <code>[SpriteRenderer](#SpriteRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+update"></a>

### spriteRenderer.update(app)
Hook for updating the state of the world

**Kind**: instance method of <code>[SpriteRenderer](#SpriteRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+sense"></a>

### spriteRenderer.sense(app)
Hook for inputting sense data into the brain

**Kind**: instance method of <code>[SpriteRenderer](#SpriteRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+attempt"></a>

### spriteRenderer.attempt(app)
Hook for reading output data from the brain and attempting actions

**Kind**: instance method of <code>[SpriteRenderer](#SpriteRenderer)</code>  

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
        * [.name](#Component+name) : <code>string</code>
        * [.input(id, value)](#Brain+input)
        * [.output(id)](#Brain+output)
        * [.activate()](#Brain+activate)
    * _static_
        * [.inputNeuronCount](#Brain.inputNeuronCount) ⇒ <code>number</code>
        * [.outputNeuronCount](#Brain.outputNeuronCount) ⇒ <code>number</code>
        * [._inputNeuronCount](#Brain._inputNeuronCount) : <code>number</code>
        * [._outputNeuronCount](#Brain._outputNeuronCount) : <code>number</code>
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

<a name="Component+name"></a>

### brain.name : <code>string</code>
Name of the component. Expected to be unique among Components.

**Kind**: instance property of <code>[Brain](#Brain)</code>  
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
<a name="Brain.inputNeuronCount"></a>

### Brain.inputNeuronCount ⇒ <code>number</code>
Returns the total number of reserved input neurons

**Kind**: static property of <code>[Brain](#Brain)</code>  
**Returns**: <code>number</code> - total number of reserved input neurons  
<a name="Brain.outputNeuronCount"></a>

### Brain.outputNeuronCount ⇒ <code>number</code>
Returns the total number of reserved output neurons

**Kind**: static property of <code>[Brain](#Brain)</code>  
**Returns**: <code>number</code> - total number of reserved output neurons  
<a name="Brain._inputNeuronCount"></a>

### Brain._inputNeuronCount : <code>number</code>
The number of input neurons that every creature's brain will be initialized
with

**Kind**: static property of <code>[Brain](#Brain)</code>  
<a name="Brain._outputNeuronCount"></a>

### Brain._outputNeuronCount : <code>number</code>
The number of output neurons that every creature's brain will be initialized
with

**Kind**: static property of <code>[Brain](#Brain)</code>  
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
<a name="Creature"></a>

## Creature ⇐ <code>[Component](#Component)</code>
Intelligent organism with the capability to evolve

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  

* [Creature](#Creature) ⇐ <code>[Component](#Component)</code>
    * [new Creature()](#new_Creature_new)
    * [.name](#Component+name) : <code>string</code>

<a name="new_Creature_new"></a>

### new Creature()
Constructs a new creature component

<a name="Component+name"></a>

### creature.name : <code>string</code>
Name of the component. Expected to be unique among Components.

**Kind**: instance property of <code>[Creature](#Creature)</code>  
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
    * [.name](#Component+name) : <code>string</code>

<a name="new_DNA_new"></a>

### new DNA(inputCount, outputCount, random)
Constructs the DNA for a brand new creature with base traits and a brain
possessing the given number of input/output neurons


| Param | Type | Description |
| --- | --- | --- |
| inputCount | <code>number</code> | the total number of possible inputs (senses) to a creature's brain |
| outputCount | <code>number</code> | the total number of possible outputs (actions) from a creature's brain |
| random | <code>Object</code> | an instance of a random-js engine |

**Example**  

```js
// Creates DNA for a creature with the current count of reserved input and
// output neurons
const myDNA = new DNA(Brain.inputNeuronCount, Brain.outputNeuronCount, random);
```
<a name="DNA+brainStrand"></a>

### dnA.brainStrand : <code>[Strand](#Strand)</code>
Strand of genes describing a creature's brain

**Kind**: instance property of <code>[DNA](#DNA)</code>  
<a name="DNA+traitStrand"></a>

### dnA.traitStrand : <code>[Strand](#Strand)</code>
Strand of genes describing the trait function (TF)

**Kind**: instance property of <code>[DNA](#DNA)</code>  
<a name="Component+name"></a>

### dnA.name : <code>string</code>
Name of the component. Expected to be unique among Components.

**Kind**: instance property of <code>[DNA](#DNA)</code>  
<a name="AgingProcessor"></a>

## AgingProcessor ⇐ <code>[System](#System)</code>
Saps energy from creatures every tick

**Kind**: global class  
**Extends:** <code>[System](#System)</code>  

* [AgingProcessor](#AgingProcessor) ⇐ <code>[System](#System)</code>
    * [new AgingProcessor()](#new_AgingProcessor_new)
    * [.tag](#System+tag) : <code>string</code>
    * [.update(app)](#AgingProcessor+update)
    * [.reserve(app)](#System+reserve)
    * [.initialize(app)](#System+initialize)
    * [.draw(app)](#System+draw)
    * [.sense(app)](#System+sense)
    * [.attempt(app)](#System+attempt)

<a name="new_AgingProcessor_new"></a>

### new AgingProcessor()
Constructs a new AgingProcessor

<a name="System+tag"></a>

### agingProcessor.tag : <code>string</code>
Defines the overall role of this system. One of "renderer", "generator",
or "processor".

**Kind**: instance property of <code>[AgingProcessor](#AgingProcessor)</code>  
<a name="AgingProcessor+update"></a>

### agingProcessor.update(app)
Saps energy from all creatures every tick, removing them if they die

**Kind**: instance method of <code>[AgingProcessor](#AgingProcessor)</code>  
**Overrides:** <code>[update](#System+update)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+reserve"></a>

### agingProcessor.reserve(app)
Hook for reserving input and ouput neurons in the Brain

**Kind**: instance method of <code>[AgingProcessor](#AgingProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+initialize"></a>

### agingProcessor.initialize(app)
Initializes this system allowing it to perform one-time preparation logic

**Kind**: instance method of <code>[AgingProcessor](#AgingProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+draw"></a>

### agingProcessor.draw(app)
Called once per frame to perform drawing logic

**Kind**: instance method of <code>[AgingProcessor](#AgingProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+sense"></a>

### agingProcessor.sense(app)
Hook for inputting sense data into the brain

**Kind**: instance method of <code>[AgingProcessor](#AgingProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+attempt"></a>

### agingProcessor.attempt(app)
Hook for reading output data from the brain and attempting actions

**Kind**: instance method of <code>[AgingProcessor](#AgingProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="BrainProcessor"></a>

## BrainProcessor ⇐ <code>[System](#System)</code>
Activates the brains of all creatures

**Kind**: global class  
**Extends:** <code>[System](#System)</code>  

* [BrainProcessor](#BrainProcessor) ⇐ <code>[System](#System)</code>
    * [new BrainProcessor()](#new_BrainProcessor_new)
    * [.tag](#System+tag) : <code>string</code>
    * [.think(app)](#BrainProcessor+think)
    * [.reserve(app)](#System+reserve)
    * [.initialize(app)](#System+initialize)
    * [.update(app)](#System+update)
    * [.draw(app)](#System+draw)
    * [.sense(app)](#System+sense)
    * [.attempt(app)](#System+attempt)

<a name="new_BrainProcessor_new"></a>

### new BrainProcessor()
Constructs a new BrainProcessor

<a name="System+tag"></a>

### brainProcessor.tag : <code>string</code>
Defines the overall role of this system. One of "renderer", "generator",
or "processor".

**Kind**: instance property of <code>[BrainProcessor](#BrainProcessor)</code>  
<a name="BrainProcessor+think"></a>

### brainProcessor.think(app)
Activates the brain of every creature

**Kind**: instance method of <code>[BrainProcessor](#BrainProcessor)</code>  
**Overrides:** <code>System#think</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+reserve"></a>

### brainProcessor.reserve(app)
Hook for reserving input and ouput neurons in the Brain

**Kind**: instance method of <code>[BrainProcessor](#BrainProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+initialize"></a>

### brainProcessor.initialize(app)
Initializes this system allowing it to perform one-time preparation logic

**Kind**: instance method of <code>[BrainProcessor](#BrainProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+update"></a>

### brainProcessor.update(app)
Hook for updating the state of the world

**Kind**: instance method of <code>[BrainProcessor](#BrainProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+draw"></a>

### brainProcessor.draw(app)
Called once per frame to perform drawing logic

**Kind**: instance method of <code>[BrainProcessor](#BrainProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+sense"></a>

### brainProcessor.sense(app)
Hook for inputting sense data into the brain

**Kind**: instance method of <code>[BrainProcessor](#BrainProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+attempt"></a>

### brainProcessor.attempt(app)
Hook for reading output data from the brain and attempting actions

**Kind**: instance method of <code>[BrainProcessor](#BrainProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="CreatureGenerator"></a>

## CreatureGenerator ⇐ <code>[System](#System)</code>
Generates initial creatures with random DNA

**Kind**: global class  
**Extends:** <code>[System](#System)</code>  
**See**: [Creature](#Creature)  

* [CreatureGenerator](#CreatureGenerator) ⇐ <code>[System](#System)</code>
    * [new CreatureGenerator()](#new_CreatureGenerator_new)
    * [.tag](#System+tag) : <code>string</code>
    * [.initialize(app)](#CreatureGenerator+initialize)
    * [.reserve(app)](#System+reserve)
    * [.update(app)](#System+update)
    * [.draw(app)](#System+draw)
    * [.sense(app)](#System+sense)
    * [.attempt(app)](#System+attempt)

<a name="new_CreatureGenerator_new"></a>

### new CreatureGenerator()
Constructs a new CreatureGenerator

<a name="System+tag"></a>

### creatureGenerator.tag : <code>string</code>
Defines the overall role of this system. One of "renderer", "generator",
or "processor".

**Kind**: instance property of <code>[CreatureGenerator](#CreatureGenerator)</code>  
<a name="CreatureGenerator+initialize"></a>

### creatureGenerator.initialize(app)
Seeds the world with creatures

**Kind**: instance method of <code>[CreatureGenerator](#CreatureGenerator)</code>  
**Overrides:** <code>[initialize](#System+initialize)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+reserve"></a>

### creatureGenerator.reserve(app)
Hook for reserving input and ouput neurons in the Brain

**Kind**: instance method of <code>[CreatureGenerator](#CreatureGenerator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+update"></a>

### creatureGenerator.update(app)
Hook for updating the state of the world

**Kind**: instance method of <code>[CreatureGenerator](#CreatureGenerator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+draw"></a>

### creatureGenerator.draw(app)
Called once per frame to perform drawing logic

**Kind**: instance method of <code>[CreatureGenerator](#CreatureGenerator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+sense"></a>

### creatureGenerator.sense(app)
Hook for inputting sense data into the brain

**Kind**: instance method of <code>[CreatureGenerator](#CreatureGenerator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+attempt"></a>

### creatureGenerator.attempt(app)
Hook for reading output data from the brain and attempting actions

**Kind**: instance method of <code>[CreatureGenerator](#CreatureGenerator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="EatingProcessor"></a>

## EatingProcessor ⇐ <code>[System](#System)</code>
Processes the eating of plants by creatures

**Kind**: global class  
**Extends:** <code>[System](#System)</code>  

* [EatingProcessor](#EatingProcessor) ⇐ <code>[System](#System)</code>
    * [new EatingProcessor()](#new_EatingProcessor_new)
    * [.tag](#System+tag) : <code>string</code>
    * [.update(app)](#EatingProcessor+update)
    * [.reserve(app)](#System+reserve)
    * [.initialize(app)](#System+initialize)
    * [.draw(app)](#System+draw)
    * [.sense(app)](#System+sense)
    * [.attempt(app)](#System+attempt)

<a name="new_EatingProcessor_new"></a>

### new EatingProcessor()
Constructs a new EatingProcessor

<a name="System+tag"></a>

### eatingProcessor.tag : <code>string</code>
Defines the overall role of this system. One of "renderer", "generator",
or "processor".

**Kind**: instance property of <code>[EatingProcessor](#EatingProcessor)</code>  
<a name="EatingProcessor+update"></a>

### eatingProcessor.update(app)
Resolves the event of a creature and plant residing in the same tile
to the creature eating that plant

**Kind**: instance method of <code>[EatingProcessor](#EatingProcessor)</code>  
**Overrides:** <code>[update](#System+update)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+reserve"></a>

### eatingProcessor.reserve(app)
Hook for reserving input and ouput neurons in the Brain

**Kind**: instance method of <code>[EatingProcessor](#EatingProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+initialize"></a>

### eatingProcessor.initialize(app)
Initializes this system allowing it to perform one-time preparation logic

**Kind**: instance method of <code>[EatingProcessor](#EatingProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+draw"></a>

### eatingProcessor.draw(app)
Called once per frame to perform drawing logic

**Kind**: instance method of <code>[EatingProcessor](#EatingProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+sense"></a>

### eatingProcessor.sense(app)
Hook for inputting sense data into the brain

**Kind**: instance method of <code>[EatingProcessor](#EatingProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+attempt"></a>

### eatingProcessor.attempt(app)
Hook for reading output data from the brain and attempting actions

**Kind**: instance method of <code>[EatingProcessor](#EatingProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="MovementProcessor"></a>

## MovementProcessor ⇐ <code>[System](#System)</code>
Processes locomotion for creatures

**Kind**: global class  
**Extends:** <code>[System](#System)</code>  

* [MovementProcessor](#MovementProcessor) ⇐ <code>[System](#System)</code>
    * [new MovementProcessor()](#new_MovementProcessor_new)
    * [.tag](#System+tag) : <code>string</code>
    * [.reserve(app)](#MovementProcessor+reserve)
    * [.initialize(app)](#MovementProcessor+initialize)
    * [.attempt(app)](#MovementProcessor+attempt)
    * [.update(app)](#MovementProcessor+update)
    * [._hashCoord(coord)](#MovementProcessor+_hashCoord) ⇒ <code>string</code>
    * [._unhashCoord(hash)](#MovementProcessor+_unhashCoord) ⇒ <code>[Coord](#Coord)</code>
    * [.draw(app)](#System+draw)
    * [.sense(app)](#System+sense)

<a name="new_MovementProcessor_new"></a>

### new MovementProcessor()
Constructs a new MovementProcessor

<a name="System+tag"></a>

### movementProcessor.tag : <code>string</code>
Defines the overall role of this system. One of "renderer", "generator",
or "processor".

**Kind**: instance property of <code>[MovementProcessor](#MovementProcessor)</code>  
<a name="MovementProcessor+reserve"></a>

### movementProcessor.reserve(app)
Reserves 7 output neurons, one for each direction plus no direction

**Kind**: instance method of <code>[MovementProcessor](#MovementProcessor)</code>  
**Overrides:** <code>[reserve](#System+reserve)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="MovementProcessor+initialize"></a>

### movementProcessor.initialize(app)
Prepares the system for use

**Kind**: instance method of <code>[MovementProcessor](#MovementProcessor)</code>  
**Overrides:** <code>[initialize](#System+initialize)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="MovementProcessor+attempt"></a>

### movementProcessor.attempt(app)
Makes plans to move a creature in the most prevailing direction signaled
by the brain

**Kind**: instance method of <code>[MovementProcessor](#MovementProcessor)</code>  
**Overrides:** <code>[attempt](#System+attempt)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="MovementProcessor+update"></a>

### movementProcessor.update(app)
Moves creature to their planned positions

**Kind**: instance method of <code>[MovementProcessor](#MovementProcessor)</code>  
**Overrides:** <code>[update](#System+update)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="MovementProcessor+_hashCoord"></a>

### movementProcessor._hashCoord(coord) ⇒ <code>string</code>
Hashes a Coord instance for use as an object key

**Kind**: instance method of <code>[MovementProcessor](#MovementProcessor)</code>  
**Returns**: <code>string</code> - hashed version of the given coord  

| Param | Type | Description |
| --- | --- | --- |
| coord | <code>[Coord](#Coord)</code> | the coord to hash |

<a name="MovementProcessor+_unhashCoord"></a>

### movementProcessor._unhashCoord(hash) ⇒ <code>[Coord](#Coord)</code>
Reverses the effect of hashing a Coord instance using _hashCoord

**Kind**: instance method of <code>[MovementProcessor](#MovementProcessor)</code>  
**Returns**: <code>[Coord](#Coord)</code> - the restored Coord instance  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>string</code> | the hashed Coord instance |

<a name="System+draw"></a>

### movementProcessor.draw(app)
Called once per frame to perform drawing logic

**Kind**: instance method of <code>[MovementProcessor](#MovementProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+sense"></a>

### movementProcessor.sense(app)
Hook for inputting sense data into the brain

**Kind**: instance method of <code>[MovementProcessor](#MovementProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="TouchProcessor"></a>

## TouchProcessor ⇐ <code>[System](#System)</code>
Inputs touch sense data into the brains of creatures

**Kind**: global class  
**Extends:** <code>[System](#System)</code>  

* [TouchProcessor](#TouchProcessor) ⇐ <code>[System](#System)</code>
    * [new TouchProcessor()](#new_TouchProcessor_new)
    * [.tag](#System+tag) : <code>string</code>
    * [.reserve(app)](#TouchProcessor+reserve)
    * [.sense(app)](#TouchProcessor+sense)
    * [.initialize(app)](#System+initialize)
    * [.update(app)](#System+update)
    * [.draw(app)](#System+draw)
    * [.attempt(app)](#System+attempt)

<a name="new_TouchProcessor_new"></a>

### new TouchProcessor()
Constructs a new TouchProcessor

<a name="System+tag"></a>

### touchProcessor.tag : <code>string</code>
Defines the overall role of this system. One of "renderer", "generator",
or "processor".

**Kind**: instance property of <code>[TouchProcessor](#TouchProcessor)</code>  
<a name="TouchProcessor+reserve"></a>

### touchProcessor.reserve(app)
Reserves 6 input neurons, one for each touch direction

**Kind**: instance method of <code>[TouchProcessor](#TouchProcessor)</code>  
**Overrides:** <code>[reserve](#System+reserve)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="TouchProcessor+sense"></a>

### touchProcessor.sense(app)
Inputs touch sense data into the brain. Inputs a 1 for plant, 0.5 for
creature, and 0 for no item present.

**Kind**: instance method of <code>[TouchProcessor](#TouchProcessor)</code>  
**Overrides:** <code>[sense](#System+sense)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+initialize"></a>

### touchProcessor.initialize(app)
Initializes this system allowing it to perform one-time preparation logic

**Kind**: instance method of <code>[TouchProcessor](#TouchProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+update"></a>

### touchProcessor.update(app)
Hook for updating the state of the world

**Kind**: instance method of <code>[TouchProcessor](#TouchProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+draw"></a>

### touchProcessor.draw(app)
Called once per frame to perform drawing logic

**Kind**: instance method of <code>[TouchProcessor](#TouchProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="System+attempt"></a>

### touchProcessor.attempt(app)
Hook for reading output data from the brain and attempting actions

**Kind**: instance method of <code>[TouchProcessor](#TouchProcessor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>[App](#App)</code> | the currently running GS app |

<a name="Plant"></a>

## Plant ⇐ <code>[Component](#Component)</code>
An edible plant

**Kind**: global class  
**Extends:** <code>[Component](#Component)</code>  

* [Plant](#Plant) ⇐ <code>[Component](#Component)</code>
    * [new Plant()](#new_Plant_new)
    * [.name](#Component+name) : <code>string</code>

<a name="new_Plant_new"></a>

### new Plant()
Creates a new plant

<a name="Component+name"></a>

### plant.name : <code>string</code>
Name of the component. Expected to be unique among Components.

**Kind**: instance property of <code>[Plant](#Plant)</code>  
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
<a name="CoordEntityIndex"></a>

## CoordEntityIndex
An index providing fast lookup of Entities by their coordinate position

**Kind**: global class  

* [CoordEntityIndex](#CoordEntityIndex)
    * [new CoordEntityIndex()](#new_CoordEntityIndex_new)
    * [.length](#CoordEntityIndex+length) ⇒ <code>number</code>
    * [.rebuild(entities)](#CoordEntityIndex+rebuild)
    * [.findEntitiesAt(coord)](#CoordEntityIndex+findEntitiesAt) ⇒ <code>[Array.&lt;Entity&gt;](#Entity)</code>

<a name="new_CoordEntityIndex_new"></a>

### new CoordEntityIndex()
Constructs an empty CoordEntityIndex

<a name="CoordEntityIndex+length"></a>

### coordEntityIndex.length ⇒ <code>number</code>
Returns the current number of entities stored in the index

**Kind**: instance property of <code>[CoordEntityIndex](#CoordEntityIndex)</code>  
**Returns**: <code>number</code> - current number of entities stored in the index  
<a name="CoordEntityIndex+rebuild"></a>

### coordEntityIndex.rebuild(entities)
Rebuilds the index of the given entities for fast lookup by their coordinate
positions (Coord component). If an entity does not contain a Coord
component, it is not included in the index.

**Kind**: instance method of <code>[CoordEntityIndex](#CoordEntityIndex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| entities | <code>[Array.&lt;Entity&gt;](#Entity)</code> | array of entities to build the index for |

<a name="CoordEntityIndex+findEntitiesAt"></a>

### coordEntityIndex.findEntitiesAt(coord) ⇒ <code>[Array.&lt;Entity&gt;](#Entity)</code>
Returns an array of entities that are located at the given coordinate

**Kind**: instance method of <code>[CoordEntityIndex](#CoordEntityIndex)</code>  
**Returns**: <code>[Array.&lt;Entity&gt;](#Entity)</code> - array of entities with given coordinates  

| Param | Type | Description |
| --- | --- | --- |
| coord | <code>[Coord](#Coord)</code> | coordinate |

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
<a name="creatures"></a>

## creatures : <code>Object</code>
Creature configuration options

**Kind**: global constant  

* [creatures](#creatures) : <code>Object</code>
    * [.creatureRate](#creatures.creatureRate) : <code>number</code>
    * [.initialEnergy](#creatures.initialEnergy) : <code>number</code>
    * [.moveCost](#creatures.moveCost) : <code>number</code>
    * [.tickCost](#creatures.tickCost) : <code>number</code>

<a name="creatures.creatureRate"></a>

### creatures.creatureRate : <code>number</code>
The chance that each tile has of spawning an initial creature

**Kind**: static property of <code>[creatures](#creatures)</code>  
<a name="creatures.initialEnergy"></a>

### creatures.initialEnergy : <code>number</code>
The amount of energy every creature starts with

**Kind**: static property of <code>[creatures](#creatures)</code>  
<a name="creatures.moveCost"></a>

### creatures.moveCost : <code>number</code>
The amount of energy expended to move one tile

**Kind**: static property of <code>[creatures](#creatures)</code>  
<a name="creatures.tickCost"></a>

### creatures.tickCost : <code>number</code>
The amount of energy expended per tick regardless of action taken

**Kind**: static property of <code>[creatures](#creatures)</code>  
<a name="plants"></a>

## plants : <code>Object</code>
Plant configuration options

**Kind**: global constant  

* [plants](#plants) : <code>Object</code>
    * [.vegetationRate](#plants.vegetationRate) : <code>number</code>
    * [.plantEnergy](#plants.plantEnergy) : <code>number</code>

<a name="plants.vegetationRate"></a>

### plants.vegetationRate : <code>number</code>
The percentage of the grid that will be covered in vegetation

**Kind**: static property of <code>[plants](#plants)</code>  
<a name="plants.plantEnergy"></a>

### plants.plantEnergy : <code>number</code>
Energy contained in a plant

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
    * [.getSprite(name, paper)](#Theme.getSprite) ⇒ <code>Item</code>

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
<a name="Theme.getSprite"></a>

### Theme.getSprite(name, paper) ⇒ <code>Item</code>
Retrieves a [Paper.js item](http://paperjs.org/reference/item/)
for the given sprite name as defined by the current theme, or the default
sprite if the given name is not defined

**Kind**: static method of <code>[Theme](#Theme)</code>  
**Returns**: <code>Item</code> - a Paper.js Item instance  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the sprite |
| paper | <code>PaperScope</code> | an active paper scope |

<a name="buildTile"></a>

## buildTile(coord) ⇒ <code>[Entity](#Entity)</code>
Builds a tile entity

**Kind**: global function  
**Returns**: <code>[Entity](#Entity)</code> - the built tile entity  

| Param | Type | Description |
| --- | --- | --- |
| coord | <code>[Coord](#Coord)</code> | coordinate to place the tile entity at |

<a name="buildCreature"></a>

## buildCreature(dna, coord) ⇒ <code>[Entity](#Entity)</code>
Builds a creature entity with the given DNA at the given position

**Kind**: global function  
**Returns**: <code>[Entity](#Entity)</code> - the built creature entity  

| Param | Type | Description |
| --- | --- | --- |
| dna | <code>[DNA](#DNA)</code> | genetic representation of the creature |
| coord | <code>[Coord](#Coord)</code> | coordinate to place the creature entity at |

<a name="buildDefaultCreature"></a>

## buildDefaultCreature(coord, random) ⇒ <code>[Entity](#Entity)</code>
Builds a creature entity with the default initial DNA at the given position

**Kind**: global function  
**Returns**: <code>[Entity](#Entity)</code> - the built creature entity  

| Param | Type | Description |
| --- | --- | --- |
| coord | <code>[Coord](#Coord)</code> | coordinate to place the creature entity at |
| random | <code>Object</code> | an instance of a random-js engine |

<a name="buildPlant"></a>

## buildPlant(energyLevel, coord)
Builds a plant entity with the given energy level at the given position

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| energyLevel | <code>number</code> | initial energy level of the plant |
| coord | <code>[Coord](#Coord)</code> | coordinate to place the plant entity at |

