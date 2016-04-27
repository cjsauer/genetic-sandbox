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
import DefaultGridRenderSystem from "./modules/systems/DefaultGridRenderSystem";

// Export the GS bootstrapping function
window.GeneticSandbox = function (canvas) {
  // Fits the canvas to its containing DOM element
  function fitToContainer() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  fitToContainer();

  // Create an empty paper project and view attached to the given canvas
  const paperScope = new paper.PaperScope();
  paperScope.setup(canvas);

  // If the window is resized, refit the canvas again, and then subsequently
  // refit the paper view to match.
  window.onresize = function() {
    fitToContainer();
    paperScope.view.viewSize = new paperScope.Size(canvas.width, canvas.height);
  };

  // Add systems to this list to include them in the processing loop
  const systems = [
    new DefaultGridRenderSystem()
  ];

  // Create the universe!
  const grid = new HexGrid(25);

  // Finally, create an instance of App and initialize it
  const app = new App(grid, systems, paperScope);
  app.initialize();

  return app;
};
