import React from 'react';
import { PatientData } from '../types';

interface PatientGridProps {
  patients: PatientData[];
  selectedPatientId: string | null;
  onSelectPatient: (id: string) => void;
}

const getStatusColor = (status: PatientData['status']) => {
  switch (status) {
    case 'stable':
      return 'bg-green-50 border-l-4 border-medical-stable';
    case 'warning':
      return 'bg-yellow-50 border-l-4 border-medical-warning';
    case 'critical':
      return 'bg-red-50 border-l-4 border-medical-critical';
  }
};

const getStatusBadge = (status: PatientData['status']) => {
  switch (status) {
    case 'stable':
      return <span className="px-3 py-1 bg-medical-stable text-white text-xs rounded-full">정상</span>;
    case 'warning':
      return <span className="px-3 py-1 bg-medical-warning text-white text-xs rounded-full">주의</span>;
    case 'critical':
      return <span className="px-3 py-1 bg-medical-critical text-white text-xs rounded-full">위험</span>;
  }
};

export const PatientGrid: React.FC<PatientGridProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
}) => {
  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {patients.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>환자 데이터를 기다리는 중...</p>
        </div>
      ) : (
        patients.map(patient => (
          <div
            key={patient.id}
            className={`${getStatusColor(patient.status)} p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedPatientId === patient.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onSelectPatient(patient.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold text-gray-900">{patient.name}</p>
                <p className="text-sm text-gray-600">
                  {patient.id} · {patient.age}세 · {patient.ward}
                </p>
              </div>
              {getStatusBadge(patient.status)}
            </div>
            <p className="text-xs text-gray-600 mb-3">{patient.diagnosis}</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-gray-600">HR</p>
                <p className="font-semibold text-gray-900">
                  {Math.round(patient.vitalSigns.heartRate)} bpm
                </p>
              </div>
              <div>
                <p className="text-gray-600">SpO2</p>
                <p className="font-semibold text-gray-900">
                  {Math.round(patient.vitalSigns.spo2)}%
                </p>
              </div>
              <div>
                <p className="text-gray-600">체온</p>
                <p className="font-semibold text-gray-900">
                  {patient.vitalSigns.temperature.toFixed(1)}°C
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
