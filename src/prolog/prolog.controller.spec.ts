import { Test, TestingModule } from '@nestjs/testing';
import { PrologController } from './prolog.controller';

describe('PrologController', () => {
  let controller: PrologController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrologController],
    }).compile();

    controller = module.get<PrologController>(PrologController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
