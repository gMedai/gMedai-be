import { Test, TestingModule } from '@nestjs/testing';
import { CognitoStrategyService as CognitoStrategyService } from './cognito-strategy.service';

describe('CognitoStrategyService', () => {
  let service: CognitoStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CognitoStrategyService],
    }).compile();

    service = module.get<CognitoStrategyService>(CognitoStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
