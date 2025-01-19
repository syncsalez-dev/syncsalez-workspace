import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { product_type } from './product_type'

const prisma = new PrismaClient()

@Injectable()
export class ProductService {
	async createProduct(data: product_type) {
		return prisma.product.create({ data })
	}

	async updateProduct(id: string, data: Partial<product_type>) {
		return prisma.product.update({ where: { id }, data })
	}

	async deleteProduct(id: string) {
		return prisma.product.delete({ where: { id } })
	}

	async getProducts() {
		return prisma.product.findMany()
		// return { message: 'Hello API' }
	}
}
