import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { ListOfUsers } from 'src/dto/usersId.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Delete('delete')
  deleteUsers(@Body() dto: ListOfUsers) {
    return this.usersService.deleteUsers(dto);
  }

  @Put('block')
  blockUsers(@Body() dto: ListOfUsers) {
    return this.usersService.blockUsers(dto);
  }

  @Put('unblock')
  unblockUsers(@Body() dto: ListOfUsers) {
    return this.usersService.unblockUsers(dto);
  }
}
