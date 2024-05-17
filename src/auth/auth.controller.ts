import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/login.request.dto';
import { LoginResponseDto } from './dtos/login.response.dto';
import { RegisterRequestDto } from './dtos/register.request.dto';
import { DtoInterceptor } from 'src/common/interceptors/dto-converter.interceptor';
import { User } from '../users/schemas/user.schema';
import { RegisterResponseDto } from './dtos/register.response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseInterceptors(new DtoInterceptor<LoginResponseDto>(LoginResponseDto))
  login(@Body() loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(loginRequestDto);
  }

  @Post('register')
  @UseInterceptors(new DtoInterceptor<RegisterResponseDto>(RegisterResponseDto))
  register(@Body() registerRequestDto: RegisterRequestDto): Promise<User> {
    return this.authService.register(registerRequestDto);
  }
}
