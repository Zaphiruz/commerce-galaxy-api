import { Request } from 'express';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type AuthRequest = Request & { user: HydratedDocument<User> };
