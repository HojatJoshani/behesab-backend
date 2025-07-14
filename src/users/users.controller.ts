import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ✅ لیست همه کاربران (فقط برای ادمین‌ها)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req) {
    return this.usersService.findAll();
  }

  // ✅ اطلاعات خود کاربر لاگین‌شده
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    return this.usersService.findOne(req.user.sub); // `sub` = userId from JWT
  }
}
