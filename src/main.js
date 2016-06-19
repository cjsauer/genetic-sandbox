// Load main.html as index.html into the build folder using the webpack
// file-loader so that it becomes the "homepage"
import "file?name=index.html!./main.html";

// Stylesheets
import "./styles/reset.css";
import "./styles/style.css";

import paper from "paper";
import App from "./modules/App";
import World from "./modules/ecs/World";
import HexGrid from "./modules/grid/HexGrid";
import config, { plugins } from "./modules/config";

// Export the GS bootstrapping function
window.GeneticSandbox = function (canvas, seed) {
  // Create an empty paper project and view attached to the given canvas
  const paperScope = new paper.PaperScope();
  paperScope.setup(canvas);

  // Fits the canvas to its containing DOM element
  function fitToContainer() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    paperScope.view.viewSize = new paperScope.Size(canvas.width, canvas.height);
  }
  window.onresize = fitToContainer();
  fitToContainer();

  // Build the World and fill it with tiles
  const world = new World();
  const grid = new HexGrid(config.core.gridRadius);
  world.addEntities(grid.buildTiles());

  // Finally, create an instance of App and initialize it
  const app = new App(world, grid, paperScope);
  app.initialize(plugins, seed);

  return app;
};
