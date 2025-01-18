import { registerRootComponent } from 'expo'
import 'formdata-polyfill'
import App from './src/app/App.tsx'

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(
// 	<View>
// 		<Text>Hello World</Text>
// 	</View>,
// )
registerRootComponent(App)
