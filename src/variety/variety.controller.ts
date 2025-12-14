import { Controller, Post, Body } from '@nestjs/common';
import { PrologService } from '../prolog/prolog.service';

@Controller('variety')
export class VarietyController {
    constructor(private readonly prologService: PrologService) { }

    @Post('recommend')
    async recommendVariety(@Body() body: {
        zone: string;
        altitude: number;
        diseaseProne: boolean;
    }) {

        const { zone, altitude, diseaseProne } = body;

        const query = `
      retractall(zone(_)),
      retractall(climate(_)),
      retractall(altitude_below(_)),
      retractall(altitude_above(_)),
      retractall(disease_prone_area(_)),

      assert(zone(${zone})),
      zone_climate(${zone}, C),
      assert(climate(C)),
      derive_altitude(${altitude}),
      assert(disease_prone_area(${diseaseProne ? 'yes' : 'no'})),

      findall([Variety, Confidence],
        recommend_variety_with_confidence(Variety, Confidence),
        L),
      write(L).
    `;

        const result = await this.prologService.queryProlog(query);
        return { result };
    }
}
