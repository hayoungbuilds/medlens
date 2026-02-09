import { useEffect, useState } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import { useVitalSigns } from './hooks/useVitalSigns';
import { usePatientStore } from './stores/patientStore';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorAlert } from './components/ErrorAlert';
import { MainContent } from './components/MainContent';
import './index.css';

function App() {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const { status, patients, error } = useWebSocket(apiUrl);
  const stats = useVitalSigns(patients);
  const selectedPatientId = usePatientStore(s => s.selectedPatientId);
  const setSelectedPatient = usePatientStore(s => s.setSelectedPatient);
  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  // 선택한 환자의 생체신호 히스토리 관리
  const [vitalHistory, setVitalHistory] = useState<any[]>([]);

  useEffect(() => {
    if (selectedPatient && vitalHistory.length === 0) {
      setVitalHistory([selectedPatient.vitalSigns]);
    } else if (selectedPatient && vitalHistory.length > 0) {
      const lastRecord = vitalHistory[vitalHistory.length - 1];
      if (
        lastRecord.timestamp !== selectedPatient.vitalSigns.timestamp
      ) {
        setVitalHistory(prev => [...prev.slice(-99), selectedPatient.vitalSigns]);
      }
    }
  }, [selectedPatient, vitalHistory]);

  // 초기 환자 선택
  useEffect(() => {
    if (patients.length > 0 && !selectedPatientId) {
      setSelectedPatient(patients[0].id);
    }
  }, [patients.length, selectedPatientId, setSelectedPatient]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header status={status} />
      <ErrorAlert error={error} />
      <MainContent
        patients={patients}
        stats={stats}
        selectedPatientId={selectedPatientId}
        selectedPatient={selectedPatient}
        vitalHistory={vitalHistory}
        onSelectPatient={setSelectedPatient}
      />
      <Footer />
    </div>
  );
}

export default App;
