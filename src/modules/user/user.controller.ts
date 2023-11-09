import { JsonController, Body, Get } from 'routing-controllers';
import { Service } from 'typedi';

import { UserService } from '@modules/user/user.service';
import { CreateUserDto } from '@modules/user/dtos/create-user.dto';

@Service()
@JsonController('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
