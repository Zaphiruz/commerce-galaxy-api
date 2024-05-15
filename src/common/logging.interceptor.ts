import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const protectedKeys = ['password'];

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();

    const req = ctx.getRequest();
    const method = req.method;
    const url = req.url;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const auth = req.headers['authorization']?.slice(7);

    this.logger.log(
      `Req: ${method} ${url} ${ip} ${auth} ${this.parseBody(req.body)}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap((resBody) => {
        const res = ctx.getResponse();
        this.logger.log(
          `Res: ${method} ${url} ${ip} ${auth} ${res.statusCode} ${Date.now() - now} \n${this.parseBody(resBody)}`,
        );
      }),
    );
  }

  parseBody(obj: any): string {
    if (!obj) return '';

    let stringBody;
    try {
      stringBody = JSON.stringify(obj, null, 2);
      stringBody = protectedKeys.reduce(
        (c, v) =>
          c.replace(new RegExp(`("${v}": ")(.*)(",?)`, 'gi'), '$1********$3'),
        stringBody,
      );
    } catch (err) {
      this.logger.error(`error paring body, ${err}`);
      stringBody = obj.toString?.() ?? obj;
    }

    return '\n' + stringBody;
  }
}
