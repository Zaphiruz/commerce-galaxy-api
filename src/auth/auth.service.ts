import { Injectable, UnauthorizedException } from '@nestjs/common';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    const validPass = !!user && await this.validatePassword(pass, user.password) || false;
    if (!validPass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validatePassword(password, hash): Promise<Boolean> {
    return bcrypt.compare(password, hash);
  }
}