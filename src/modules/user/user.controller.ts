import { JsonController, Body, Get, Post } from 'routing-controllers';
import { Service } from 'typedi';

import { UserService } from '@modules/user/user.service';
import { CreateUserDto } from '@modules/user/dtos/create-user.dto';

@Service()
@JsonController('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('')
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
