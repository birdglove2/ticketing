module.exports = {
  webpackDevMiiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
