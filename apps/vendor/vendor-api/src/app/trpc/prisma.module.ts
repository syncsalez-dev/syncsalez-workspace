import { Module } from '@nestjs/common';
import { PrismaService } from '../auth/modules/users/core/service/prisma.service';

@Module({
    providers: [PrismaService],
    exports: [PrismaService], // Export it to be used in other modules
})
export class PrismaModule { }
