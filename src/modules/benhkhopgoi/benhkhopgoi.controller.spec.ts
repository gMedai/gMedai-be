import { Test, TestingModule } from '@nestjs/testing';
import { BenhkhopgoiController } from './benhkhopgoi.controller';

describe('BenhkhopgoiController', () => {
  let controller: BenhkhopgoiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BenhkhopgoiController],
    }).compile();

    controller = module.get<BenhkhopgoiController>(BenhkhopgoiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
