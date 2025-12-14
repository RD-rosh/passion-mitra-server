import { Controller, Get, Query } from '@nestjs/common';
import { PrologService } from '../prolog/prolog.service';

@Controller('fertilizer')
export class FertilizerController {
    constructor(private readonly prologService: PrologService) { }

    @Get()
    async getAllFertilizers() {
        const query = `
      findall([ID, Stage, Fertilizer, Amount], fertilizer_schedule(ID, Stage, Fertilizer, Amount), L),
      write(L),
      halt.
    `;

        const result = await this.prologService.queryProlog(query);
        return { result }; // raw output from Prolog
    }
}
