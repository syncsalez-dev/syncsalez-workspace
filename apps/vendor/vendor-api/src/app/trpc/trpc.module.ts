

// import { Module } from '@nestjs/common';
// import { TrpcService } from './trpc.service';
// import { TrpcRouter } from './trpc.router';
// import { TrpcServer } from './trpc.server';
// import { UserService } from '../auth/modules/users/users.service';

// @Module({
//     providers: [TrpcService, TrpcRouter, TrpcServer, UserService],
//     exports: [TrpcServer],
// })
// export class TrpcModule { }


import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { TrpcServer } from './trpc.server';
import { UserService } from '../auth/modules/users/users.service';
import { PrismaModule } from './prisma.module';

@Module({
    imports: [PrismaModule], // Import PrismaModule here
    providers: [TrpcService, TrpcRouter, TrpcServer, UserService],
    exports: [TrpcServer],
})
export class TrpcModule { }

