export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface DB {
  users: User[];
}

export interface JWTPayload {
  id: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

export interface ErrorResponse {
  message: string;
}
