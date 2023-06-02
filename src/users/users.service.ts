import { Injectable } from '@nestjs/common';
import { ListOfUsers } from 'src/dto/usersId.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getUsers() {
    const users = this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        loggedAt: true,
        email: true,
        blocked: true,
      },
    });
    return users;
  }

  deleteUsers(dto: ListOfUsers) {
    const count = this.prisma.user.deleteMany({
      where: { id: { in: dto.users } },
    });
    return count;
  }

  blockUsers(dto: ListOfUsers) {
    const count = this.prisma.user.updateMany({
      where: { id: { in: dto.users } },
      data: { blocked: true },
    });
    return count;
  }

  unblockUsers(dto: ListOfUsers) {
    const count = this.prisma.user.updateMany({
      where: { id: { in: dto.users } },
      data: { blocked: false },
    });
    return count;
  }
}
