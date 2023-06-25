import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // example to do: http://localhost:3000/api/user?searchBy=name&searchValue=Bob&page=1&size=1
  @Get()
  getUsers(
    @Query('searchBy') searchBy: string,
    @Query('searchValue') searchValue: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
  ) {
    if (!searchBy || !searchValue) {
      return this.userService.findAll(page, size);
    }

    return this.userService.searchUsersByName(
      searchBy,
      searchValue,
      page,
      size,
    );
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserById(id);
  }
}
