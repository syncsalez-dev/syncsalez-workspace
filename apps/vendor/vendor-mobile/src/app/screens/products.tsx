import NetInfo from '@react-native-community/netinfo'
import React, { useEffect, useState } from 'react'
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { initializeDatabase } from '../offlineDB/database'
import {
	addProductToServer,
	getOfflineProducts,
	product_type,
	saveProductOffline,
} from '../offlineDB/product-api/productsDB'
import { syncGetAndCompare, syncOperation } from '../offlineDB/syncOffline_Online'

const ProductsScreen: React.FC = () => {
	const [products, setProducts] = useState<Array<product_type>>([])
	const [name, setName] = useState('')
	const [quantity, setQuantity] = useState('')
	const [price, setPrice] = useState('')
	const [isOnline, setIsOnline] = useState(false)

	useEffect(() => {
		initializeDatabase()
		loadProducts()

		// Listen for network changes
		const unsubscribe = NetInfo.addEventListener((state) => {
			const isConnected = state.isConnected ?? false // Handle null by defaulting to false
			const isInternetReachable = state.isInternetReachable ?? false // Handle null by defaulting to false
			setIsOnline(isConnected && isInternetReachable) // Combine both into a boolean

			if (isConnected && isInternetReachable) {
				syncProducts() // Sync automatically when back online
			}
		})

		// Cleanup listener on unmount
		return () => unsubscribe()
	}, [])

	const loadProducts = async () => {
		const p = await getOfflineProducts()
		// await syncOperation('GET', '/products')
		await syncGetAndCompare('/products', getOfflineProducts, saveProductOffline, addProductToServer)

		setProducts(p)
		console.log('products:  ', p)
	}

	const addProduct = async () => {
		const id = Math.random().toString(36).substring(7) // Generate a random ID
		const newProduct = { id, name, quantity: parseInt(quantity), price: parseFloat(price) }

		await saveProductOffline(newProduct)
		setProducts((prev) => [...prev, newProduct])
		await syncOperation('ADD', '/products', newProduct)
		// Reset input states
		setName('')
		setQuantity('')
		setPrice('')
	}
	console.log('--->', isOnline)

	const syncProducts = async () => {
		if (!isOnline) {
			Alert.alert('Offline', 'You need to be online to sync products.')
		} else {
			try {
				// await syncOfflineActions()
				await syncGetAndCompare(
					'/products',
					getOfflineProducts,
					saveProductOffline,
					addProductToServer,
				)
				Alert.alert('Success', 'Synced with the server!')
			} catch (error) {
				Alert.alert('Error', 'Failed to sync with the server. Please try again later.')
				console.error('Error syncing products:', error)
			}
		}
	}

	return (
		<View style={styles.container}>
			<View style={[styles.onlineIndicator, { backgroundColor: isOnline ? 'green' : 'red' }]}>
				<Text style={styles.onlineText}>{isOnline ? 'Online' : 'Offline'}</Text>
			</View>
			<Text style={styles.header}>Products</Text>
			<TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
			<TextInput
				style={styles.input}
				placeholder="Quantity"
				value={quantity}
				onChangeText={setQuantity}
				keyboardType="numeric"
			/>
			<TextInput
				style={styles.input}
				placeholder="Price"
				value={price}
				onChangeText={setPrice}
				keyboardType="numeric"
			/>
			<Button title="Add Product" onPress={addProduct} />
			<Button title="Sync Products" onPress={syncProducts} color="green" />
			<FlatList
				data={products}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.product}>
						<Text>{item.name}</Text>
						<Text>Quantity: {item.quantity}</Text>
						<Text>Price: ${item.price}</Text>
					</View>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { padding: 16, flex: 1 },
	header: { fontSize: 24, marginBottom: 16 },
	input: { borderWidth: 1, marginBottom: 8, padding: 8, borderRadius: 4 },
	product: { marginBottom: 16, padding: 8, borderWidth: 1, borderRadius: 4 },
	onlineIndicator: {
		padding: 8,
		borderRadius: 4,
		marginBottom: 16,
	},
	onlineText: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
})

export default ProductsScreen
