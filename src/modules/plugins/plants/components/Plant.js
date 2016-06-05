import Component from "../../../ecs/Component";

/**
 * An edible plant
 * @extends Component
 */
class Plant extends Component {
  /**
   * Creates a new plant
   */
  constructor() {
    super("plant");
  }
}

Component.register(Plant);

export default Plant;
