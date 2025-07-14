import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 🟢 Public: Get all users (optional – you can add guard here if needed)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // 🔐 Protected: Get logged-in user's profile using JWT
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    return this.usersService.findOne(req.user.userId) //the userId from JWT
  }
}
