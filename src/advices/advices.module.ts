import { Module } from '@nestjs/common';
import { AdvicesController } from './advices.controller';
import { PrologModule } from '../prolog/prolog.module';

@Module({
  imports: [PrologModule],
  controllers: [AdvicesController],
})
export class AdvicesModule { }
