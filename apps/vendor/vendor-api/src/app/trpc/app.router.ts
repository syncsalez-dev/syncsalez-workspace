// src/trpc/app-router.ts
import { TrpcRouter } from './trpc.router';

export function createAppRouter(trpcRouter: TrpcRouter): any {
    return trpcRouter.appRouter;
}
