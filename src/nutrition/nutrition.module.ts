import { Module } from '@nestjs/common';
import { NutritionController } from './nutrition.controller';
import { PrologModule } from '../prolog/prolog.module';

@Module({
  imports: [PrologModule],
  controllers: [NutritionController],
})
export class NutritionModule { }
