const path = require('path-browserify');

module.exports = function override(config) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        path: path
    };
    return config;
};
