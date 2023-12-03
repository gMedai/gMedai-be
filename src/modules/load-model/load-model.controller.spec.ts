import { Test, TestingModule } from '@nestjs/testing';
import { LoadModelController } from './load-model.controller';

describe('LoadModelController', () => {
  let controller: LoadModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadModelController],
    }).compile();

    controller = module.get<LoadModelController>(LoadModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
