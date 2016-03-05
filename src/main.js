// Load main.html into the build folder using the webpack file-loader so that
// it becomes the "homepage"
import 'file?name=index.html!./main.html';

// Load the main stylesheet
import './styles/reset.css';

// Load and bootstrap the main application
import App from './modules/App.js';
const app = new App();
