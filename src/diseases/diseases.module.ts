import { Module } from '@nestjs/common';
import { DiseasesController } from './diseases.controller';
import { PrologModule } from '../prolog/prolog.module';

@Module({
  imports: [PrologModule],
  controllers: [DiseasesController],
})
export class DiseasesModule { }
