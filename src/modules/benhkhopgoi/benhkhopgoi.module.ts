import { FilesController } from '@modules/files/files.controller';
import { LoadModelController } from '@modules/load-model/load-model.controller';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { BenhkhopgoiController } from './benhkhopgoi.controller';
import { BenhkhopgoiService } from './benhkhopgoi.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      limits: {
        fileSize: 1024 * 1024 * 600,
      },
    }),
  ],
  controllers: [FilesController, LoadModelController, BenhkhopgoiController],
  providers: [BenhkhopgoiService, ConfigService],
})
export class BenhkhopgoiModule {}
