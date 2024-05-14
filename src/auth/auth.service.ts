import { Injectable, UnauthorizedException } from '@nestjs/common';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/users/user.service';
import { LoginRequestDto } from './dtos/login.request.dto';
import { LoginResponseDto } from './dtos/login.response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async login(requestData: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByUsername(requestData.username);
    const validPass = !!user && await this.validatePassword(requestData.password, user.password) || false;
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