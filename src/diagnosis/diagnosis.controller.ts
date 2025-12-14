import { Body, Controller, Post } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';

@Controller('diagnosis')
export class DiagnosisController {
    constructor(private readonly diagnosisService: DiagnosisService) { }

    @Post()
    async diagnose(@Body() body: { symptoms: string[] }) {
        return this.diagnosisService.diagnose(body.symptoms);
    }
}
