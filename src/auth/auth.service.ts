// auth.service.ts

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignupDto, LoginDto } from './dto/auth.dto';

interface User {
  id: string;
  email: string;
  password?: string;
  name?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signup(dto: SignupDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user: User = await this.usersService.create({
      email: dto.email,
      name: dto.name,
      password: hashed,
    });
    return this.signToken(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user: User = await this.usersService.findByEmail(dto.email);
    if (!user) throw new NotFoundException('User not found');

    if (!user.password) throw new UnauthorizedException('Password not set');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return this.signToken(user.id, user.email);
  }

  signToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
