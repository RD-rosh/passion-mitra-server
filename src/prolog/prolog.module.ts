import { Module } from '@nestjs/common';
import { PrologService } from './prolog.service';

@Module({
    providers: [PrologService],
    exports: [PrologService],
})
export class PrologModule { }
