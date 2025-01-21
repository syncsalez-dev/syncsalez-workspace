// src/trpc/trpc-router.ts
import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from './trpc.service';
import { UserService } from '../auth/modules/users/users.service';

@Injectable()
export class TrpcRouter {
    public readonly appRouter;

    constructor(private readonly trpc: TrpcService, private readonly userService: UserService) {
        const { procedure, router } = this.trpc;

        const inputSchema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
            name: z.string().min(1),
        });

        this.appRouter = router({
            createUser: procedure
                .input(inputSchema)
                .mutation(async ({ input }) => {
                    const newUser = await this.userService.createUser(input);
                    return { success: true, user: newUser };
                }),
        });
    }
}
