import { Injectable } from "@nestjs/common";
import { InferSubjects, AbilityBuilder, MongoAbility, ExtractSubjectType, AbilityClass, createMongoAbility } from "@casl/ability";

import { ActionEnum } from "./action.enum";
import { User } from "../users/schemas/user.schema";
import { Base } from "../bases/base.entity";
import { Resource } from "../resources/schemas/resource.schema";
import { Planet } from "../planets/schemas/planet.schema";


type Subjects = InferSubjects<typeof Base | typeof User | typeof Resource | typeof Planet> | 'all';

export type AppAbility = MongoAbility<[ActionEnum, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      MongoAbility<[ActionEnum, Subjects]>
    >(createMongoAbility);

    if (user.isAdmin) {
      can(ActionEnum.Manage, 'all'); // read-write access to everything
    } else {
      can(ActionEnum.Read, 'all'); // read-only access to everything
    }

    // USER OVERRIDES
    can(ActionEnum.Update, User, { _id: user._id });

    // BASE OVERRIDES
    can(ActionEnum.Update, Base, { user: user._id });
    // cannot(ActionEnum.Delete, Base, { isPublished: true }); cannot delete base if it is not empty

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}