import ISystem from "../ISystem";
import Theme from "../../themes/Theme";

/**
 * Renders the background
 * @extends ISystem
 */
class BackgroundRenderer extends ISystem {
  /**
   * Constructs a new BackgroundRenderer
   */
  constructor() {
    super("renderer");
  }

  /**
   * Renders the background
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
   * Called once per tick. No-op for BackgroundRenderer.
   * @param {App} app - the currently running GS app
   */
  update(app) {
  }
}

export default BackgroundRenderer;
