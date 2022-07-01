import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PublicRoute } from '../auth/decorators/public-route.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('Addresses')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @PublicRoute()
  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.login(createAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('token-validation')
  async validateToken(@Body() { token }: any) {
    return await this.authService.validateUserByToken(token);
  }
}
