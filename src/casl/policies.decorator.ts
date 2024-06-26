import { SetMetadata } from '@nestjs/common';
import { AppAbility } from './casl-ability.factory';

export interface PolicyHandlerInterface {
	handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = PolicyHandlerInterface | PolicyHandlerCallback;

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
	SetMetadata(CHECK_POLICIES_KEY, handlers);
