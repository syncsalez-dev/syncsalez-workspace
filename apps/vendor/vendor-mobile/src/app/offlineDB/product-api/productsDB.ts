import { initializeDatabase } from '../database'
import { syncOperation } from '../syncOffline_Online'

/**
 * Save a product to the offline database.
 *
 * @param id - Unique identifier for the product.
 * @param name - Name of the product.
 * @param quantity - Quantity of the product in stock.
 * @param price - Price of the product.
 * @returns A promise that resolves when the product is saved.
 *
 * @example
 * import { saveProductOffline, getOfflineProducts } from './products';
 *
 * // Save a product
 * saveProductOffline('123', 'Product A', 10, 20.5);
 *
 * // Fetch all products
 * getOfflineProducts().then(products => console.log(products));
 */

export type product_type = { id: string; name: string; quantity: number; price: number }

/* -------------------------------------- Save a product------------------------------------ */

export const saveProductOffline = async ({ id, name, quantity, price }: product_type) => {
	try {
		// Initialize the database and get the db instance
		const db = await initializeDatabase()

		// Save the product using `runAsync`
		const result = await db.runAsync(
			`INSERT OR REPLACE INTO products (id, name, quantity, price) VALUES (?, ?, ?, ?);`,
			[id, name, quantity, price],
		)

		console.log('Product saved:', result)
	} catch (error) {
		console.error('Error saving product:', error)
	}
}

/* --------------------------------------Fetch all products------------------------------------ */

export const getOfflineProducts = async (): Promise<Array<product_type>> => {
	try {
		// Initialize the database and get the db instance
		const db = await initializeDatabase()

		// Fetch all products using `getAllAsync`
		const result = await db.getAllAsync<product_type>(`SELECT * FROM products;`)
		console.log('Fetched products:', result)
		return result
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

// Add a product to the server
export const addProductToServer = async (product: product_type): Promise<void> => {
	await syncOperation<product_type>('ADD', '/products', product)
}
