import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class updateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  password: string;
}

export class ResUserDTO {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
