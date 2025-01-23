// import { createExpressMiddleware } from '@trpc/server/adapters/express';
// import { TrpcRouter } from './trpc.router';
// import { TrpcService } from './trpc.service';
// import { UserService } from '../auth/modules/users/users.service';

// export function createTrpcMiddleware(userService: UserService) {
//     const trpcService = new TrpcService();
//     const trpcRouter = new TrpcRouter(trpcService, userService);

//     return createExpressMiddleware({
//         router: trpcRouter.appRouter,
//         createContext: () => ({
//             // Add your context creation logic here




//         }), 
//     });
// }


import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { Injectable } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';

@Injectable()
export class TrpcServer {
    constructor(private readonly trpcRouter: TrpcRouter) { }

    createMiddleware() {
        return createExpressMiddleware({
            router: this.trpcRouter.appRouter,
            createContext: () => ({
                // Add your context creation logic here
            }),
        });
    }
}
