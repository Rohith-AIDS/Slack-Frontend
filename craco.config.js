const path = require('path-browserify');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.resolve.fallback = {
                ...webpackConfig.resolve.fallback,
                path: path
            };
            return webpackConfig;
        },
    },
};
