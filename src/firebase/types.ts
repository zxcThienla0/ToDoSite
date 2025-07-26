export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt?: Date;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface AuthFormData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}