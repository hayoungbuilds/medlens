import React from 'react';
import { VitalStats } from '../hooks/useVitalSigns';

interface DashboardStatsProps {
  patientCount: number;
  stats: VitalStats;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  patientCount,
  stats,
}) => {
  return (
    <div className="grid grid-cols-5 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <p className="text-gray-600 text-sm">모니터링 중인 환자</p>
        <p className="text-3xl font-bold text-gray-900">{patientCount}</p>
      </div>
      <div className="bg-green-50 rounded-lg shadow p-4 text-center border-l-4 border-medical-stable">
        <p className="text-gray-600 text-sm">정상 상태</p>
        <p className="text-3xl font-bold text-medical-stable">
          {stats.stableCount}
        </p>
      </div>
      <div className="bg-yellow-50 rounded-lg shadow p-4 text-center border-l-4 border-medical-warning">
        <p className="text-gray-600 text-sm">주의 필요</p>
        <p className="text-3xl font-bold text-medical-warning">
          {stats.warningCount}
        </p>
      </div>
      <div className="bg-red-50 rounded-lg shadow p-4 text-center border-l-4 border-medical-critical">
        <p className="text-gray-600 text-sm">위험</p>
        <p className="text-3xl font-bold text-medical-critical">
          {stats.criticalCount}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-600 text-sm">평균 심박수</p>
        <p className="text-3xl font-bold text-gray-900">{stats.avgHeartRate}</p>
        <p className="text-xs text-gray-500">bpm</p>
      </div>
    </div>
  );
};
