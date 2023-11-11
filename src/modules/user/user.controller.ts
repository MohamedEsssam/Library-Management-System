import { Service } from 'typedi';
import {
  JsonController,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  QueryParam,
  UseBefore,
} from 'routing-controllers';

import { authGuard } from '@middleware/auth-guard.middleware';
import { UserService } from '@modules/user/user.service';
import { CreateUserDto } from '@modules/user/dtos/create-user.dto';
import { UpdateUserDto } from '@modules/user/dtos/update-user.dto';
import { LoginUserDto } from '@modules/user/dtos/login-user.dto';
import { Roles } from '@enums/roles.enum';

@Service()
@JsonController('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(
    @Body() user: CreateUserDto,
    @QueryParam('isAdmin') isAdmin?: boolean,
  ) {
    return this.userService.createUser(
      user,
      isAdmin ? Roles.ADMIN : Roles.BORROWER,
    );
  }

  @Post('/login')
  async login(@Body() user: LoginUserDto) {
    return this.userService.login(user['email'], user['password']);
  }

  @Get('/borrowers')
  @UseBefore(authGuard)
  async getBorrowers() {
    return this.userService.getBorrowers();
  }

  @Put('/:userId')
  @UseBefore(authGuard)
  async updateUser(
    @Param('userId') userId: string,
    @Body() updatedUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updatedUserDto);
  }

  @UseBefore(authGuard)
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
