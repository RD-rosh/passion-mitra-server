import { Controller, Post } from '@nestjs/common';
import { PrologService } from './prolog.service';

@Controller('prolog')
export class PrologController {
    constructor(private readonly prologService: PrologService) { }

    @Post('reset')
    async reset() {
        const query = `
      retractall(_),
      write('reset_done').
    `;
        const result = await this.prologService.queryProlog(query);
        return { result };
    }
}
