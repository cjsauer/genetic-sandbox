// Load main.html into the build folder using the webpack file-loader so that
// it becomes the "homepage"
import "file?name=index.html!./main.html";

// Load the main stylesheet
import "./styles/reset.css";

// Import and bootstrap the application!
import App from "./modules/App";

// Add systems to this list to include them in the processing loop
let systems = [
];

const app = new App(systems);
app.initialize();

// TODO: Implement a more formal game loop
app.update();

console.log("Genetic Sandbox is up and running!");
