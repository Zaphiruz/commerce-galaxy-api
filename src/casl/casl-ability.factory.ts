import { Injectable } from '@nestjs/common';
import {
	InferSubjects,
	AbilityBuilder,
	MongoAbility,
	ExtractSubjectType,
	createMongoAbility,
} from '@casl/ability';

import { ActionEnum } from './action.enum';
import { User } from '../users/schemas/user.schema';
import { Base } from '../bases/schemas/base.schema';
import { Resource } from '../resources/schemas/resource.schema';
import { Planet } from '../planets/schemas/planet.schema';
import { Recipe } from '../recipes/schemas/recipe.schema';
import { Building } from '../buildings/schemas/building.schema';
import { UserRolesEnum } from '../users/user-roles.enum';
import { Note } from '../notes/schemas/note.schema';
import { System } from '../systems/schemas/system.schema';
import { Ship } from 'src/ships/schemas/ship.schema';
import { Worker } from 'src/workers/schemas/worker.schema';
import { Storage } from 'src/storages/schemas/storage.schema';
import { Market } from 'src/markets/schemas/market.schema';
import { Fabricator } from 'src/fabricators/schemas/fabricator.schema';
import { Contract } from 'src/contracts/schemas/contract.schema';
import { Catalog } from 'src/catalogs/schemas/catalog.schema';

export type Subjects =
	| InferSubjects<
			| typeof Base
			| typeof Building
			| typeof Catalog
			| typeof Contract
			| typeof Fabricator
			| typeof Market
			| typeof Note
			| typeof Planet
			| typeof Recipe
			| typeof Resource
			| typeof Ship
			| typeof Storage
			| typeof System
			| typeof User
			| typeof Worker
	  >
	| 'all';

export type AppAbility = MongoAbility<[ActionEnum, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
	createForUser(user: User) {
		const { can, /* cannot, */ build } = new AbilityBuilder<
			MongoAbility<[ActionEnum, Subjects]>
		>(createMongoAbility);

		// Role based general permissions
		if (user.roles.includes(UserRolesEnum.Admin)) {
			can(ActionEnum.Manage, 'all'); // admins get full access
		} else if (user.roles.includes(UserRolesEnum.Moderator)) {
			can(ActionEnum.Update, 'all'); // mods can update anything, but not delete/create
		} else {
			can(ActionEnum.Read, 'all'); // read-only access to everything
		}

		// Collection based overrides

		// USER OVERRIDES
		can(ActionEnum.Update, User, { _id: user._id });

		// BASE OVERRIDES
		can(ActionEnum.Manage, Base, { user: user._id });
		// cannot(ActionEnum.Delete, Base, { isPublished: true }); cannot delete base if it is not empty

		// can(ActionEnum.Manage, Building, { _id: user._id }); owner can remove building

		return build({
			// Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
			detectSubjectType: (item) =>
				item.constructor as ExtractSubjectType<Subjects>,
		});
	}
}
