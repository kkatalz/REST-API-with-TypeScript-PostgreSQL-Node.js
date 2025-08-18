import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly name: string;
  readonly email: string;
  readonly bio: string;
  readonly image: string;
}
