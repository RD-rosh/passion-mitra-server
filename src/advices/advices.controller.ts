import { Controller, Get, Query } from '@nestjs/common';
import { PrologService } from '../prolog/prolog.service';

@Controller('advices')
export class AdvicesController {
    constructor(private readonly prologService: PrologService) { }

    @Get()
    async getAdvice(@Query('disease') disease: string) {
        const query = `findall(Advice, recommend_advice(${disease}, Advice), L), write(L).`;
        const result = await this.prologService.queryProlog(query);
        return { result };
    }
}
