import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

@Injectable()
export class SaleService {
	async createSale(data: { productId: string; quantity: number; total: number }) {
		// Decrement product quantity
		await prisma.product.update({
			where: { id: data.productId },
			data: { quantity: { decrement: data.quantity } },
		})
		return prisma.sale.create({ data })
	}

	async getSales() {
		return prisma.sale.findMany({ include: { Product: true } })
	}
}
