import { Module } from '@nestjs/common';
import { HarvestController } from './harvest.controller';
import { PrologModule } from '../prolog/prolog.module';

@Module({
  imports: [PrologModule],
  controllers: [HarvestController],
})
export class HarvestModule { }
