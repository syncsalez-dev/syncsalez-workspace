import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ProductService } from './product.services'
import * as product_type from './product_type'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	create(@Body() data: product_type.product_type) {
		return this.productService.createProduct(data)
	}

	@Get()
	findAll() {
		return this.productService.getProducts()
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() data: Partial<product_type.product_type>) {
		return this.productService.updateProduct(id, data)
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.productService.deleteProduct(id)
	}
}
