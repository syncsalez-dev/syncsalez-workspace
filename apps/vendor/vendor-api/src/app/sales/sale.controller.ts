import { Body, Controller, Get, Post } from '@nestjs/common'
import { SaleService } from './sale.service'

@Controller('sales')
export class SaleController {
	constructor(private readonly saleService: SaleService) {}

	@Post()
	create(@Body() data: { productId: string; quantity: number; total: number }) {
		return this.saleService.createSale(data)
	}

	@Get()
	findAll() {
		return this.saleService.getSales()
	}
}
