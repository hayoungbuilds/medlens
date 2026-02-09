import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { PatientSimulator } from './PatientSimulator.js';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3001', 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const PATIENT_COUNT = parseInt(process.env.PATIENT_COUNT || '20', 10);
const UPDATE_INTERVAL = parseInt(process.env.UPDATE_INTERVAL || '1000', 10);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

// 의료 데이터 시뮬레이터 초기화
const simulator = new PatientSimulator(PATIENT_COUNT, UPDATE_INTERVAL);

// 미들웨어
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// 헬스 체크 엔드포인트
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 초기 환자 데이터 제공
app.get('/api/patients', (req, res) => {
  res.json(simulator.getPatients());
});

// WebSocket 이벤트 핸들링
io.on('connection', (socket) => {
  const clientId = socket.id;
  console.log(`📱 Client connected: ${clientId}`);

  // 연결된 클라이언트에 초기 데이터 전송
  socket.emit('initial-data', simulator.getPatients());

  socket.on('disconnect', () => {
    console.log(`📱 Client disconnected: ${clientId}`);
  });

  socket.on('request-patient', (patientId) => {
    const patient = simulator.getPatient(patientId);
    if (patient) {
      socket.emit('patient-data', patient);
    }
  });
});

// 실시간 데이터 스트리밍
simulator.start((patients) => {
  io.emit('vital-update', patients);
});

// 서버 시작
httpServer.listen(PORT, () => {
  console.log(`🏥 MedLens Backend running on http://localhost:${PORT}`);
  console.log(`💬 WebSocket endpoint: ws://localhost:${PORT}`);
});

// 우아한 종료
process.on('SIGINT', () => {
  console.log('\n⏹️  Shutting down gracefully...');
  simulator.stop();
  httpServer.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
