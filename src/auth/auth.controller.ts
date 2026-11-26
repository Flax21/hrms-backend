
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

 @UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Req() req: any) {
  return this.authService.getProfile(req.user);
}
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @Get('users')
    findAllUsers() {
      return this.authService.findAllUsers();
  }
}
