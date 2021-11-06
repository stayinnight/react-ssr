const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require('../development/webpack.client');

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer};
const server = new WebpackDevServer(devServerOptions, compiler);

server.startCallback(() => {
  console.log("http://localhost:3001");
});