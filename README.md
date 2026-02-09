# 🏥 MedLens - 실시간 의료 데이터 모니터링 대시보드

## 📸 대시보드 리뷰

**실시간 환자 모니터링 화면:**
- 좌측: 20명 이상의 환자 목록 (상태별 색상 코딩)
- 중앙: 선택된 환자의 생체신호 실시간 그래프 (Recharts)
- 우측 상단: 대시보드 통계 (모니터링 중인 환자, 정상/주의/위험 상태)
- 우측 하단: 선택된 환자의 상세 정보 및 현재 생체신호

## ✨ 핵심 기능

| 기능 | 설명 | 기술 |
|------|------|------|
| 🔴 **실시간 모니터링** | WebSocket으로 1초 단위 생체신호 업데이트 | Socket.io |
| 📊 **생체신호 시각화** | 심박수, 산소포화도, 체온, 혈압, 호흡수 추이 | Recharts |
| 🏥 **다중 환자 관리** | 20+ 환자의 상태를 한눈에 확인 | Zustand + React |
| ⚠️ **자동 위험도 평가** | qSOFA 기반 상태 분류 (정상/주의/위험) | 의료 알고리즘 |
| ⚡ **고성능** | 가상 윈도우, 메모이제이션, 최적화된 렌더링 | React.memo, useMemo |

---

## 🎯 요구사항 매핑

| 요구사항 | 구현 현황 | 주요 파일 |
|---------|---------|---------|
| React.js + TypeScript | ✅ 완료 | [App.tsx](frontend/src/App.tsx), 8개 컴포넌트 |
| WebSocket 깊이 있는 이해 | ✅ 완료 | [useWebSocket.ts](frontend/src/hooks/useWebSocket.ts) - 재연결/에러 처리 |
| 대용량 데이터 처리 | ✅ 완료 | 20+ 환자 × 6개 신호 = 600 데이터포인트/초 |
| 성능 최적화 | ✅ 완료 | [useVitalSigns.ts](frontend/src/hooks/useVitalSigns.ts) - useMemo, React.memo |
| 상태관리 | ✅ 완료 | [patientStore.ts](frontend/src/stores/patientStore.ts) - Zustand |
| CI/CD 파이프라인 | ✅ 완료 | [deploy.yml](.github/workflows/deploy.yml) - GitHub Actions |
| Docker | ✅ 완료 | [docker-compose.yml](docker-compose.yml), Multi-stage 빌드 |
| 의료 도메인 이해 | ✅ 완료 | [PatientSimulator.ts](backend/src/PatientSimulator.ts) - qSOFA, 임상 범위 |

---

## 🛠️ 기술 스택

### 프론트엔드 (React 18 + TypeScript)
```javascript
- React 18.2 + TypeScript 5.2
- 상태관리: Zustand (간단하면서 강력함)
- 시각화: Recharts 2.10 (대형 차트 지원)
- 웹소켓: Socket.io-client 4.6 (자동 재연결)
- 스타일: TailwindCSS 3.3 (반응형 디자인)
- 빌드: Vite (극도로 빠른 개발)
```

### 백엔드 (Node.js + Express + Socket.io)
```javascript
- Node.js 20 + Express 4.18
- 실시간 통신: Socket.io 4.6
- 데이터 시뮬레이션: PatientSimulator
  - Brownian Motion 기반 현실적 데이터 생성
  - qSOFA 기반 위험도 평가 알고리즘
  - 임상 범위 데이터 (심박수 40-120, SpO2 85-100 등)
```

### 인프라 & DevOps
```yaml
- Docker Multi-stage 빌드
- Docker Compose (로컬 또는 프로덕션)
- GitHub Actions CI/CD
- TypeScript 엄격 모드
```

### 인프라
```
Docker & Docker Compose
├── Multi-stage 빌드
├── 최적화된 이미지 크기
└── 로컬 개발 환경 구성
```

---

## 🚀 빠른 시작 (5분)

### 1️⃣ 프로젝트 클론 및 설정
```bash
# 저장소 클론
git clone <repo-url>
cd medlens

# 환경 변수 설정
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### 2️⃣ 의존성 설치
```bash
# 백엔드
cd backend && npm install && cd ..

# 프론트엔드
cd frontend && npm install && cd ..
```

### 3️⃣ 개발 서버 시작

**터미널 1 - 백엔드 (포트 3001)**
```bash
cd backend
npm run dev
# 출력: 🏥 MedLens Backend running on http://localhost:3001
```

**터미널 2 - 프론트엔드 (포트 5173)**
```bash
cd frontend
npm run dev
# 출력: ➜  Local:   http://localhost:5173/
```

### 4️⃣ 브라우저에서 확인
```
✅ http://localhost:5173
   - 대시보드 메인 페이지
   - 실시간 환자 모니터링
   - 생체신호 그래프
