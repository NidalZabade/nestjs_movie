import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { generateToken } from './util/token';
import { comparePassword } from './util/hash_password';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username, deleted_at: null },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      throw new NotFoundException('Password not match');
    }
    const token = generateToken({ id: user.id, username, role: user.role });
    console.log('token', token);
    return token;
  }
}
