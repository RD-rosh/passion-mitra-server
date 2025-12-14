import { Controller, Get, Query, Post, Body } from '@nestjs/common';
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

    @Post('check')
    async checkHarvest(@Body() body: {
        variety: string;
        daysSinceFlowering: number;
    }) {
        const { variety, daysSinceFlowering } = body;

        const query = `
    retractall(days_since_flowering(_)),
    assert(days_since_flowering(${daysSinceFlowering})),
    ( ready_to_harvest(${variety}) -> write(ready) ; write(not_ready) ).
  `;

        const result = await this.prologService.queryProlog(query);
        return { result };
    }

    @Post('yield')
    async predictYield(@Body() body: {
        variety: string;
        plantAge: number;
    }) {
        const { variety, plantAge } = body;

        const query = `
    retractall(plant_age(_)),
    assert(plant_age(${plantAge})),
    predict_yield(${variety}, Yield),
    write(Yield).
  `;

        const result = await this.prologService.queryProlog(query);
        return { result };
    }


}
