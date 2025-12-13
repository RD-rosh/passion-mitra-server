import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { VarietyModule } from './variety/variety.module';

@Module({
  imports: [DiagnosisModule, VarietyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
