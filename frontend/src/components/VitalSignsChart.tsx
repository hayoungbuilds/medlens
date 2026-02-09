import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PatientData } from '../types';

interface VitalSignsChartProps {
  patient: PatientData | undefined;
  history: any[];
}

export const VitalSignsChart: React.FC<VitalSignsChartProps> = ({
  patient,
  history,
}) => {
  // 최근 30개 데이터만 표시 (성능 최적화)
  const chartData = useMemo(() => {
    return history.slice(-30).map(item => ({
      time: new Date(item.timestamp).toLocaleTimeString('ko-KR'),
      heartRate: item.heartRate,
      spo2: item.spo2,
      temp: item.temperature,
    }));
  }, [history]);

  if (!patient || chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p>환자 데이터를 선택해주세요</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">{patient.name} - 생체신호 추이</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="heartRate"
            stroke="#ef4444"
            dot={false}
            isAnimationActive={false}
            name="심박수 (bpm)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="spo2"
            stroke="#3b82f6"
            dot={false}
            isAnimationActive={false}
            name="SpO2 (%)"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temp"
            stroke="#f59e0b"
            dot={false}
            isAnimationActive={false}
            name="체온 (°C)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
