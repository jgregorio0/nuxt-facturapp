var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath, //was publicPath: webpackConfig.output.publicPath,
    quiet: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
  })