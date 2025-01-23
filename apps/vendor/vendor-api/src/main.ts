// /**
//  * This is not a production server yet!
//  * This is only a minimal backend to get started.
//  */

// import { Logger } from '@nestjs/common'
// import { NestFactory } from '@nestjs/core'
// import cors from 'cors'
// import express from 'express'
// import { AppModule } from './app/app.module'
// import { TrpcRouter } from './app/trpc/trpc.router'
// import { createAppRouter } from './app/trpc/app.router'
// import { createTrpcMiddleware } from './app/trpc/trpc.server'
// import { UserService } from './app/auth/modules/users/users.service'

// async function bootstrap() {

// 	const app = await NestFactory.create(AppModule)

// 	const trpcRouter = app.get(TrpcRouter);
// 	const appRouter = createAppRouter(trpcRouter);

// 	const userService = app.get(UserService); // Retrieve the UserService instance
// 	const trpcMiddleware = createTrpcMiddleware(userService);

// 	const globalPrefix = 'api'
// 	app.setGlobalPrefix(globalPrefix)

// 	const port = process.env.PORT || 4000;
// 	app.use(cors());

// 	const expressApp = express();
// 	expressApp.use('/trpc', trpcMiddleware); // Attach tRPC middleware
// 	app.use(expressApp);

// 	 Logger.log('App Router', appRouter);
//     await app.listen(port);
//     Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
//     Logger.log(`🌐 tRPC is running on: http://localhost:${port}/trpc`);

// }

// bootstrap()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { TrpcServer } from './app/trpc/trpc.server'
import { Logger } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	try {
		// Attempt to retrieve and initialize tRPC Server
		const trpcServer = app.get(TrpcServer) // Use DI to get the TrpcServer
		if (!trpcServer) {
			throw new Error('Failed to retrieve TrpcServer from DI container.')
		}

		const trpcMiddleware = trpcServer.createMiddleware()
		if (!trpcMiddleware) {
			throw new Error('Failed to create tRPC middleware.')
		}

		app.use('/trpc', trpcMiddleware) // Mount the middleware at the desired route
		Logger.log('✅ tRPC middleware successfully initialized', 'Bootstrap')
	} catch (error: unknown) {
		if (error instanceof Error) {
			Logger.error(`❌ Error initializing tRPC: ${error.message}`, error.stack, 'Bootstrap')
		} else {
			Logger.error(`❌ Unknown error initializing tRPC: ${JSON.stringify(error)}`, '', 'Bootstrap')
		}
	}

	app.setGlobalPrefix('api')

	const port = process.env.PORT || 4000

	try {
		await app.listen(port)
		Logger.log(`🚀 Application is running on: http://localhost:${port}/api`, 'Bootstrap')
		Logger.log(`🌐 tRPC is running on: http://localhost:${port}/trpc`, 'Bootstrap')
	} catch (error: unknown) {
		if (error instanceof Error) {
			Logger.error(`❌ Error starting the application: ${error.message}`, error.stack, 'Bootstrap')
		} else {
			Logger.error(
				`❌ Unknown error starting the application: ${JSON.stringify(error)}`,
				'',
				'Bootstrap',
			)
		}
	}
}

bootstrap()

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app/app.module';
// import { TrpcServer } from './app/trpc/trpc.server';
// import { Logger } from '@nestjs/common';

// async function bootstrap() {
// 	const app = await NestFactory.create(AppModule);

// 	const trpcServer = app.get(TrpcServer); // Use DI to get the TrpcServer
// 	const trpcMiddleware = trpcServer.createMiddleware();

// 	app.use('/trpc', trpcMiddleware); // Mount the middleware at the desired route
// 	app.setGlobalPrefix('api');

// 	const port = process.env.PORT || 4000;
// 	await app.listen(port);
// 	console.log(`🚀 Application is running on: http://localhost:${port}/api`);
// 	Logger.log(`🌐 tRPC is running on: http://localhost:${port}/trpc`);
// }

// bootstrap();
