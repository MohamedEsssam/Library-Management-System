import { JsonController, Body, Get } from 'routing-controllers';
import { UserService } from './user.service';
import { User } from '@db/entities/user.entity';
import { Service } from 'typedi';
import { CreateUserDto } from './dtos/create-user.dto';

@Service()
@JsonController('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
