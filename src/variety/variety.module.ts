import { Module } from '@nestjs/common';
import { VarietyController } from './variety.controller';
import { VarietyService } from './variety.service';

@Module({
  controllers: [VarietyController],
  providers: [VarietyService]
})
export class VarietyModule {}
