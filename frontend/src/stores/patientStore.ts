import { create } from 'zustand';
import { PatientData } from '../types';

interface PatientStore {
  patients: PatientData[];
  selectedPatientId: string | null;
  setPatients: (patients: PatientData[]) => void;
  setSelectedPatient: (id: string | null) => void;
  getSelectedPatient: () => PatientData | undefined;
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  patients: [],
  selectedPatientId: null,

  setPatients: (patients) => set({ patients }),

  setSelectedPatient: (id) => set({ selectedPatientId: id }),

  getSelectedPatient: () => {
    const { patients, selectedPatientId } = get();
    return patients.find(p => p.id === selectedPatientId);
  },
}));
