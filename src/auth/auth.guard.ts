import {
	CanActivate,
	ExecutionContext,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { UserService } from '../users/user.service';
import { requestInfoParser } from 'src/common/utils/request-parcing.util';

@Injectable()
export class AuthGuard implements CanActivate {
	logger = new Logger(AuthGuard.name);

	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest();
		const { method, url, ip, token } = requestInfoParser(request);

		if (!token) {
			this.logger.log(`Req: ${method} ${url} ${ip} ${token} 401`);
			throw new UnauthorizedException('token is empty');
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: jwtConstants.secret,
			});

			this.logger.debug(payload);

			// 💡 We're assigning the payload to the request object here
			// so that we can access it in our route handlers
			request['user'] = await this.userService.get(payload.sub);
		} catch (err) {
			this.logger.log(
				`Req: ${method} ${url} ${ip} ${token} 401, ${err.message}`,
			);
			throw new UnauthorizedException('error verifying token', {
				cause: err,
			});
		}
		return true;
	}

	private;
}
