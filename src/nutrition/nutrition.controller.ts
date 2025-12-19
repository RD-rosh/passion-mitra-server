import { Controller, Get } from '@nestjs/common';
import { PrologService } from '../prolog/prolog.service';

@Controller('nutrition')
export class NutritionController {
    constructor(private readonly prologService: PrologService) { }

    @Get()
    async getNutrition() {
        const query = `
      findall([Type, Value, Unit], nutrition(Type, Value, Unit), L),
      write(L).
    `;

        const rawResult = await this.prologService.queryProlog(query);
        const nutrition = this.parsePrologList(rawResult);

        return { nutrition };
    }

    private parsePrologList(raw: string[]) {
        if (!raw) return [];

        const cleaned = raw[0].replace(/^\[|\]$/g, '').trim();
        if (!cleaned) return [];

        return cleaned.split('],[').map(item => {
            const values = item.replace(/^\[|\]$/g, '').split(',');
            return {
                type: values[0].trim(),
                value: Number(values[1]),
                unit: values[2].trim().replace(/^'|'$/g, ''),
            };
        });
    }
}
