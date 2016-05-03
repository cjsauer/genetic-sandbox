import ISystem from "../ISystem";
import Theme from "../../themes/Theme";

/**
 * Renders the background
 */
class BackgroundRenderer extends ISystem {
  /**
   * Constructs a new BackgroundRenderer
   */
  constructor() {
    super("renderer");
  }

  /**
   * Initializes this system preparing it for rendering
   * @param {App} app - the currently running GS app
   */
  initialize(app) {
    const { Layer, Path, view } = app.paper;

    this._backgroundLayer = new Layer();
    this._backgroundPath = new Path.Rectangle({
      rectangle: view.bounds,
      style: Theme.current.backgroundStyle
    });
  }

  /**
   * Called once per tick to recenter the background layer
   * @param {App} app - the currently running GS app
   */
  update(app) {
    this._backgroundPath.bounds = app.paper.view.bounds;
  }
}

export default BackgroundRenderer;
