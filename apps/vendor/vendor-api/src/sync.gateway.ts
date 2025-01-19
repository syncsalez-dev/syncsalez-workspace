/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({ cors: { origin: '*' } })
export class SyncGateway {
	@WebSocketServer()
	server!: Server

	// Handle data sync messages from clients
	@SubscribeMessage('sync_data')
	handleSync(@MessageBody() data: any) {
		console.log('Sync data received:', data)

		// Emit to all clients that the sync is complete
		this.server.emit('sync_complete', data)
	}
}
