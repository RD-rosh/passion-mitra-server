import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { VarietyModule } from './variety/variety.module';
import { PrologService } from './prolog/prolog.service';
import { PrologController } from './prolog/prolog.controller';

@Module({
  imports: [DiagnosisModule, VarietyModule],
  controllers: [AppController, PrologController],
  providers: [AppService, PrologService],
})
export class AppModule {}
