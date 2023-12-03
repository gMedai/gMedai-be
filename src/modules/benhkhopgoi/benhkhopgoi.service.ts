import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BenhkhopgoiService {
  async fetchDataBenhKhopGoi(category: string, datainput: any): Promise<any> {
    let urlFetchKhopGoi = process.env.API_SERVER_PYTHON;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (category === 'x4') urlFetchKhopGoi = urlFetchKhopGoi + '/benhkhopgoix4';
    else urlFetchKhopGoi = urlFetchKhopGoi + '/benhkhopgoiyesno';
    console.log(urlFetchKhopGoi);
    const response = await axios.post(urlFetchKhopGoi, datainput, config);
    const datares = response.data;
    return datares;
  }
}
