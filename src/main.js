// Load main.html into the build folder using the webpack file-loader so that
// it becomes the "homepage"
import "file?name=index.html!./main.html";

// Load the reset stylesheet to get consistent styling across browsers
import "./styles/reset.css";

// Load the GS theme
import "./styles/theme.css";

// Import the Paper.js vector grahics library
import paper from "paper";

// Import the main Genetic Sandbox application
import App from "./modules/App";

// Export the GS bootstrapping function
window.GeneticSandbox = function(canvas) {
  function fitToContainer() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  // Resize the canvas to fill its containing element
  window.onresize = fitToContainer;
  fitToContainer();

  // Add systems to this list to include them in the processing loop
  let systems = [
  ];

  // Create an empty paper project and view attached to the given canvas
  let paperScope = new paper.PaperScope();
  paperScope.setup(canvas);

  const app = new App(systems, paperScope);
  app.initialize();

  return app;
};
