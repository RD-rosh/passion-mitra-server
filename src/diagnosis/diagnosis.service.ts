import { Injectable } from '@nestjs/common';

@Injectable()
export class DiagnosisService {
    diagnose(symptoms: string[]) {
        return {
            receivedSymptoms: symptoms,
            message: 'Diagnosis completed'
        }
    }
}
