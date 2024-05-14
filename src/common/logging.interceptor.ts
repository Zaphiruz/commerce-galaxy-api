import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    logger = new Logger(LoggingInterceptor.name)

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let req: IncomingMessage = context.getArgByIndex(0);

        this.logger.log(`Req: ${req.method} ${req.url} ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => this.logger.log(`Res: ${req.method} ${req.url} ${req.headers['x-forwarded-for'] || req.socket.remoteAddress} ${Date.now() - now}`)),
            );
    }
}