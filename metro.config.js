/*const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
 */

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// SVG-Transformer-Konfiguration hinzufügen
config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
};

config.resolver = {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...config.resolver.sourceExts, "svg"],
};

// NativeWind-Konfiguration anwenden
module.exports = withNativeWind(config, { input: "./global.css" });