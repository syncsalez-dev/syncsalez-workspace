import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsScreen from './screens/products'

const Stack = createStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Products">
				<Stack.Screen name="Products" component={ProductsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
