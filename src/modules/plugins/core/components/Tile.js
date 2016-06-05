import Component from "../../../ecs/Component";

/**
 * Tile is a location in the world that an entity can exist at
 * @extends Component
 */
class Tile extends Component {
  /**
   * Constructs a new tile component
   */
  constructor() {
    super("tile");
  }
}

Component.register(Tile);

export default Tile;
