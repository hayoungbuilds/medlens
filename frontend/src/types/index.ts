// 의료 데이터 타입 정의

export interface VitalSigns {
  heartRate: number;
  systolic: number;
  diastolic: number;
  spo2: number;
  temperature: number;
  respiratoryRate: number;
  timestamp: number;
}

export interface PatientData {
  id: string;
  name: string;
  age: number;
  ward: string;
  diagnosis: string;
  vitalSigns: VitalSigns;
  status: 'stable' | 'warning' | 'critical';
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';
