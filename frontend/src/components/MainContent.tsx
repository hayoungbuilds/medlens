import React from 'react';
import { PatientData } from '../types';
import { VitalStats } from '../hooks/useVitalSigns';
import { DashboardStats } from './DashboardStats';
import { PatientGrid } from './PatientGrid';
import { VitalSignsChart } from './VitalSignsChart';
import { PatientDetailsCard } from './PatientDetailsCard';

interface MainContentProps {
  patients: PatientData[];
  stats: VitalStats;
  selectedPatientId: string | null;
  selectedPatient: PatientData | undefined;
  vitalHistory: any[];
  onSelectPatient: (id: string) => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  patients,
  stats,
  selectedPatientId,
  selectedPatient,
  vitalHistory,
  onSelectPatient,
}) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* 대시보드 요약 */}
      <DashboardStats patientCount={patients.length} stats={stats} />

      {/* 메인 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 환자 목록 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">👥 환자 목록</h2>
            <PatientGrid
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={onSelectPatient}
            />
          </div>
        </div>

        {/* 차트 및 상세 정보 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 생체신호 차트 */}
          <VitalSignsChart patient={selectedPatient} history={vitalHistory} />

          {/* 선택된 환자 상세 정보 */}
          <PatientDetailsCard patient={selectedPatient} />
        </div>
      </div>
    </main>
  );
};
