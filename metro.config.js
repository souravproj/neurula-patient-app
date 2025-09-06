const { getDefaultConfig } = require('expo/metro-config');
const os = require('os');

// Polyfill for os.availableParallelism for Node.js < 18.14.0
if (!os.availableParallelism) {
  os.availableParallelism = () => os.cpus().length;
}

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
};

// Explicit maxWorkers configuration to avoid issues
config.maxWorkers = Math.max(1, Math.floor(os.cpus().length / 2));

module.exports = config;