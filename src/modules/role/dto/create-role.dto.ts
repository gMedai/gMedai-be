import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: 'Doctor' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2fcb9f15-8ce3-4625-b1a1-0b4441319f19' })
  @IsString()
  tenantId: string;
}
