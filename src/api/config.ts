export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://vsla-backend.vercel.app/api'
  : '/api';  // This will work with the Vite proxy in development