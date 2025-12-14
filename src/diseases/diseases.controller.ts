import { Controller, Get, Query } from '@nestjs/common';
import { PrologService } from '../prolog/prolog.service';

@Controller('diseases')
export class DiseasesController {
    constructor(private readonly prologService: PrologService) { }

    @Get('diagnose')
    async diagnose(@Query('symptoms') symptoms: string) {
        const symptomList = symptoms.split(',');
        const query = `assert(observed_symptoms([${symptomList.join(',')}])), findall(Disease-Certainty, diagnose_condition(Disease, Certainty), L), write(L).`;
        const result = await this.prologService.queryProlog(query);
        return { result };
    }
}
