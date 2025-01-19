import { initializeDatabase } from '../database'

type sales_type = {
	id: string
	productId: string
	quantity: number
	total: number
	timestamp: string
}

// Save a sale
export const saveSaleOffline = async ({
	id,
	productId,
	quantity,
	total,
	timestamp,
}: sales_type) => {
	try {
		// Initialize the database and get the db instance
		const db = await initializeDatabase()

		// Save the sale using `runAsync`
		const result = await db.runAsync(
			`INSERT INTO sales (id, productId, quantity, total, timestamp) VALUES (?, ?, ?, ?, ?);`,
			[id, productId, quantity, total, timestamp],
		)
		console.log('Sale saved:', result)
	} catch (error) {
		console.error('Error saving sale:', error)
	}
}

// Fetch all sales
export const getOfflineSales = async (): Promise<Array<sales_type>> => {
	try {
		// Initialize the database and get the db instance
		const db = await initializeDatabase()

		// Fetch all sales using `getAllAsync`
		const result = await db.getAllAsync<sales_type>(`SELECT * FROM sales;`)
		console.log('Fetched sales:', result)
		return result
	} catch (error) {
		console.error('Error fetching sales:', error)
		return []
	}
}
