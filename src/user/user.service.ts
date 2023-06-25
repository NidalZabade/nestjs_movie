import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(page, size): Promise<User[]> {
    const skip = (page - 1) * size;
    return this.userRepository.find({ skip, take: size });
  }

  // example to do: http://localhost:3000/api/user?searchBy=name&searchValue=Bob&page=1&size=1
  async searchUsersByName(
    searchBy: string,
    searchValue: string,
    page: number,
    size: number,
  ): Promise<User[]> {
    const skip = (page - 1) * size;

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where(`user.${searchBy} LIKE :searchValue`, {
        searchValue: `%${searchValue}%`,
      })
      .orderBy('user.id')
      .skip(skip)
      .take(size);

    return queryBuilder.getMany();
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
}
