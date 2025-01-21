// import { initTRPC } from '@trpc/server';

// const t = initTRPC.create();
// export const router = t.router;
// export const publicProcedure = t.procedure;

import { Module } from "@nestjs/common";
import { TrpcService } from "./trpc.service";

@Module({
    imports: [],
    controllers: [],
    providers: [TrpcService],
})

export class TrpcModule { }