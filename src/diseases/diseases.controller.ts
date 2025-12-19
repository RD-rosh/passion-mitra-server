import { Controller, Get, Query } from '@nestjs/common';
import { PrologService } from '../prolog/prolog.service';

@Controller('diseases')
export class DiseasesController {
    constructor(private readonly prologService: PrologService) { }

    @Get('diagnose')
    async diagnose(@Query('symptoms') symptoms: string) {
        const symptomList = symptoms.split(',');

        const query = `
      retractall(observed_symptoms(_)),
      assert(observed_symptoms([${symptomList.join(',')}])),
      findall(Disease-Certainty, diagnose_condition(Disease, Certainty), L),
      write(L).
    `;

        const rawResult = await this.prologService.queryProlog(query);

        const diagnoses = this.parsePrologList(rawResult);

        return { diagnoses };
    }

    private parsePrologList(raw: string[]) {
        // remove [ ]
        const cleaned = raw[0].replace(/^\[|\]$/g, '');

        if (!cleaned.trim()) return [];

        return cleaned.split(',').map(item => {
            const [disease, confidence] = item.split('-');
            return {
                disease: disease.trim(),
                confidence: Number(confidence),
            };
        });
    }
}
