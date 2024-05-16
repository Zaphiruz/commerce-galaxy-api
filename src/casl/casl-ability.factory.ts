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
import { Building } from '../buildings/schemas/building.entity';
import { UserRolesEnum } from '../users/user-roles.enum';
import { Note } from '../notes/schemas/note.schema';

type Subjects =
  | InferSubjects<
      | typeof Base
      | typeof User
      | typeof Resource
      | typeof Planet
      | typeof Recipe
      | typeof Building
      | typeof Note
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
