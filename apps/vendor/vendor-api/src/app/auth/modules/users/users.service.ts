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

    async registerUser(data: { email: string; password: string; name: string }) {
        const user = await this.prisma.user.create({
            data,
        });
        return user;
    }

    async loginUser(data: { email: string; password: string }) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: data.email,
                password: data.password,
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    


}
