// @ts-check
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_TEST,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require("next/constants");

module.exports = (/** @type {string} */ phase, { defaultConfig }) => {
  if (phase === PHASE_TEST) {
    return {
      /* test only config options here */
    };
  } else if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
    };
  } else if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      /* production build only config options here */
    };
  } else if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      /* production only config options here */
    };
  }

  return {
    /* config options for all phases except above defined here */
    webpack: (
      /** @type {{ resolve: { fallback: { "mongodb-client-encryption": boolean; aws4: boolean; }; }; }} */ config,
    ) => {
      config.resolve.fallback = {
        "mongodb-client-encryption": false,
        "aws4": false,
      };

      return config;
    },
    experimental: {
      turbo: {
        rules: {
          "*.svg": {
            loaders: ["@svgr/webpack"],
            as: "*.js",
          },
        },
      },
    },
  };
};
