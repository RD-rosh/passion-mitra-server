import { Controller, Get, Query, Post, Body } from '@nestjs/common';
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

    @Post('recommend')
    async recommendFertilizer(@Body() body: {
        zone: string;
        stage: string;
    }) {
        const { zone, stage } = body;

        const query = `
    findall([Fertilizer, Amount],
      fertilizer(${zone}, ${stage}, Fertilizer, Amount),
      L),
    write(L).
  `;

        const result = await this.prologService.queryProlog(query);
        return { result };
    }

}
