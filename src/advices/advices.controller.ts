import { Controller, Get, Query } from '@nestjs/common';
import { PrologService } from '../prolog/prolog.service';

@Controller('advices')
export class AdvicesController {
    constructor(private readonly prologService: PrologService) { }

    @Get()
    async getAdvice(@Query('disease') disease: string) {
        const query = `
      findall(Advice, recommend_advice(${disease}, Advice), L),
      write(L).
    `;

        const rawResult = await this.prologService.queryProlog(query);
        const advices = this.parsePrologList(rawResult);

        return {
            disease,
            advices,
        };
    }

    private parsePrologList(raw: string[]): string[] {
        if (!raw) return [];

        // remove [ ]
        const cleaned = raw[0].replace(/^\[|\]$/g, '').trim();
        if (!cleaned) return [];

        return cleaned
            .split(',')
            .map(item =>
                item
                    .trim()
                    .replace(/^'|'$/g, '') // remove single quotes
            );
    }
}
