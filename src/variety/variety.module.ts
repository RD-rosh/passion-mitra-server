import { Module } from '@nestjs/common';
import { VarietyController } from './variety.controller';
import { PrologService } from '../prolog/prolog.service';
@Module({
  controllers: [VarietyController],
  providers: [PrologService]
})
export class VarietyModule {

}
