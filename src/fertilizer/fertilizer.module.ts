import { Module } from '@nestjs/common';
import { FertilizerController } from './fertilizer.controller';
import { PrologModule } from '../prolog/prolog.module';

@Module({
  imports: [PrologModule],
  controllers: [FertilizerController],
})
export class FertilizerModule { }
