import { Module } from '@nestjs/common'
import { SyncGateway } from '../sync.gateway'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SaleController } from './sales/sale.controller'
import { SaleService } from './sales/sale.service'
import { ProductController } from './products/product.controller'
import { ProductService } from './products/product.services'
import { UsersModule } from './auth/modules/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from './trpc/prisma.module'
import { PrismaService } from './auth/modules/users/core/service/prisma.service'
import { UserService } from './auth/modules/users/users.service'
import { TrpcService } from './trpc/trpc.service'
import { TrpcRouter } from './trpc/trpc.router'
import { TrpcModule } from './trpc/trpc.module'

@Module({
	imports: [
		UsersModule,
		// add jwt module
		JwtModule.register({
			global: true,
			secret: 'super_secret_key',
			signOptions: { expiresIn: '12h' },
		}), PrismaModule, TrpcModule
	],
	controllers: [AppController, ProductController, SaleController],
	providers: [AppService, ProductService, SaleService, SyncGateway, PrismaService, UserService, TrpcService, TrpcRouter ],
})
export class AppModule {}
