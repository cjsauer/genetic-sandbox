import System from "../../../ecs/System";
import Theme from "../../../themes/Theme";

/**
 * Renders the background
 * @extends System
 */
class BackgroundRenderer extends System {
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
}

export default BackgroundRenderer;
