export interface Question {
  type: string;
  title: string;
  placeholder?: string;
  options?: string[];
}

export interface FormDetails {
  title: string;
  questions: Question[];
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenPayload {
  id: string;
  email: string;
  exp: number;
  iat: number;
  sub: string;
}

export interface CreateFormPayload {
  title: string;
  questions: string;
}
