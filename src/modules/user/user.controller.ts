import {
  JsonController,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from 'routing-controllers';
import { Service } from 'typedi';

import { UserService } from '@modules/user/user.service';
import { CreateUserDto } from '@modules/user/dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Service()
@JsonController('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Post('/login')
  async login(@Body() user: LoginUserDto) {
    return this.userService.login(user['email'], user['password']);
  }

  @Get('/borrowers')
  async getBorrowers(@Body() user: CreateUserDto) {
    return this.userService.getBorrowers();
  }

  @Put('/:userId')
  async updateBook(
    @Param('userId') userId: string,
    @Body() updatedUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updatedUserDto);
  }

  @Delete('/:userId')
  async deleteBook(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
