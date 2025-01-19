// declare module 'expo-sqlite' {
// 	export interface SQLiteDatabase {
// 		transaction(
// 			callback: (tx: SQLTransaction) => void,
// 			errorCallback?: (error: SQLError) => void,
// 			successCallback?: () => void,
// 		): void
// 	}

// 	export interface SQLTransaction {
// 		executeSql(
// 			sqlStatement: string,
// 			args?: any[],
// 			callback?: (transaction: SQLTransaction, resultSet: SQLResultSet) => void,
// 			errorCallback?: (transaction: SQLTransaction, error: SQLError) => void,
// 		): void
// 	}

// 	export interface SQLResultSet {
// 		insertId?: number
// 		rowsAffected: number
// 		rows: {
// 			length: number
// 			item(index: number): any
// 			_array: any[]
// 		}
// 	}

// 	export interface SQLError {
// 		code: number
// 		message: string
// 	}

// 	export function openDatabase(
// 		name: string,
// 		version?: string,
// 		description?: string,
// 		size?: number,
// 		callback?: () => void,
// 	): SQLiteDatabase
// }
