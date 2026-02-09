import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        <p>
          MedLens © 2024 - 의료 데이터 분석 대시보드 포트폴리오 프로젝트
        </p>
        <p className="mt-2 text-gray-500">
          WebSocket을 통한 실시간 생체신호 모니터링
        </p>
      </div>
    </footer>
  );
};
