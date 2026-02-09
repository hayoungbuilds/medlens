// 의료 데이터 시뮬레이터 - 실제 임상 범위를 반영한 합성 데이터 생성

interface VitalSigns {
  heartRate: number;
  systolic: number;
  diastolic: number;
  spo2: number;
  temperature: number;
  respiratoryRate: number;
  timestamp: number;
}

interface PatientData {
  id: string;
  name: string;
  age: number;
  ward: string;
  diagnosis: string;
  vitalSigns: VitalSigns;
  status: 'stable' | 'warning' | 'critical';
}

export class PatientSimulator {
  private patients: Map<string, PatientData> = new Map();
  private readonly patientCount: number;
  private readonly updateInterval: number;
  private interval: NodeJS.Timeout | null = null;
  private currentTimestamp: number = 0;

  constructor(patientCount: number = 20, updateInterval: number = 1000) {
    this.patientCount = patientCount;
    this.updateInterval = updateInterval;
    this.initializePatients();
  }

  private initializePatients(): void {
    const wards = ['ICU', 'CCU', '일반병동 2A', '일반병동 3B'];
    const diagnoses = [
      'Pneumonia',
      'Heart Failure',
      'Sepsis',
      'Post-operative',
      'Acute MI',
    ];
    const names = [
      'Kim, J',
      'Lee, M',
      'Park, S',
      'Choi, K',
      'Jung, H',
      'Kang, Y',
      'Lim, J',
      'Han, D',
    ];

    for (let i = 1; i <= this.patientCount; i++) {
      const patientId = `PAT${String(i).padStart(4, '0')}`;
      const patient: PatientData = {
        id: patientId,
        name: names[i % names.length],
        age: 55 + Math.floor(Math.random() * 35),
        ward: wards[Math.floor(Math.random() * wards.length)],
        diagnosis:
          diagnoses[Math.floor(Math.random() * diagnoses.length)],
        vitalSigns: this.generateInitialVitals(),
        status: 'stable',
      };
      this.patients.set(patientId, patient);
    }
  }

  private generateInitialVitals(): VitalSigns {
    return {
      heartRate: 60 + Math.random() * 40,
      systolic: 110 + Math.random() * 30,
      diastolic: 65 + Math.random() * 20,
      spo2: 95 + Math.random() * 5,
      temperature: 36.5 + Math.random() * 1.5,
      respiratoryRate: 12 + Math.random() * 8,
      timestamp: Date.now(),
    };
  }

  private generateVitalUpdate(current: VitalSigns): VitalSigns {
    // Brownian motion을 이용한 현실적인 데이터 변화
    const drift = 0.98;
    const volatility = 0.5;

    const heartRate = Math.max(
      40,
      Math.min(120, current.heartRate * drift + Math.random() * volatility)
    );
    const systolic = Math.max(
      80,
      Math.min(180, current.systolic * drift + Math.random() * volatility)
    );
    const diastolic = Math.max(
      40,
      Math.min(110, current.diastolic * drift + Math.random() * volatility)
    );
    const spo2 = Math.max(85, Math.min(100, current.spo2 + (Math.random() - 0.5) * 0.5));
    const temperature = Math.max(
      36,
      Math.min(39, current.temperature + (Math.random() - 0.5) * 0.1)
    );
    const respiratoryRate = Math.max(
      8,
      Math.min(30, current.respiratoryRate + (Math.random() - 0.5) * 0.5)
    );

    return {
      heartRate,
      systolic,
      diastolic,
      spo2,
      temperature,
      respiratoryRate,
      timestamp: Date.now(),
    };
  }

  private evaluateStatus(vitals: VitalSigns): 'stable' | 'warning' | 'critical' {
    let score = 0;

    // qSOFA (Quick Sequential Organ Failure Assessment) 기반 간단한 평가
    if (vitals.heartRate < 40 || vitals.heartRate > 110) score++;
    if (vitals.systolic < 100 || vitals.systolic > 180) score++;
    if (vitals.spo2 < 92) score++;
    if (vitals.temperature < 36 || vitals.temperature > 38.5) score++;
    if (vitals.respiratoryRate < 10 || vitals.respiratoryRate > 25) score++;

    if (score >= 3) return 'critical';
    if (score >= 2) return 'warning';
    return 'stable';
  }

  public start(callback: (patients: PatientData[]) => void): void {
    this.interval = setInterval(() => {
      this.patients.forEach((patient) => {
        patient.vitalSigns = this.generateVitalUpdate(
          patient.vitalSigns
        );
        patient.status = this.evaluateStatus(patient.vitalSigns);
      });

      callback(Array.from(this.patients.values()));
    }, this.updateInterval);

    console.log(
      `✅ Patient simulator started: ${this.patientCount} patients, ${this.updateInterval}ms interval`
    );
  }

  public stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      console.log('⏹️  Patient simulator stopped');
    }
  }

  public getPatients(): PatientData[] {
    return Array.from(this.patients.values());
  }

  public getPatient(id: string): PatientData | undefined {
    return this.patients.get(id);
  }
}
