import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Validate } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'onno' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'onno1234' })
  @IsNotEmpty()
  password: string;
}
