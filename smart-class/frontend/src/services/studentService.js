import api from './api.js';

const simulatedStudents = [
  {
    id: 1,
    name: 'Amina K.',
    email: 'amina@smartclasse.com',
    className: 'Terminale A',
    status: 'active',
    grade: '16.8',
  },
  {
    id: 2,
    name: 'Yasin M.',
    email: 'yasin@smartclasse.com',
    className: 'Seconde B',
    status: 'inactive',
    grade: '14.9',
  },
  {
    id: 3,
    name: 'Sara L.',
    email: 'sara@smartclasse.com',
    className: 'Première C',
    status: 'active',
    grade: '17.4',
  },
  {
    id: 4,
    name: 'Karim D.',
    email: 'karim@smartclasse.com',
    className: 'Terminale B',
    status: 'active',
    grade: '15.7',
  },
];

const delay = (ms = 300) => new Promise((resolve) => window.setTimeout(resolve, ms));

const fallback = async (method, payload) => {
  await delay();

  if (method === 'list') {
    return simulatedStudents;
  }

  if (method === 'create') {
    const item = { ...payload, id: Date.now() };
    simulatedStudents.unshift(item);
    return item;
  }

  if (method === 'update') {
    const index = simulatedStudents.findIndex((student) => student.id === payload.id);
    if (index >= 0) {
      simulatedStudents[index] = { ...simulatedStudents[index], ...payload };
      return simulatedStudents[index];
    }
    return payload;
  }

  if (method === 'delete') {
    const index = simulatedStudents.findIndex((student) => student.id === payload.id);
    if (index >= 0) {
      simulatedStudents.splice(index, 1);
    }
    return { success: true };
  }

  return payload;
};

export const studentService = {
  list: async () => {
    try {
      const response = await api.get('/students');
      return response.data;
    } catch {
      return fallback('list');
    }
  },

  create: async (payload) => {
    try {
      const response = await api.post('/students', payload);
      return response.data;
    } catch {
      return fallback('create', payload);
    }
  },

  update: async (payload) => {
    try {
      const response = await api.put(`/students/${payload.id}`, payload);
      return response.data;
    } catch {
      return fallback('update', payload);
    }
  },

  delete: async (payload) => {
    try {
      const response = await api.delete(`/students/${payload.id}`);
      return response.data;
    } catch {
      return fallback('delete', payload);
    }
  },
};
