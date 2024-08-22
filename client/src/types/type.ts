export interface Column {
  key: string;
  title: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
}
