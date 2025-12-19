import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrologService } from '../prolog/prolog.service';

@Controller('fertilizer')
export class FertilizerController {
  constructor(private readonly prologService: PrologService) { }

  //Get All Fertilizers

  @Get()
  async getAllFertilizers() {
    const query = `
      findall([ID, Stage, Fertilizer, Amount],
        fertilizer_schedule(ID, Stage, Fertilizer, Amount),
        L),
      write(L).
    `;

    const rawResult = await this.prologService.queryProlog(query);
    const fertilizers = this.parseScheduleList(rawResult);

    return { fertilizers };
  }

  //Recommend Fertilizer

  @Post('recommend')
  async recommendFertilizer(
    @Body() body: { zone: string; stage: string }
  ) {
    const { zone, stage } = body;

    const query = `
      findall([Fertilizer, Amount],
        fertilizer(${zone}, ${stage}, Fertilizer, Amount),
        L),
      write(L).
    `;

    const rawResult = await this.prologService.queryProlog(query);
    const recommendations = this.parseRecommendationList(rawResult);

    return {
      zone,
      stage,
      recommendations,
    };
  }

  private parseScheduleList(raw: string[]) {
    if (!raw) return [];

    const cleaned = raw[0].replace(/^\[|\]$/g, '').trim();
    if (!cleaned) return [];

    return cleaned.split('],[').map(item => {
      const values = item
        .replace(/^\[|\]$/g, '')
        .split(',');

      return {
        id: Number(values[0]),
        stage: values[1].trim(),
        fertilizer: values[2].trim(),
        amount: Number(values[3]),
      };
    });
  }

  private parseRecommendationList(raw: string[]) {
    if (!raw) return [];

    const cleaned = raw[0].replace(/^\[|\]$/g, '').trim();
    if (!cleaned) return [];

    return cleaned.split('],[').map(item => {
      const values = item
        .replace(/^\[|\]$/g, '')
        .split(',');

      return {
        fertilizer: values[0].trim(),
        amount: Number(values[1]),
      };
    });
  }
}
