import { Injectable } from '@nestjs/common';
import { PrismaService } from './core/service/prisma.service';


@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: { email: string; password: string; name: string }) {
        const user = await this.prisma.user.create({
            data,
        });
        return user;
    }
}
