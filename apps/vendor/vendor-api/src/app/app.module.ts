import { Module } from '@nestjs/common'
import { SyncGateway } from '../sync.gateway'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SaleController } from './sales/sale.controller'
import { SaleService } from './sales/sale.service'
import { ProductController } from './products/product.controller'
import { ProductService } from './products/product.services'

@Module({
	imports: [],
	controllers: [AppController, ProductController, SaleController],
	providers: [AppService, ProductService, SaleService, SyncGateway],
})
export class AppModule {}
