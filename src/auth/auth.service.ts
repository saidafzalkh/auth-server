import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDtoSignIn, AuthDtoSignUp } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDtoSignUp) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'A user with this email address is already authorized',
          );
        }
      }

      throw error;
    }
  }

  async signIn(dto: AuthDtoSignIn) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user)
      new ForbiddenException(
        'The user with this email address is not authorized',
      );

    if (user.blocked) new ForbiddenException('User with this email is blocked');

    const passwordMatches = await argon.verify(user.hash, dto.password);

    if (!passwordMatches) new ForbiddenException('Wrong password!');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('SECRET'),
    });

    return { access_token: token };
  }
}
