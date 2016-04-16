// Load main.html into the build folder using the webpack file-loader so that
// it becomes the "homepage"
import "file?name=index.html!./main.html";

// Load the main stylesheet
import "./styles/reset.css";

// Import and bootstrap the application!
import App from "./modules/App";

const app = new App();
app.initialize();

// TODO: Implement a more formal game loop
app.update();

console.log("Genetic Sandbox is up and running!");
