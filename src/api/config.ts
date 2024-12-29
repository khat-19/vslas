const VERCEL_URL = 'https://vsla-backend.vercel.app/api';
const LOCAL_URL = 'http://localhost:5000/api';

export const API_URL = process.env.NODE_ENV === 'production' ? VERCEL_URL : LOCAL_URL;

export const API_ENDPOINTS = {
  register: `${API_URL}/auth/register`,
  login: `${API_URL}/auth/login`,
};