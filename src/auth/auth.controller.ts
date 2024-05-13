import { Body, Controller, Post, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/login.request.dto';
import { LoginResponseDto } from './dtos/login.response.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(loginRequestDto);
  }
}