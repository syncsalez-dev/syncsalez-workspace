import { Module } from '@nestjs/common'
import { SyncGateway } from '../sync.gateway'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SaleController } from './sales/sale.controller'
import { SaleService } from './sales/sale.service'
import { ProductController } from './products/product.controller'
import { ProductService } from './products/product.services'
import { CoreModule } from './core/core.module'
import { UsersModule } from './auth/modules/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { TrpcModule } from './trpc/trpc.module'

@Module({
	imports: [
		UsersModule,
		CoreModule,
		// add jwt module
		JwtModule.register({
			global: true,
			secret: 'super_secret_key',
			signOptions: { expiresIn: '12h' },
		}), TrpcModule
	],
	controllers: [AppController, ProductController, SaleController],
	providers: [AppService, ProductService, SaleService, SyncGateway],
})
export class AppModule {}
