import { Module } from '@nestjs/common';
import { PrologModule } from './prolog/prolog.module';
import { DiseasesModule } from './diseases/diseases.module';
import { AdvicesModule } from './advices/advices.module';
import { FertilizerModule } from './fertilizer/fertilizer.module';
import { HarvestModule } from './harvest/harvest.module';
import { NutritionModule } from './nutrition/nutrition.module';

@Module({
  imports: [
    PrologModule,
    DiseasesModule,
    AdvicesModule,
    FertilizerModule,
    HarvestModule,
    NutritionModule,
  ],
})
export class AppModule { }
