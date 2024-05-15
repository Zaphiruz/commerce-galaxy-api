import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { IncomingMessage, OutgoingMessage } from 'http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    logger = new Logger(LoggingInterceptor.name)

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();

        const req = ctx.getRequest();

        this.logger.log(`Req: ${req.method} ${req.url} ${req.headers['x-forwarded-for'] || req.socket.remoteAddress} ${JSON.stringify(req.body, null, 2)}`);

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap((resBody) => {
                    let res = ctx.getResponse();
                    this.logger.log(`Res: ${req.method} ${req.url} ${req.headers['x-forwarded-for'] || req.socket.remoteAddress} ${res.statusCode} ${Date.now() - now} \n${JSON.stringify(resBody, null, 2)}`)
                })
            );
    }
}