import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

interface DataInfo {
  category: string;
  other_field: string;
}

export class BenhKhopGoiUploadFile {
  @MinLength(8)
  @ApiProperty({
    example: 'data:image/png;base64,',
    type: String,
    description: 'hình ảnh',
  })
  image: string;

  @MinLength(8)
  @ApiProperty({ type: String, description: 'test' })
  test: string;

  @ApiProperty({
    type: 'object',
    properties: {
      category: { type: 'string' },
      other_field: { type: 'string' },
    },
    description: 'Image file',
  })
  datainfor: DataInfo;
}
