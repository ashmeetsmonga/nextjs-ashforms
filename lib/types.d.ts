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
