import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
  PlainLiteralObject,
} from '@nestjs/common';
import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { Document } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DtoInterceptor<T> implements NestInterceptor {
  dtoClass: ClassConstructor<T>;

  constructor(dtoClass: ClassConstructor<T>) {
    this.dtoClass = dtoClass;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((res: PlainLiteralObject | Array<PlainLiteralObject>) =>
          this.dedoc(res),
        ),
      )
      .pipe(
        map((res: PlainLiteralObject | Array<PlainLiteralObject>) =>
          this.instantiate(res),
        ),
      )
      .pipe(
        map((res: PlainLiteralObject | Array<PlainLiteralObject>) =>
          this.serialize(res),
        ),
      );
  }

  dedoc(response) {
    if (response instanceof StreamableFile) {
      return response;
    }

    if (Array.isArray(response)) {
      return response.map((response) =>
        response instanceof Document ? response.toObject() : response,
      );
    } else {
      return response instanceof Document ? response.toObject() : response;
    }
  }

  instantiate(response) {
    if (response instanceof StreamableFile) {
      return response;
    }

    return plainToInstance(this.dtoClass, response, {
      excludeExtraneousValues: true,
    });
  }

  serialize(response) {
    if (response instanceof StreamableFile) {
      return response;
    }

    return instanceToPlain(response, {
      excludeExtraneousValues: true,
      strategy: 'excludeAll',
    });
  }
}
