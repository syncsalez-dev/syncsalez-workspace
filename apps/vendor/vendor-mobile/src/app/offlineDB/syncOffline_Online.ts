import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'

const API_URL = 'http://10.0.2.2:4000/api' // Replace with your backend URL
// const API_URL = 'http://localhost:4000/api' // Replace with your backend URL

export const api = axios.create({
	baseURL: API_URL,
})

// Interface for Action
type Action<T> = {
	type: 'GET' | 'ADD' | 'UPDATE' | 'DELETE'
	endpoint: string
	payload: T
}

// Offline action queue
const offlineQueue: Array<Action<any>> = []

// Check if online using NetInfo
const isOnline = async () => {
	const state = await NetInfo.fetch()
	return state.isConnected && state.isInternetReachable
}

/**
 * Performs a CRUD operation (Add, Update, Delete) with online/offline support.
 * - If the device is online, it sends the operation to the server.
 * - If offline, it queues the action to be synced later when back online.
 *
 * @template T - The type of the payload object for the operation.
 * @param {'ADD' | 'UPDATE' | 'DELETE'} type - The type of CRUD operation to perform.
 * @param {string} endpoint - The API endpoint for the operation (e.g., '/products').
 * @param {T} payload - The data to be sent to the server.
 * @param {string} [id] - The optional ID of the resource for UPDATE/DELETE operations.
 * @returns {Promise<any>} - A promise that resolves with the server's response or void if queued offline.
 * @throws {Error} - Throws an error if an online operation fails.
 *
 * @example
 * // Adding a product:
 * const newProduct = { id: '123', name: 'Product A', quantity: 10, price: 20.5 };
 * await syncOperation('ADD', '/products', newProduct);
 *
 * @example
 * // Updating a product:
 * const updatedProduct = { id: '123', name: 'Updated Product A', quantity: 15, price: 25.0 };
 * await syncOperation('UPDATE', '/products', updatedProduct, updatedProduct.id);
 *
 * @example
 * // Deleting a product:
 * const productId = '123';
 * await syncOperation('DELETE', '/products', {}, productId);
 */

// Generic function to handle CRUD operations with sync support
export const syncOperation = async <T>(
	type: 'GET' | 'ADD' | 'UPDATE' | 'DELETE',
	endpoint: string,
	payload?: T,
	id?: string, // Optional ID for update/delete
): Promise<any> => {
	if (await isOnline()) {
		try {
			let response
			switch (type) {
				case 'GET':
					response = await api.get(endpoint)
					return response.data

				case 'ADD':
					if (!payload) throw new Error('payload is required for ADD operations')
					response = await api.post(endpoint, payload)
					break
				case 'UPDATE':
					if (!id) throw new Error('ID is required for UPDATE operations')
					response = await api.put(`${endpoint}/${id}`, payload)
					break
				case 'DELETE':
					if (!id) throw new Error('ID is required for DELETE operations')
					response = await api.delete(`${endpoint}/${id}`)
					break
			}
			console.log(`Successfully performed ${type} operation for ${endpoint}`)
		} catch (error: any) {
			console.error(`Error performing ${type} operation for ${endpoint}:`, error.message || error)
			if (error.response) {
				console.error('Response data:', error.response.data)
				console.error('Response status:', error.response.status)
			} else if (error.request) {
				console.error('No response received:', error.request)
			}
		}
	} else {
		queueOfflineAction({ type, endpoint, payload })
		console.log(`${type} operation queued for ${endpoint} (offline)`)
	}
}

// Queue offline actions
const queueOfflineAction = <T>(action: Action<T>) => {
	offlineQueue.push(action)
	console.log('Queued offline action:', action)
}

// Sync offline actions
export const syncOfflineActions = async () => {
	if (!(await isOnline())) return

	while (offlineQueue.length > 0) {
		const action = offlineQueue.shift()
		if (!action) continue

		try {
			console.log('Syncing action:', action)
			await syncOperation(action.type, action.endpoint, action.payload, action.payload.id)
			console.log('Action synced successfully:', action)
		} catch (error) {
			console.error('Error syncing action:', action, error)
			offlineQueue.unshift(action) // Re-queue the action if it fails
			break // Stop processing further actions for now
		}
	}
}

// Subscribe to connectivity changes and trigger syncing
NetInfo.addEventListener(async (state) => {
	if (state.isConnected && state.isInternetReachable) {
		console.log('Device is online. Syncing offline actions...')
		await syncOfflineActions()
	}
})

/**
 * ****************************************************
 * UPDATED CODE: Sync GET Operation with Two-Way Sync
 * ****************************************************
 */

/**
 * Syncs data between the server and local storage:
 * - Adds missing items from the server to local storage.
 * - Sends items from local storage that are missing on the server back to the server.
 *
 * @param {string} endpoint - The API endpoint to fetch/update the server data (e.g., '/products').
 * @param {() => Promise<T[]>} getLocalItems - A function to retrieve items from local storage.
 * @param {(item: T) => Promise<void>} saveLocalItem - A function to save a single item to local storage.
 * @param {(item: T) => Promise<void>} addToServer - A function to add a single item to the server.
 * @returns {Promise<void>}
 */
export const syncGetAndCompare = async <T>(
	endpoint: string,
	getLocalItems: () => Promise<T[]>,
	saveLocalItem: (item: T) => Promise<void>,
	addToServer: (item: T) => Promise<void>,
): Promise<void> => {
	try {
		if (!(await isOnline())) {
			console.log('Device is offline. Skipping sync.')
			return
		}

		// Fetch server data
		const serverItems = await syncOperation<T[]>('GET', endpoint)
		console.log('Fetched server items ---:', serverItems)

		// Fetch local data
		const localItems = await getLocalItems()
		console.log('Fetched local items oooo:', localItems)

		/** *****************************
		 * Step 1: Server → Local
		 ***************************** */
		// Find items on the server that are missing in the local storage
		const missingItems_L2S = serverItems.filter(
			(serverItem: any) => !localItems.some((localItem: any) => localItem.id === serverItem.id),
		)

		console.log('Missing items from server to local:', missingItems_L2S)

		// Add missing items from the server to local storage
		for (const item of missingItems_L2S) {
			await saveLocalItem(item)
			console.log('Added missing item to local storage:', item)
		}

		/** *****************************
		 * Step 2: Local → Server
		 ***************************** */
		// Find items in local storage that are missing on the server
		const missingItems_S2L = localItems.filter(
			(localItem: any) => !serverItems.some((serverItem: any) => serverItem.id === localItem.id),
		)

		console.log('Missing items from local to server:', missingItems_S2L)

		// Add missing items from local storage to the server
		for (const item of missingItems_S2L) {
			await addToServer(item)
			console.log('Added missing item to server:', item)
		}

		console.log('Two-way sync completed successfully.')
	} catch (error) {
		console.error('Error during two-way sync:', error)
	}
}
