import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BenhkhopgoiService } from './benhkhopgoi.service';
import { BenhKhopGoiUploadFile } from './dto/benhkhopgoi-uploadfile.input';

@ApiTags('Bệnh khớp gối')
@Controller('benhkhopgoi')
export class BenhkhopgoiController {
  constructor(private readonly BenhKhopGoiService: BenhkhopgoiService) {}

  @Post('benhkhopgoi-uploadfile')
  @ApiOkResponse({ description: 'Benh Khop Goi Uploadfile' })
  @ApiUnauthorizedResponse({ description: 'Invalied credentials' })
  @ApiBody({ type: BenhKhopGoiUploadFile })
  async uploadFile(
    @Body('image') image: string,
    @Body('datainfor') datainfor: any,
  ) {
    try {
      let kq = {};
      if (datainfor && datainfor.category == 'x4') {
        const categoryBenhKhopGoi = 'x4';
        const result = await this.BenhKhopGoiService.fetchDataBenhKhopGoi(
          categoryBenhKhopGoi,
          image,
        );
        kq = result;
      } else {
        const categoryBenhKhopGoi = 'yesno';
        const result = await this.BenhKhopGoiService.fetchDataBenhKhopGoi(
          categoryBenhKhopGoi,
          image,
        );
        kq = result;
      }

      return {
        result1: kq['result1'],
        image1: kq['image1'],
        result2: kq['result2'],
        image2: kq['image2'],
        infor: datainfor,
      };
    } catch (err) {}
  }
}
