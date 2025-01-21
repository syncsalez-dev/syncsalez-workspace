import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLogger extends Logger {
    override log(message: string) {
        super.log(message);
    }
}
