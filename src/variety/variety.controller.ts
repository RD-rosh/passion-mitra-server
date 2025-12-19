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

    const rawResult = await this.prologService.queryProlog(query);
    const parsed = this.parsePrologList(rawResult);

    const result = parsed.map(([name, confidence]) => ({
      id: name,
      name: name.replace(/_/g, ' '),
      confidence: Number(confidence),
    }));

    return { result };
  }



  private parsePrologList(raw: string[]): [string, string][] {
    if (!raw) return [];

    const cleaned = raw[0].replace(/^\[|\]$/g, '').trim();
    if (!cleaned) return [];

    return cleaned.split('],[').map(item => {
      const values = item.replace(/^\[|\]$/g, '').split(',');
      return [values[0].trim(), values[1].trim()];
    });
  }
}
