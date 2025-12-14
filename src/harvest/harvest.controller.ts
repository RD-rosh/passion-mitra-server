import { Controller, Get, Query } from '@nestjs/common';
import { PrologService } from '../prolog/prolog.service';

@Controller('harvest')
export class HarvestController {
    constructor(private readonly prologService: PrologService) { }

    @Get()
    async getHarvestInfo(@Query('crop') crop: string) {
        const query = `findall(Info, harvest_time(${crop}, Info), L), write(L).`;
        const result = await this.prologService.queryProlog(query);
        return { result };
    }
}
