import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  getAll() {
    return this.usersService.getAll();
  }
}
