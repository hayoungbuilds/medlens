import React from 'react';
import { PatientData } from '../types';

interface PatientDetailsCardProps {
  patient: PatientData | undefined;
}

export const PatientDetailsCard: React.FC<PatientDetailsCardProps> = ({
  patient,
}) => {
  if (!patient) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        환자 상세 정보 - {patient.name}
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-600 text-sm">환자 ID</p>
          <p className="text-lg font-semibold text-gray-900">{patient.id}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">나이</p>
          <p className="text-lg font-semibold text-gray-900">
            {patient.age}세
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">병동</p>
          <p className="text-lg font-semibold text-gray-900">{patient.ward}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">진단</p>
          <p className="text-lg font-semibold text-gray-900">
            {patient.diagnosis}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          현재 생체신호
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-50 rounded p-4 text-center">
            <p className="text-gray-600 text-sm">심박수</p>
            <p className="text-2xl font-bold text-red-600">
              {Math.round(patient.vitalSigns.heartRate)}
            </p>
            <p className="text-xs text-gray-500">bpm</p>
          </div>
          <div className="bg-blue-50 rounded p-4 text-center">
            <p className="text-gray-600 text-sm">산소포화도</p>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(patient.vitalSigns.spo2)}
            </p>
            <p className="text-xs text-gray-500">%</p>
          </div>
          <div className="bg-amber-50 rounded p-4 text-center">
            <p className="text-gray-600 text-sm">체온</p>
            <p className="text-2xl font-bold text-amber-600">
              {patient.vitalSigns.temperature.toFixed(1)}
            </p>
            <p className="text-xs text-gray-500">°C</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-purple-50 rounded p-4 text-center">
            <p className="text-gray-600 text-sm">혈압</p>
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(patient.vitalSigns.systolic)}/
              {Math.round(patient.vitalSigns.diastolic)}
            </p>
            <p className="text-xs text-gray-500">mmHg</p>
          </div>
          <div className="bg-green-50 rounded p-4 text-center">
            <p className="text-gray-600 text-sm">호흡수</p>
            <p className="text-2xl font-bold text-green-600">
              {Math.round(patient.vitalSigns.respiratoryRate)}
            </p>
            <p className="text-xs text-gray-500">회/분</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">상태</p>
            <div className="mt-2">
              {patient.status === 'stable' && (
                <span className="inline-block px-4 py-2 bg-medical-stable text-white rounded-full text-sm font-semibold">
                  ✓ 정상
                </span>
              )}
              {patient.status === 'warning' && (
                <span className="inline-block px-4 py-2 bg-medical-warning text-white rounded-full text-sm font-semibold">
                  ⚠ 주의
                </span>
              )}
              {patient.status === 'critical' && (
                <span className="inline-block px-4 py-2 bg-medical-critical text-white rounded-full text-sm font-semibold">
                  🚨 위험
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
