import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import isSupportedSearchOption from './utils/search_option';
import registerSchema from './schema/register_schema';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    const { error } = registerSchema.validate(createUserDto);
    if (error) {
      throw new Error(error.message);
    }
    return this.userRepository.save(createUserDto);
  }

  async findAll(
    searchBy: string,
    searchValue: string,
    page: number,
    size: number,
  ): Promise<User[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.orderBy('user.id');
    if (isSupportedSearchOption(searchBy)) {
      queryBuilder.where(`user.${searchBy} LIKE :searchValue`, {
        searchValue: `%${searchValue}%`,
      });
    }
    const skip = (page - 1) * size;
    queryBuilder.skip(skip).take(size);
    queryBuilder.andWhere('user.deleted_at IS NULL');
    return queryBuilder.getMany();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);
    if (!user || user.deleted_at !== null) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async softDelete(id: number): Promise<User> {
    const user = await this.findUserById(id);
    if (!user || user.deleted_at !== null) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.save({ ...user, deleted_at: new Date() });
  }

  async restore(id: number): Promise<User> {
    const user = await this.findUserById(id);
    if (!user || user.deleted_at === null) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.save({ ...user, deleted_at: null });
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
}
