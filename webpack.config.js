var webpack = require("webpack");
var CleanPlugin = require("clean-webpack-plugin");
var production = process.env.NODE_ENV === "production";
var exec = require("child_process").exec;

// Plugin to build the documentation
function DocumentationBuildPlugin(options) { }
DocumentationBuildPlugin.prototype.apply = function(compiler) {
  console.log("Building documentation...");
  exec("npm run docs");
};

var plugins = [
  // Dev and production plugins
];

if (production) {
  plugins = plugins.concat([
    // Production only plugins

    // Cleanup the build/ folder before compiling production assets
    new CleanPlugin("build"),

    // Looks for similar chunks and files and merges them for better caching
    // by the user
    new webpack.optimize.DedupePlugin(),

    // Optimizes chunks and modules by how much they are used in your app
    new webpack.optimize.OccurenceOrderPlugin(),

    // This plugin prevents Webpack from creating chunks that would be
    // too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200 // ~50kb
    }),

    // This plugin minifies all the Javascript code of the final bundle
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false // Suppress uglification warnings
      }
    }),

    // Defines various variables that we can set to false
    // in production to avoid code related to them from being compiled
    // in our final bundle
    new webpack.DefinePlugin({
      __SERVER__: !production,
      __DEVELOPMENT__: !production,
      __DEVTOOLS__: !production,
      "process.env": {
        BABEL_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]);
} else {
  // Development only plugins
  plugins = plugins.concat([
    new DocumentationBuildPlugin()
  ]);
}

module.exports = {
  debug: !production,
  // Source map generation
  devtool: production ? false : "eval",
  entry: "./src/main.js",
  output: {
    path: "build",
    filename: "genetic-sandbox.js"
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        // Run all .js files through Babel
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["es2015"]
        }
      },
      {
        // Load and immediately apply all CSS files
        test: /\.css$/,
        loader: "style!css"
      }
    ]
  }
};
