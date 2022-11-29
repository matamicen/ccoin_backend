import { Test, TestingModule } from '@nestjs/testing';
import { SdgsService } from './sdgs.service';

describe('SdgsService', () => {
  let service: SdgsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SdgsService],
    }).compile();

    service = module.get<SdgsService>(SdgsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
