import { Body, Controller, Post } from '@nestjs/common';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

@Controller('files')
export class FilesController {
  private readonly baseUrl: string = '';

  async loadModel(filepath: string) {
    try {
      const pythonProcess2 = spawn('python', ['getresult_client.py']);
      console.log('click ' + filepath);
      pythonProcess2.stdin.write(filepath);
      pythonProcess2.stdin.end();

      // Use a Promise to wait for data from stdout
      const promise = new Promise((resolve, reject) => {
        pythonProcess2.stdout.on('data', (data) => {
          const result = Buffer.from(data).toString();
          resolve(result);
        });
        pythonProcess2.stderr.on('data', (err) => {
          reject({ message: err.toString() });
        });
      });

      // Await the Promise and return the result
      const result = await promise;
      return result;
    } catch (error) {
      console.error(error);
      return { message: 'Error executing Python script' };
    }
  }

  @Post('benhnao-uploadfile')
  async BenhNao(
    @Body('image') image: string,
    @Body('datainfor') datainfor: any,
  ) {
    try {
      for (const prop in datainfor) {
        if (Object.prototype.hasOwnProperty.call(datainfor, prop)) {
        }
      }
      const base64Data = image.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      const fileName = 'image.png';
      const filePath = path.join('', fileName);
      fs.writeFileSync(filePath, buffer);

      const modelPath = 'model_InceptionV3_DenseNet201.h5';
      const result = await this.loadModel(filePath + '@' + 'NAO');

      const kq = (result as string).split('@@@');
      return {
        status: 200,
        result1: kq[0],
        image1: 'data:image/png;base64,' + kq[1],
        infor: datainfor,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
