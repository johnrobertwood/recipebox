module.exports = {
  entry: "./src/js/index.jsx",
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader" },
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};