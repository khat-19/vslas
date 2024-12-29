import { API_ENDPOINTS } from '../api/config';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await fetch(API_ENDPOINTS.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  async register(data: RegisterData) {
    const response = await fetch(API_ENDPOINTS.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  },
}; 