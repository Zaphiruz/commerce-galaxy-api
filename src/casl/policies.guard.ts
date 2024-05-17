import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from './policies.decorator';
import { requestInfoParser } from 'src/common/utils/request-parcing.util';

@Injectable()
export class PoliciesGuard implements CanActivate {
  logger = new Logger(PoliciesGuard.name);

  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);

    const isAuthorized = policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );

    if (!isAuthorized) {
      const ctx = context.switchToHttp();
      const req = ctx.getRequest();

      const { method, url, ip, token } = requestInfoParser(req);

      this.logger.log(`Req: ${method} ${url} ${ip} ${token} 403`);
    }

    return isAuthorized;
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