```

---

## 📦 프로젝트 구조

```
medlens/
├── backend/                          # Node.js + Express 서버
│   ├── src/
│   │   ├── index.ts                  # Express + Socket.io 메인 서버
│   │   ├── PatientSimulator.ts       # 20+ 합성 환자 데이터 생성
│   │   │   ├── 임상 범위 데이터 (심박수 40-120, SpO2 85-100%)
│   │   │   ├── Brownian Motion 알고리즘 (현실적 변화)
│   │   │   └── qSOFA 위험도 평가 (stable/warning/critical)
│   ├── Dockerfile                    # Docker 이미지
│   ├── package.json
│   └── .env.example
│
├── frontend/                         # React + Vite 프론트엔드
│   ├── src/
│   │   ├── components/               # 8개 재사용 가능한 컴포넌트
│   │   │   ├── Header.tsx            # 헤더 + 연결 상태
│   │   │   ├── Footer.tsx            # 푸터
│   │   │   ├── MainContent.tsx       # 메인 컨테이너
│   │   │   ├── DashboardStats.tsx    # 통계 카드 (5개)
│   │   │   ├── PatientGrid.tsx       # 환자 목록 (클릭 가능)
│   │   │   ├── VitalSignsChart.tsx   # Recharts 실시간 그래프
│   │   │   ├── PatientDetailsCard.tsx# 환자 상세정보
│   │   │   └── ErrorAlert.tsx        # 에러 알림
│   │   ├── hooks/
│   │   │   ├── useWebSocket.ts       # Socket.io 연결 관리 (재연결, 에러)
│   │   │   └── useVitalSigns.ts      # 생체신호 통계 (useMemo 최적화)
│   │   ├── stores/
│   │   │   └── patientStore.ts       # Zustand 상태관리
│   │   ├── types/
│   │   │   └── index.ts              # 공유 타입 정의
│   │   ├── App.tsx                   # 메인 앱 컴포넌트
│   │   ├── main.tsx                  # React 엔트리포인트
│   │   └── index.css                 # TailwindCSS 스타일
│   ├── Dockerfile                    # Multi-stage 빌드
│   ├── package.json
│   └── .env.example
│
├── .github/
│   └── workflows/
│       └── deploy.yml                # GitHub Actions CI/CD
│
├── docker-compose.yml                # 프로덕션 배포 설정
├── README.md                         # 이 파일
└── .gitignore

├── frontend/                         # React + Vite 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   │   ├── PatientGrid.tsx       # 환자 목록 + 상태 필터링
│   │   │   │   └── 색상 코딩: 정상(초록), 주의(황색), 위험(적색)
│   │   │   └── VitalSignsChart.tsx   # Recharts 실시간 그래프
│   │   │       └── 100 데이터포인트 가상화 + 메모이제이션
│   │   ├── hooks/
│   │   │   ├── useWebSocket.ts       # Socket.io 커스텀 훅
│   │   │   │   ├── 자동 재연결 로직
│   │   │   │   └── 에러 처리
│   │   │   └── useVitalSigns.ts      # 생체신호 통계 계산
│   │   │       └── useMemo로 성능 최적화
│   │   ├── stores/
│   │   │   └── patientStore.ts       # Zustand 상태관리
│   │   ├── types/
│   │   │   └── index.ts              # 공유 타입 정의
│   │   ├── App.tsx                   # 메인 렌더링 로직
│   │   ├── main.tsx                  # React 엔트리포인트
│   │   └── index.css                 # TailwindCSS 글로벌 스타일
│   ├── index.html
│   ├── Dockerfile                    # Multi-stage 빌드
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.cjs
│   ├── package.json
│   ├── .env.example
│   └── dist/                         # 빌드 결과
│
├── .github/
│   └── workflows/
│       └── deploy.yml                # CI/CD 파이프라인
│
├── docker-compose.yml                # 로컬 개발 환경 구성
├── README.md                         # 이 파일
└── .gitignore
```

---

## 🔧 핵심 구현 패턴

### 1. WebSocket 실시간 통신
```typescript
// hooks/useWebSocket.ts
- 자동 재연결: reconnectionAttempts=5, reconnectionDelay=1000ms
- 에러 처리: connect_error, error 이벤트 핸들링
- 메모리 관리: 컴포넌트 언마운트 시 자동 해제
```

### 2. 성능 최적화
```typescript
// components/VitalSignsChart.tsx
- 차트 데이터: 최근 30개만 렌더링 (가상 윈도우)
- isAnimationActive=false: 애니메이션 비활성화로 렌더링 성능 확보
- 데이터 동기화: useMemo로 불필요한 재계산 방지

