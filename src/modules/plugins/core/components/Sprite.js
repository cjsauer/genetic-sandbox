import Component from "../../../ecs/Component";
import Theme from "../../../themes/Theme";

/**
 * Graphical representation of an entity
 * @extends Component
 */
class Sprite extends Component {
  /**
   * Constructs a new sprite component with the given graphic defined by the
   * current theme, or falls back to the "default" graphic if not defined
   * @param {string} spriteName - the name of the graphic as defined by the
   * current theme
   */
  constructor(spriteName) {
    super("sprite");

    if (arguments.length === 0) return;

    /**
    * Name of the graphic that this sprite represents as defined by the
    * current theme
    * @type {string}
    */
    this.spriteName = spriteName;
  }

  /**
   * Returns a [Paper.js Item]{@link http://paperjs.org/reference/item}
   * instance representing the vector graphic of this sprite
   * @param {PaperScope} paper - an active paper scope
   * @returns {Item} Paper.js Item instance
   */
  getItem(paper) {
    if (this._item === undefined) {
      this._item = Theme.getSprite(this.spriteName, paper);
    }

    return this._item;
  }
}

Component.register(Sprite);

export default Sprite;
