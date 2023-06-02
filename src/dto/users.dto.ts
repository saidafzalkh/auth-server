import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
