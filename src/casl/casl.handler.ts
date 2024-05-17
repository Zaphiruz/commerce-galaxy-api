import { ActionEnum } from './action.enum';
import { AppAbility, Subjects } from './casl-ability.factory';
import { PolicyHandlerInterface } from './policies.decorator';

export class BasePolicyHandler implements PolicyHandlerInterface {
	action: ActionEnum;
	item: Subjects;

	constructor(action: ActionEnum, item: Subjects) {
		this.action = action;
		this.item = item;
	}

	handle(ability: AppAbility) {
		return ability.can(this.action, this.item);
	}
}

export class ManagePolicyHandler extends BasePolicyHandler {
	constructor(item: Subjects) {
		super(ActionEnum.Manage, item);
	}
}

export class CreatePolicyHandler extends BasePolicyHandler {
	constructor(item: Subjects) {
		super(ActionEnum.Create, item);
	}
}

export class ReadPolicyHandler extends BasePolicyHandler {
	constructor(item: Subjects) {
		super(ActionEnum.Read, item);
	}
}

export class UpdatePolicyHandler extends BasePolicyHandler {
	constructor(item: Subjects) {
		super(ActionEnum.Update, item);
	}
}

export class DeletePolicyHandler extends BasePolicyHandler {
	constructor(item: Subjects) {
		super(ActionEnum.Delete, item);
	}
}
