import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class resendCodeDto {
  @ApiProperty({ example: 'onno' })
  @IsNotEmpty()
  username: string;
}
