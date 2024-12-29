export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://vsla-backend.vercel.app/api'
  : 'http://localhost:5000/api'; 