import { Injectable } from "@nestjs/common";
import { initTRPC } from "@trpc/server";
@Injectable()

export class TrpcService {
    private readonly t = initTRPC.create();

    public readonly procedure = this.t.procedure;
    public readonly router = this.t.router;
    public readonly mergeRouters = this.t.mergeRouters;
}