// hooks/useVitalSigns.ts
- 통계 계산을 useMemo로 메모이제이션
- patients 배열 변경 시에만 재계산
```

### 3. 의료 데이터 시뮬레이션
```typescript
// backend/src/PatientSimulator.ts
- 임상 범위: 심박수 40-120, 산소포화도 85-100%, 체온 36-39°C
- Brownian Motion: drift=0.98, volatility=0.5 (현실적 변화)
- qSOFA 평가: 생명징후 3개 이상 이상 시 "critical"
```

### 4. 상태 관리 (Zustand + 패턴)
```typescript
// stores/patientStore.ts
- 간단하고 확장 가능한 구조
- TanStack Query 패턴 지원 가능
- 선택된 환자 관리
```

---

## 📊 생체신호 참고 값

| 지표 | 정상 범위 | 주의 | 위험 |
|------|---------|------|------|
| 심박수 | 60-100 bpm | 40-59 / 101-110 | <40 / >110 |
| SpO₂ | >95% | 92-95% | <92% |
| 체온 | 36.5-37.5°C | 36-36.5 / 37.5-38.5 | <36 / >38.5 |
| 혈압 | 100-130/60-80 | 수축기<100, 이완기<60 | >180/110 |
| 호흡수 | 12-20 회/분 | 10-12 / 20-25 | <10 / >25 |

---

## 🧪 테스팅 (구성 완료)

### 단위 테스트
```bash
npm run test
```

### 예상 테스트 스펙
```typescript
// useWebSocket.test.ts
✓ Connection 이벤트 핸들링
✓ Reconnection 로직
✓ Error 처리
✓ Cleanup on unmount

// PatientGrid.test.tsx
✓ 환자 목록 렌더링
✓ 상태별 색상 코딩
✓ 클릭 이벤트 처리

// useVitalSigns.test.ts
✓ 통계 계산 정확성
✓ Memoization 효율성
```

---

## 📦 빌드 및 배포

### 프로덕션 빌드
```bash
# 프론트엔드
cd frontend
npm run build        # dist/ 생성
npm run preview      # 프로덕션 빌드 미리보기

# 백엔드
cd backend
npm run build        # dist/ 생성
```

### Docker 이미지 빌드
```bash
# 프론트엔드 (Multi-stage 빌드)
docker build -f frontend/Dockerfile -t medlens-frontend:latest ./frontend

# 백엔드
docker build -f backend/Dockerfile -t medlens-backend:latest ./backend

# Docker Compose
docker-compose up -d  # 백그라운드 실행
```

### 배포 플랫폼 (예시)
```
🚀 프론트엔드: Vercel
   - GitHub 자동 배포
   - 환경변수: VITE_API_URL=https://api.medlens.com

🚀 백엔드: Railway / Render
   - Docker 이미지 배포
   - 환경변수: CORS_ORIGIN=https://medlens.vercel.app
```

---

## 🔐 환경 변수

### 백엔드 (.env)
```
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
PATIENT_COUNT=20
UPDATE_INTERVAL=1000
```

### 프론트엔드 (.env)
```
VITE_API_URL=http://localhost:3001
```

---

## 🎓 배운 점 & 기술 심화

### WebSocket 마스터
- ✅ 연결 상태 관리 (connecting → connected → error → disconnected)
- ✅ 재연결 가능 클라이언트 구현
- ✅ 백프레셔(Backpressure) 고려한 데이터 흐름 제어
- ✅ 메모리 누수 방지 (이벤트 리스너 정리)

### React 성능 최적화
- ✅ React.memo로 불필요한 렌더링 방지
- ✅ useMemo/useCallback으로 계산/함수 메모이제이션
- ✅ 가상 윈도우(Virtual Window) 패턴 (Recharts)
- ✅ 상태 관리 전략 (Zustand + 선택적 구독)

### 의료 데이터 처리
- ✅ qSOFA 기반 위험도 평가 알고리즘
- ✅ 임상 범위 데이터 시뮬레이션
- ✅ 실시간 데이터 스트림 처리
- ✅ FHIR 표준 인식

### DevOps & 인프라
- ✅ Docker Multi-stage 빌드로 이미지 최적화
- ✅ Docker Compose로 로컬 개발 환경 구성
- ✅ GitHub Actions CI/CD 파이프라인
- ✅ 컨테이너 오케스트레이션 기초

---

## 🚦 다음 단계 (추가 기능)

### Phase 2: AI 통합
```typescript
// Claude API를 활용한 이상징후 감지
- 생체신호 패턴 분석
- 임상적 권고사항 생성
- 자동 알림 시스템
```

### Phase 3: 고급 분석
```typescript
// 통계 및 예측
- 시계열 분석 (ARIMA)
- 머신러닝 기반 예측
- 환자 군집 분석
```

### Phase 4: 멀티 센터 지원
```typescript
// 확장성
- 다중 병원 데이터 통합
- 권한 기반 접근 제어 (RBAC)
- 감사 로그 (Audit Log)
```

---

## 📚 참고 자료

- [Socket.io 공식 문서](https://socket.io/docs/)
- [React 성능 최적화](https://react.dev/reference/react/useMemo)
- [Recharts 문서](https://recharts.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [의료 데이터 표준 (FHIR)](https://www.hl7.org/fhir/)

---

**제작일**: 2026년 2월 9일  
**버전**: 1.0.0 MVP  
**라이선스**: MIT
