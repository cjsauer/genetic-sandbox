// Load main.html into the build folder using the webpack file-loader so that
// it becomes the "homepage"
import "file?name=index.html!./main.html";

// Load the main stylesheet
import "./styles/reset.css";

// Import the Paper.js vector grahics library
import paper from "paper";

// Import the main Genetic Sandbox application
import App from "./modules/App";

// Export the GS bootstrapping function
window.GeneticSandbox = function(canvas) {
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
