FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 프로덕션 스테이지
FROM node:20-alpine

WORKDIR /app

# http-server 설치 (정적 파일 서빙용)
RUN npm install -g http-server

# builder에서 dist 복사
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["http-server", "dist", "-p", "3000", "-c-1"]
