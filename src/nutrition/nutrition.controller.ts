import { Controller, Get, Query } from '@nestjs/common';
import { PrologService } from '../prolog/prolog.service';

@Controller('nutrition')
export class NutritionController {
    constructor(private readonly prologService: PrologService) { }

    @Get()
    async getNutrition() {
        const query = `
      findall([Type, Value, Unit], nutrition(Type, Value, Unit), L), write(L), halt.
    `;

        const result = await this.prologService.queryProlog(query);
        return { result }; // simple string output from Prolog
    }
}

