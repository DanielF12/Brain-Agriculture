import axios, { AxiosError } from 'axios';
import { Farm, DashboardData } from '../../types';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNREFUSED') {
      toast.error('Unable to connect to the server. Please ensure the backend is running.');
    } else if (!error.response) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error( 'An unexpected error occurred');
    }
    return Promise.reject(error);
  }
);

export const producerApi = {
  create: (producer: Farm) => 
    api.post<Farm>('/producers', producer),
  
  update: (id: number, producer: Farm) =>
    api.put<Farm>(`/producers/${id}`, producer),
  
  delete: (id: number) =>
    api.delete(`/producers/${id}`), 
  
  getDashboard: () =>
    api.get<DashboardData>('/dashboard')
};