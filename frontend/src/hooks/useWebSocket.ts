import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { ConnectionStatus, PatientData } from '../types';

export const useWebSocket = (url: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(() => {
    if (socketRef.current?.connected) return;

    setStatus('connecting');
    const newSocket = io(url, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to backend');
      setStatus('connected');
      setError(null);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from backend');
      setStatus('disconnected');
    });

    newSocket.on('initial-data', (data: PatientData[]) => {
      console.log('📊 Received initial data:', data.length, 'patients');
      setPatients(data);
    });

    newSocket.on('vital-update', (data: PatientData[]) => {
      setPatients(data);
    });

    newSocket.on('error', (error: any) => {
      console.error('❌ Socket error:', error);
      setError(error.message || 'Connection error');
      setStatus('error');
    });

    newSocket.on('connect_error', (error: any) => {
      console.error('❌ Connection error:', error);
      setError(error.message || 'Failed to connect');
      setStatus('error');
    });

    socketRef.current = newSocket;
  }, [url]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setStatus('disconnected');
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    socket: socketRef.current,
    status,
    patients,
    error,
    connect,
    disconnect,
  };
};
