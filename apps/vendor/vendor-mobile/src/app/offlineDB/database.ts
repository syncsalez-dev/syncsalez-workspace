import * as SQLite from 'expo-sqlite'

// Initialize the SQLite database
export const initializeDatabase = async () => {
	try {
		// Open the database asynchronously
		const db = await SQLite.openDatabaseAsync('inventory.db')

		// Execute database initialization queries
		await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY, 
        name TEXT, 
        quantity INT, 
        price REAL
      );
      CREATE TABLE IF NOT EXISTS sales (
        id TEXT PRIMARY KEY, 
        productId TEXT, 
        quantity INT, 
        total REAL, 
        timestamp TEXT
      );
    `)

		console.log('Database initialized successfully.')
		return db
	} catch (error) {
		console.error('Error initializing database:', error)
		throw error
	}
}
