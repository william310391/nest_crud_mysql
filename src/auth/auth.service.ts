import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, name, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);
    console.log(user);
    //if (Object.entries(user).length > 1) {
    if (user) {
      throw new BadRequestException('User already exists');
    }
    return await this.usersService.create({
      email,
      name,
      password: await bcryptjs.hash(password, 10),
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email is wrong');
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong');
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return { token, email };
  }

  async profile({ email, role }: { email: string; role: string; sub: string }) {
    if (role !== 'user') {
      throw new UnauthorizedException('You are not authorized to access this resource');
    }

    return await this.usersService.findOneByEmail(email);
  }
}
