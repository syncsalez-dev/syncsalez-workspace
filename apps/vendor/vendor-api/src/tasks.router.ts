// import { PrismaClient } from '@prisma/client'
// import { initTRPC } from '@trpc/server'
// import { z } from 'zod'

// const prisma = new PrismaClient()
// const t = initTRPC.create()

// export const tasksRouter = t.router({
// 	getAll: t.procedure.query(async () => prisma.task.findMany()),
// 	create: t.procedure
// 		.input(z.object({ title: z.string(), description: z.string() }))
// 		.mutation(({ input }) => prisma.task.create({ data: input })),
// 	update: t.procedure
// 		.input(
// 			z.object({
// 				id: z.string(),
// 				title: z.string(),
// 				description: z.string(),
// 				isCompleted: z.boolean(),
// 			}),
// 		)
// 		.mutation(({ input }) => prisma.task.update({ where: { id: input.id }, data: input })),
// })
