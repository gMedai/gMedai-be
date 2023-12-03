import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateTenantDto {
  @ApiProperty({ example: 'Medical Center A' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'clinic@yopmail.com' })
  @IsEmail()
  contact: string;
}
