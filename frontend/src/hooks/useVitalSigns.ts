import { useMemo } from 'react';
import { PatientData } from '../types';

export interface VitalStats {
  avgHeartRate: number;
  avgSpo2: number;
  avgTemp: number;
  criticalCount: number;
  warningCount: number;
  stableCount: number;
}

export const useVitalSigns = (patients: PatientData[]) => {
  const stats = useMemo((): VitalStats => {
    if (patients.length === 0) {
      return {
        avgHeartRate: 0,
        avgSpo2: 0,
        avgTemp: 0,
        criticalCount: 0,
        warningCount: 0,
        stableCount: 0,
      };
    }

    const avgHeartRate =
      patients.reduce((sum, p) => sum + p.vitalSigns.heartRate, 0) /
      patients.length;
    const avgSpo2 =
      patients.reduce((sum, p) => sum + p.vitalSigns.spo2, 0) / patients.length;
    const avgTemp =
      patients.reduce((sum, p) => sum + p.vitalSigns.temperature, 0) /
      patients.length;

    const criticalCount = patients.filter(p => p.status === 'critical').length;
    const warningCount = patients.filter(p => p.status === 'warning').length;
    const stableCount = patients.filter(p => p.status === 'stable').length;

    return {
      avgHeartRate: Math.round(avgHeartRate * 10) / 10,
      avgSpo2: Math.round(avgSpo2 * 10) / 10,
      avgTemp: Math.round(avgTemp * 10) / 10,
      criticalCount,
      warningCount,
      stableCount,
    };
  }, [patients]);

  return stats;
};
