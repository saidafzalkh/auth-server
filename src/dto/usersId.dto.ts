import { IsNotEmpty, IsNumber } from 'class-validator';

export class ListOfUsers {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  users: number[];
}
