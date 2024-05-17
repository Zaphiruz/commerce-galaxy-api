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
					this.handle(this.dtoClass, res),
				),
			);
	}

	handle(dtoClass, response) {
		if (response instanceof StreamableFile) {
			return response;
		}

		if (Array.isArray(response)) {
			return response.map((response) => this.cast(dtoClass, response));
		} else {
			return this.cast(dtoClass, response);
		}
	}

	private cast(dtoClass, response) {
		const nonDoc =
			response instanceof Document ? response.toObject() : response;
		const plainDoc = plainToInstance(dtoClass, nonDoc, {
			excludeExtraneousValues: true,
		});
		return instanceToPlain(plainDoc, {
			excludeExtraneousValues: true,
			strategy: 'excludeAll',
		});
	}
}
