import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
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
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
  
    const hashed = await bcrypt.hash(dto.password, 10);
    const user: User = await this.usersService.create({
      email: dto.email,
      name: dto.name,
      password: hashed,
    });
  
    if (!user || !user.id) {
      console.error('❌ Invalid user:', user); // ← لاگ برای بررسی
      throw new Error('User creation failed or did not return user data');
    }
  
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
