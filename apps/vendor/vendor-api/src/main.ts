/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cors from 'cors'
import { AppModule } from './app/app.module'
import { TrpcRouter } from './app/trpc/trpc.router'
import { createAppRouter } from './app/trpc/app.router'

async function bootstrap() {

	


	const app = await NestFactory.create(AppModule)

	const trpcRouter = app.get(TrpcRouter);
	const appRouter = createAppRouter(trpcRouter);
	const globalPrefix = 'api'
	app.setGlobalPrefix(globalPrefix)
	const port = process.env.PORT || 4000
	app.use(cors())

	Logger.log('App Router', appRouter)
	await app.listen(port)
	Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
