// src/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'professional';  // Changed from 'user' | 'admin'
  profession?: string;               // Added for professionals
  avatar?: string;                   // Optional
  createdAt?: string;                // Optional
}

export interface AuthResponse {
  success?: boolean;  // Backend returns this
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProfessionalRegisterCredentials extends RegisterCredentials {
  profession: string;
}