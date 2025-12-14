import { Test, TestingModule } from '@nestjs/testing';
import { AdvicesController } from './advices.controller';

describe('AdvicesController', () => {
  let controller: AdvicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvicesController],
    }).compile();

    controller = module.get<AdvicesController>(AdvicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
