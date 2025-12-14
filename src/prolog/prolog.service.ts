import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';

@Injectable()
export class PrologService {
    private kbPath = '/Users/rd/Projects/passion_mitra_prolog/knowledge_base.pl';

    queryProlog(query: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const prolog = spawn('swipl', ['-q', '-s', this.kbPath, '-g', query, '-t', 'halt.']);

            let result: string[] = [];
            let errorOutput = '';

            prolog.stdout.on('data', (data) => {
                const output = data.toString().trim();
                if (output) result.push(output);
            });

            prolog.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            prolog.on('close', (code) => {
                if (code !== 0) reject(errorOutput);
                else resolve(result);
            });
        });
    }
}
