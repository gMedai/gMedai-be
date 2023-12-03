import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignupDto {
  @ApiProperty({ example: 'onno' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'onno@yopmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'ON NO' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '+123456789' })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'onno1234' })
  @IsNotEmpty()
  password: string;
}
