import React from 'react';
import { ConnectionStatus } from '../types';

interface HeaderProps {
  status: ConnectionStatus;
}

export const Header: React.FC<HeaderProps> = ({ status }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🏥 MedLens</h1>
            <p className="text-sm text-gray-600 mt-1">
              실시간 의료 데이터 모니터링 대시보드
            </p>
            <p className="text-xs text-gray-500 mt-1">
              API: {import.meta.env.VITE_API_URL || 'http://localhost:3001'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">연결 상태</p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    status === 'connected'
                      ? 'bg-green-500'
                      : status === 'connecting'
                        ? 'bg-yellow-500'
                        : status === 'error'
                          ? 'bg-red-500'
                          : 'bg-gray-400'
                  }`}
                />
                <span className="text-sm font-semibold text-gray-700">
                  {status === 'connected' && '연결됨'}
                  {status === 'connecting' && '연결 중...'}
                  {status === 'disconnected' && '연결 해제'}
                  {status === 'error' && '오류'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
