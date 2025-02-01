export interface Company {
  id: string;
  name: string;
  count: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
