import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Khởi tạo model cho từng loại bệnh")
@Controller('load-model')
export class LoadModelController {
  private readonly baseUrl: string = "";

  @Post("benhkhopgoi-loadmodel")
  async loadModelC(@Body("datainfor") datainfor: any) {
    return {
      message: "Ok",
    };
  }
  @Post("benhnao-loadmodel")
  async loadModelNao() {
    return {
      message: "Ok",
    };
  }
}
