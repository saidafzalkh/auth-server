import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
