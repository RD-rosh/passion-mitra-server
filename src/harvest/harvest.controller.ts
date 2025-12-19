import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { PrologService } from '../prolog/prolog.service';

@Controller('harvest')
export class HarvestController {
    constructor(private readonly prologService: PrologService) { }

    //Get Harvest Times

    @Get()
    async getHarvestInfo(@Query('crop') crop: string) {
        const query = `
      findall(Info, harvest_time(${crop}, Info), L),
      write(L).
    `;

        const rawResult = await this.prologService.queryProlog(query);
        const harvestTimes = this.parsePrologList(rawResult);

        return {
            crop,
            harvest_times: harvestTimes,
        };
    }

    //Check Ready To Harvest
    @Post('check')
    async checkHarvest(@Body() body: { variety: string; daysSinceFlowering: number }) {
        const { variety, daysSinceFlowering } = body;

        const query = `
      retractall(days_since_flowering(_)),
      assert(days_since_flowering(${daysSinceFlowering})),
      ( ready_to_harvest(${variety}) -> write(ready) ; write(not_ready) ).
    `;

        const rawResult = await this.prologService.queryProlog(query);
        const status = rawResult[0].trim() || 'unknown';

        return {
            variety,
            daysSinceFlowering,
            status,
        };
    }

    // PREDICT YIELD

    @Post('yield')
    async predictYield(@Body() body: { variety: string; plantAge: number }) {
        const { variety, plantAge } = body;

        const query = `
      retractall(plant_age(_)),
      assert(plant_age(${plantAge})),
      predict_yield(${variety}, Yield),
      write(Yield).
    `;

        const rawResult = await this.prologService.queryProlog(query);
        const predictedYield = rawResult[0].trim() || 'unknown';

        return {
            variety,
            plantAge,
            predictedYield,
        };
    }


    private parsePrologList(raw: string[]): string[] {
        if (!raw) return [];

        const cleaned = raw[0].replace(/^\[|\]$/g, '').trim();
        if (!cleaned) return [];

        return cleaned
            .split(',')
            .map(item => item.trim().replace(/^'|'$/g, ''));
    }
}
