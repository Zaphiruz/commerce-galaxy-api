import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { requestInfoParser } from './request-parcing.util';

const protectedKeys = ['password'];

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    const { method, url, ip, token } = requestInfoParser(req);

    this.logger.log(
      `Req: ${method} ${url} ${ip} ${token} ${this.parseBody(req.body)}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap((resBody) => {
        const res = ctx.getResponse();
        this.logger.log(
          `Res: ${method} ${url} ${ip} ${token} ${res.statusCode} ${Date.now() - now} \n${this.parseBody(resBody)}`,
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
