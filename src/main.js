// Load main.html into the build folder using the webpack file-loader so that
// it becomes the "homepage"
import "file?name=index.html!./main.html";

// Stylesheets
import "./styles/reset.css";
import "./styles/style.css";

import paper from "paper";
import App from "./modules/App";
import HexGrid from "./modules/grid/HexGrid";

// Import all systems
import PlantGenerator from "./modules/plugins/plants/systems/PlantGenerator";
import BackgroundRenderer from "./modules/plugins/core/systems/BackgroundRenderer";
import GridRenderer from "./modules/plugins/core/systems/GridRenderer";
import PlantRenderer from "./modules/plugins/plants/systems/PlantRenderer";

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

  // Add systems to this list to include them in the processing loop
  const systems = [
    // Generators
    new PlantGenerator(),

    // Renderers
    new BackgroundRenderer(),
    new GridRenderer(),
    new PlantRenderer()
  ];

  // Create the universe!
  const grid = new HexGrid(25);

  // Finally, create an instance of App and initialize it
  const app = new App(grid, systems, paperScope, seed);
  app.initialize();

  return app;
};
