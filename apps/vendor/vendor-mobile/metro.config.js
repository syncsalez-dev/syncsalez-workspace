const { withNxMetro } = require('@nx/expo')
const { getDefaultConfig } = require('@expo/metro-config')
const { mergeConfig } = require('metro-config')

// Default Metro configuration from Expo
const defaultConfig = getDefaultConfig(__dirname)
const { assetExts, sourceExts } = defaultConfig.resolver

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
	cacheVersion: 'vendor-mobile', // Cache versioning for Nx
	transformer: {
		babelTransformerPath: require.resolve('react-native-svg-transformer'), // SVG transformer
	},
	resolver: {
		assetExts: assetExts.filter((ext) => ext !== 'svg'), // Exclude SVG from asset extensions
		sourceExts: [...sourceExts, 'cjs', 'mjs', 'svg'], // Include additional source extensions
	},
}

// Export the merged configuration
module.exports = withNxMetro(mergeConfig(defaultConfig, customConfig), {
	// Enable debugging if needed
	debug: false,
	// Specify additional file extensions for imports (if any)
	extensions: [],
	// Specify additional folders to watch (if any)
	watchFolders: [],
})
